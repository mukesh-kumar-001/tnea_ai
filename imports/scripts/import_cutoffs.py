import sqlite3
import json
import time
import sys
from pathlib import Path

# ====================================================
# PATHS
# ====================================================
BASE = Path(__file__).resolve().parent.parent
DB = BASE.parent / "app.db"
INPUT = BASE / "json" / "tnea_cutoffs_all_years.json"
LOG_DIR = BASE / "logs"
LOG_DIR.mkdir(parents=True, exist_ok=True)
SKIPPED_LOG = LOG_DIR / "import_skipped.log"

BATCH_SIZE = 1000

def run_import():
    start_time = time.time()
    
    print(f"Connecting to Database: {DB}")
    conn = sqlite3.connect(DB)
    cur = conn.cursor()
    
    # ====================================================
    # LOAD CACHES (O(1) memory check)
    # ====================================================
    print("Loading lookups from database...")
    
    cur.execute("SELECT tnea_code FROM colleges")
    colleges = {str(row[0]).zfill(4) for row in cur.fetchall()}
    
    cur.execute("SELECT code FROM branches")
    branches = {row[0] for row in cur.fetchall()}
    
    cur.execute("""
        SELECT c.tnea_code, b.code, cb.id
        FROM college_branches cb
        JOIN colleges c ON cb.college_id = c.id
        JOIN branches b ON cb.branch_id = b.id
    """)
    cb_lookup = {}
    for tnea_code, b_code, cb_id in cur.fetchall():
        cb_lookup[(str(tnea_code).zfill(4), b_code)] = cb_id
        
    # Idempotent State Cache
    cur.execute("SELECT college_branch_id, year, category FROM yearly_cutoffs")
    existing_cutoffs = {(row[0], row[1], row[2]) for row in cur.fetchall()}
    
    print(f"Loaded {len(colleges)} colleges, {len(branches)} branches.")
    print(f"Loaded {len(cb_lookup)} college-branch mappings.")
    print(f"Loaded {len(existing_cutoffs)} existing cutoff records.")
    
    # ====================================================
    # FILE CHECK
    # ====================================================
    if not INPUT.exists():
        print(f"ERROR: Input file not found: {INPUT}")
        return
        
    print(f"\nReading JSON file: {INPUT.name}...")
    try:
        with open(INPUT, "r", encoding="utf-8") as f:
            records = json.load(f)
    except json.JSONDecodeError as e:
        print(f"ERROR: Invalid or incomplete JSON file: {e}")
        print("Wait for the scraper to finish completely before importing.")
        return
        
    total_records = len(records)
    print(f"Found {total_records} records to process.\n")
    
    # ====================================================
    # IMPORT LOGIC
    # ====================================================
    processed = 0
    inserted = 0
    skipped = 0
    duplicates = 0
    errors = 0
    
    skip_reasons = {}
    batch = []
    
    f_log = open(SKIPPED_LOG, "w", encoding="utf-8")
    
    for row in records:
        processed += 1
        
        try:
            c_code = str(row.get("college_code", "")).zfill(4)
            b_code = row.get("branch_code", "")
            year = row.get("year")
            category = row.get("category")
            cutoff = row.get("cutoff_mark")
            c_rank = row.get("community_rank")
            g_rank = row.get("general_rank")
            
            # Validation
            reason = None
            if not c_code or c_code not in colleges:
                reason = "College not found"
            elif not b_code or b_code not in branches:
                reason = "Branch not found"
            else:
                cb_id = cb_lookup.get((c_code, b_code))
                if not cb_id:
                    reason = "College-Branch mapping not found"
                elif not year or not category:
                    reason = "Missing year or category"
                elif cutoff is None and c_rank is None and g_rank is None:
                    reason = "No cutoff or rank data"
            
            if reason:
                skipped += 1
                skip_reasons[reason] = skip_reasons.get(reason, 0) + 1
                f_log.write(f"[{reason}] {row}\n")
                continue
                
            # Duplicate check
            key = (cb_id, year, category)
            if key in existing_cutoffs:
                duplicates += 1
                continue
                
            # Add to batch
            batch.append((cb_id, year, category, cutoff, c_rank, g_rank))
            existing_cutoffs.add(key) # Prevent duplicates within the same run
            
            # Insert batch
            if len(batch) >= BATCH_SIZE:
                cur.executemany("""
                    INSERT INTO yearly_cutoffs 
                    (college_branch_id, year, category, cutoff_mark, community_rank, general_rank)
                    VALUES (?, ?, ?, ?, ?, ?)
                """, batch)
                conn.commit()
                inserted += len(batch)
                batch = []
                
        except Exception as e:
            errors += 1
            f_log.write(f"[ERROR: {str(e)}] {row}\n")
            
        # Progress reporting
        if processed % 1000 == 0 or processed == total_records:
            elapsed = time.time() - start_time
            rate = processed / elapsed if elapsed > 0 else 0
            remaining = (total_records - processed) / rate if rate > 0 else 0
            
            # Clear line and print progress
            sys.stdout.write(
                f"\rProcessed: {processed}/{total_records} | "
                f"Inserted: {inserted} | Skipped: {skipped} | "
                f"Dups: {duplicates} | Errors: {errors} | "
                f"Elapsed: {elapsed:.1f}s | ETA: {remaining:.1f}s"
            )
            sys.stdout.flush()
            
    # Final batch
    if batch:
        cur.executemany("""
            INSERT INTO yearly_cutoffs 
            (college_branch_id, year, category, cutoff_mark, community_rank, general_rank)
            VALUES (?, ?, ?, ?, ?, ?)
        """, batch)
        conn.commit()
        inserted += len(batch)
        
    f_log.close()
    conn.close()
    
    elapsed = time.time() - start_time
    print("\n\n" + "="*50)
    print("FINAL VALIDATION SUMMARY")
    print("="*50)
    print(f"Total processed : {processed}")
    print(f"Total inserted  : {inserted}")
    print(f"Total skipped   : {skipped}")
    print(f"Total duplicates: {duplicates}")
    print(f"Total errors    : {errors}")
    print(f"Total time      : {elapsed:.2f} seconds")
    
    if skip_reasons:
        print("\nSkip Reasons:")
        for r, count in skip_reasons.items():
            print(f"  - {r}: {count}")
    
    print(f"\nDetailed skip logs written to: {SKIPPED_LOG}")
    print("="*50)

if __name__ == "__main__":
    run_import()