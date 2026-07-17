import os
from app import create_app
from app.extensions import db
from app.models.college import College
from app.models.branch import Branch, CollegeBranch
from app.models.cutoff import YearlyCutoff
from sqlalchemy import func, text
import logging

# Setup logging
log_path = "C:/Users/Admin/.gemini/antigravity/brain/0a77e596-4d6d-4648-87b5-c131d07b5e93/cleanup_log.txt"
logging.basicConfig(filename=log_path, level=logging.INFO, format='%(message)s')

app = create_app()
app.app_context().push()

report_path = "C:/Users/Admin/.gemini/antigravity/brain/0a77e596-4d6d-4648-87b5-c131d07b5e93/final_cleanup_report.md"

def cleanup_db():
    report = ["# Final Database Cleanup Report\n"]
    logging.info("Starting database cleanup...")

    # 1. Hostel Information
    dup_hostel = db.session.execute(text("SELECT college_id FROM hostel_information GROUP BY college_id HAVING COUNT(*) > 1")).fetchall()
    hostel_deleted = 0
    for row in dup_hostel:
        college_id = row[0]
        ids = db.session.execute(text(f"SELECT id FROM hostel_information WHERE college_id = {college_id} ORDER BY id")).fetchall()
        # Keep the first, delete the rest
        keep_id = ids[0][0]
        for delete_id in ids[1:]:
            db.session.execute(text(f"DELETE FROM hostel_information WHERE id = {delete_id[0]}"))
            logging.info(f"Deleted duplicate hostel_information ID {delete_id[0]} (kept {keep_id}) for college {college_id}")
            hostel_deleted += 1

    report.append(f"- **Duplicate `hostel_information` rows deleted**: {hostel_deleted}")
    
    # 2. Facilities
    dup_facilities = db.session.execute(text("SELECT college_id FROM facilities GROUP BY college_id HAVING COUNT(*) > 1")).fetchall()
    facilities_deleted = 0
    for row in dup_facilities:
        college_id = row[0]
        ids = db.session.execute(text(f"SELECT id FROM facilities WHERE college_id = {college_id} ORDER BY id")).fetchall()
        # Keep the first, delete the rest
        keep_id = ids[0][0]
        for delete_id in ids[1:]:
            db.session.execute(text(f"DELETE FROM facilities WHERE id = {delete_id[0]}"))
            logging.info(f"Deleted duplicate facilities ID {delete_id[0]} (kept {keep_id}) for college {college_id}")
            facilities_deleted += 1

    report.append(f"- **Duplicate `facilities` rows deleted**: {facilities_deleted}")

    # 3. College Branches
    dup_cb = db.session.execute(text("SELECT college_id, branch_id FROM college_branches GROUP BY college_id, branch_id HAVING COUNT(*) > 1")).fetchall()
    cb_deleted = 0
    cb_fks_updated = 0
    for row in dup_cb:
        college_id, branch_id = row
        cbs = CollegeBranch.query.filter_by(college_id=college_id, branch_id=branch_id).all()
        # Keep the first one
        primary_cb = cbs[0]
        has_nba = any(cb.nba_accredited for cb in cbs)
        primary_cb.nba_accredited = has_nba
        
        for cb in cbs[1:]:
            cb_id = cb.id
            primary_id = primary_cb.id
            
            # Count how many we update for logging
            c_count = db.session.execute(text(f"SELECT COUNT(*) FROM yearly_cutoffs WHERE college_branch_id = {cb_id}")).scalar()
            
            # Raw SQL update
            db.session.execute(text(f"UPDATE yearly_cutoffs SET college_branch_id = {primary_id} WHERE college_branch_id = {cb_id}"))
            cb_fks_updated += c_count
            logging.info(f"Updated {c_count} cutoffs FK from CB {cb_id} to CB {primary_id}")
            
            # Seat matrix relationships
            try:
                db.session.execute(text(f"UPDATE seat_matrix SET college_branch_id = {primary_id} WHERE college_branch_id = {cb_id}"))
            except Exception:
                pass
                
            # Raw SQL delete to avoid cascades
            db.session.execute(text(f"DELETE FROM college_branches WHERE id = {cb_id}"))
            logging.info(f"Deleted duplicate college_branch ID {cb_id} (kept {primary_id} with NBA={has_nba})")
            cb_deleted += 1
            
    report.append(f"- **Duplicate `college_branches` deleted**: {cb_deleted}")
    report.append(f"- **Cutoff FKs updated to point to primary CB**: {cb_fks_updated}")
    
    # Commit these changes first so duplicate cutoffs are now grouped under the primary CBs
    db.session.commit()

    # 4. Yearly Cutoffs
    # Using raw SQL to delete duplicate cutoffs keeping the MIN(id)
    logging.info("Deduplicating yearly_cutoffs using SQL...")
    
    # SQLite delete with CTE or subquery
    # We can delete where rowid NOT IN (select min(rowid) group by ...)
    delete_cutoffs_sql = """
    DELETE FROM yearly_cutoffs
    WHERE id NOT IN (
        SELECT MIN(id)
        FROM yearly_cutoffs
        GROUP BY college_branch_id, year, category, cutoff_mark, community_rank, general_rank
    )
    """
    
    initial_cutoffs = db.session.execute(text("SELECT COUNT(*) FROM yearly_cutoffs")).scalar()
    
    # Execute the bulk delete
    result = db.session.execute(text(delete_cutoffs_sql))
    db.session.commit()
    
    final_cutoffs = db.session.execute(text("SELECT COUNT(*) FROM yearly_cutoffs")).scalar()
    cutoffs_deleted = initial_cutoffs - final_cutoffs
    
    logging.info(f"Deleted {cutoffs_deleted} duplicate yearly_cutoff records.")
    report.append(f"- **Duplicate `yearly_cutoffs` rows deleted**: {cutoffs_deleted}")

    # Final DB counts
    colleges_count = db.session.execute(text("SELECT COUNT(*) FROM colleges")).scalar()
    branches_count = db.session.execute(text("SELECT COUNT(*) FROM branches")).scalar()
    cb_count = db.session.execute(text("SELECT COUNT(*) FROM college_branches")).scalar()
    
    report.append("\n## Final Database Stats\n")
    report.append(f"- **Total Colleges**: {colleges_count}")
    report.append(f"- **Total Branches**: {branches_count}")
    report.append(f"- **Total College Branches**: {cb_count}")
    report.append(f"- **Total Yearly Cutoffs**: {final_cutoffs}")
    
    with open(report_path, "w") as f:
        f.write("\n".join(report))
        
    print(f"Cleanup finished. Check log at {log_path} and report at {report_path}")

if __name__ == "__main__":
    cleanup_db()
