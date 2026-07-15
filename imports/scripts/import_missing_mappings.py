import sqlite3
import json
from pathlib import Path

# Paths
BASE = Path(__file__).resolve().parent.parent
DB = BASE.parent / "app.db"
INPUT = BASE / "json" / "tnea_cutoffs_all_years.json"

def salvage_mappings():
    print("=" * 50)
    print("MISSING MAPPINGS SALVAGE SCRIPT")
    print("=" * 50)
    
    conn = sqlite3.connect(DB)
    cur = conn.cursor()
    
    # Read JSON
    print(f"Reading {INPUT.name}...")
    try:
        with open(INPUT, "r", encoding="utf-8") as f:
            records = json.load(f)
    except Exception as e:
        print("Error reading JSON:", e)
        return
        
    print(f"Loaded {len(records)} records from JSON.\n")
    
    # 1. Load existing colleges
    cur.execute("SELECT id, tnea_code FROM colleges")
    colleges = {str(row[1]).zfill(4): row[0] for row in cur.fetchall()}
    
    # 2. Fix Missing Branches
    cur.execute("SELECT code FROM branches")
    existing_branches = {row[0] for row in cur.fetchall()}
    
    missing_branches = {}
    for r in records:
        b_code = r.get("branch_code")
        b_name = r.get("branch_name")
        if b_code and b_code not in existing_branches:
            missing_branches[b_code] = b_name
            
    if missing_branches:
        print(f"Found {len(missing_branches)} missing branches. Inserting...")
        branch_inserts = [(code, name) for code, name in missing_branches.items()]
        cur.executemany("INSERT INTO branches (code, name) VALUES (?, ?)", branch_inserts)
        conn.commit()
        print("Inserted missing branches.")
    else:
        print("No missing branches found.")
        
    # Re-load branches with IDs
    cur.execute("SELECT id, code FROM branches")
    branches = {row[1]: row[0] for row in cur.fetchall()}
    
    # 3. Fix Missing College-Branch Mappings
    cur.execute("SELECT college_id, branch_id FROM college_branches")
    existing_mappings = {(row[0], row[1]) for row in cur.fetchall()}
    
    missing_mappings = set()
    for r in records:
        c_code = str(r.get("college_code", "")).zfill(4)
        b_code = r.get("branch_code")
        
        c_id = colleges.get(c_code)
        b_id = branches.get(b_code)
        
        if c_id and b_id:
            if (c_id, b_id) not in existing_mappings:
                missing_mappings.add((c_id, b_id))
                
    if missing_mappings:
        print(f"Found {len(missing_mappings)} missing college-branch mappings. Inserting...")
        mapping_inserts = [(c, b) for c, b in missing_mappings]
        cur.executemany("INSERT INTO college_branches (college_id, branch_id, nba_accredited) VALUES (?, ?, 0)", mapping_inserts)
        conn.commit()
        print("Inserted missing mappings.")
    else:
        print("No missing mappings found.")
        
    conn.close()
    
    print("\n" + "=" * 50)
    print("SALVAGE COMPLETE")
    print("You can now safely re-run import_cutoffs.py")
    print("=" * 50)

if __name__ == "__main__":
    salvage_mappings()
