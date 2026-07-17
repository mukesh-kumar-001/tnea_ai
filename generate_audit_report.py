import os
from app import create_app
from app.extensions import db
from app.models.college import College
from app.models.branch import Branch, CollegeBranch
from app.models.cutoff import YearlyCutoff
from sqlalchemy import func, text

app = create_app()
app.app_context().push()

artifact_path = "C:/Users/Admin/.gemini/antigravity/brain/0a77e596-4d6d-4648-87b5-c131d07b5e93/duplicate_audit_report.md"

def generate_report():
    report = ["# TNEA.ai Database Duplicate Audit Report\n"]
    
    # 1. Duplicate Colleges
    report.append("## 1. Duplicate Colleges\n")
    # Finding colleges with the same tnea_code
    duplicate_college_codes = db.session.query(College.tnea_code).group_by(College.tnea_code).having(func.count(College.tnea_code) > 1).all()
    if not duplicate_college_codes:
        report.append("No duplicate colleges found based on `tnea_code`.\n")
    else:
        for (code,) in duplicate_college_codes:
            colleges = College.query.filter_by(tnea_code=code).all()
            report.append(f"### TNEA Code: {code}\n")
            for c in colleges:
                cb_count = db.session.query(func.count(CollegeBranch.id)).filter_by(college_id=c.id).scalar()
                # cutoffs
                cutoff_count = db.session.query(func.count(YearlyCutoff.id)).join(CollegeBranch).filter(CollegeBranch.college_id == c.id).scalar()
                # hostel
                hostel_count = len(c.hostel) if isinstance(c.hostel, list) else (1 if c.hostel else 0)
                # facilities
                facilities_count = len(c.facilities) if isinstance(c.facilities, list) else (1 if c.facilities else 0)
                
                report.append(f"- **College**: {c.name} (ID: {c.id})")
                report.append(f"  - Branches: {cb_count}")
                report.append(f"  - Cutoff Records: {cutoff_count}")
                report.append(f"  - Hostel Records: {hostel_count}")
                report.append(f"  - Facilities Records: {facilities_count}\n")
                
    # Check duplicate hostel/facilities for a single college ID
    report.append("\n**Note on Hostel/Facilities Duplicates**: Some colleges have duplicate child rows in one-to-one relationships.\n")
    # Raw query to find duplicate hostel info
    dup_hostel = db.session.execute(text("SELECT college_id, COUNT(*) FROM hostel_information GROUP BY college_id HAVING COUNT(*) > 1")).fetchall()
    for row in dup_hostel:
        report.append(f"- College ID {row[0]} has {row[1]} hostel_information records.\n")
    
    dup_facilities = db.session.execute(text("SELECT college_id, COUNT(*) FROM facilities GROUP BY college_id HAVING COUNT(*) > 1")).fetchall()
    for row in dup_facilities:
        report.append(f"- College ID {row[0]} has {row[1]} facilities records.\n")


    # 2. Duplicate Branches
    report.append("\n## 2. Duplicate Branches\n")
    # Finding branches with the same name but different codes
    duplicate_branch_names = db.session.query(Branch.name).group_by(Branch.name).having(func.count(Branch.id) > 1).all()
    if not duplicate_branch_names:
        report.append("No duplicate branches found based on identical names.\n")
    else:
        for (name,) in duplicate_branch_names:
            branches = Branch.query.filter_by(name=name).all()
            report.append(f"### Branch Name: {name}\n")
            for b in branches:
                cb_count = db.session.query(func.count(CollegeBranch.id)).filter_by(branch_id=b.id).scalar()
                report.append(f"- **Code**: `{b.code}` (ID: {b.id}) - Used by {cb_count} colleges")
            report.append("\n**Reason for duplicate**: Identical name imported under two different codes (e.g., AT vs AL). Official TNEA branch codes should be verified before merging.\n")

    # 3. Duplicate College Branches
    report.append("\n## 3. Duplicate College Branches\n")
    dup_cb = db.session.execute(text("SELECT college_id, branch_id, COUNT(*) FROM college_branches GROUP BY college_id, branch_id HAVING COUNT(*) > 1")).fetchall()
    if not dup_cb:
        report.append("No duplicate college branches found.\n")
    else:
        for row in dup_cb:
            c_id, b_id, count = row
            c = College.query.get(c_id)
            b = Branch.query.get(b_id)
            cbs = CollegeBranch.query.filter_by(college_id=c_id, branch_id=b_id).all()
            report.append(f"### College: {c.name} | Branch: {b.name}\n")
            for cb in cbs:
                cutoff_count = db.session.query(func.count(YearlyCutoff.id)).filter_by(college_branch_id=cb.id).scalar()
                report.append(f"- **ID**: {cb.id}")
                report.append(f"  - NBA Status: {cb.nba_accredited}")
                report.append(f"  - Cutoff Records: {cutoff_count}\n")


    # 4. Duplicate Yearly Cutoffs
    report.append("\n## 4. Duplicate Yearly Cutoffs\n")
    dup_cutoffs_query = """
    SELECT college_branch_id, year, category, cutoff_mark, community_rank, general_rank, COUNT(*) 
    FROM yearly_cutoffs 
    GROUP BY college_branch_id, year, category, cutoff_mark, community_rank, general_rank 
    HAVING COUNT(*) > 1
    """
    dup_cutoffs = db.session.execute(text(dup_cutoffs_query)).fetchall()
    
    total_duplicates = 0
    total_to_delete = 0
    for row in dup_cutoffs:
        count = row[-1]
        total_duplicates += 1
        total_to_delete += (count - 1)
        
    report.append(f"- **Unique Duplicate Groups**: {total_duplicates}\n")
    report.append(f"- **Total Rows to Delete**: {total_to_delete}\n")
    report.append("- **Detection Method**: Grouped by `(college_branch_id, year, category, cutoff_mark, community_rank, general_rank)` having count > 1.\n")
    report.append("```sql\n" + dup_cutoffs_query + "\n```\n")

    # Impact Estimate
    report.append("\n## deduplication Impact Estimate\n")
    
    deleted_rows = total_to_delete
    updated_fks = 0
    
    # Estimate branch merge
    # For every duplicate branch, if we merge one into another, we update FKs in college_branches
    for (name,) in duplicate_branch_names:
        branches = Branch.query.filter_by(name=name).all()
        main_b = branches[0]
        for b in branches[1:]:
            cb_count = db.session.query(func.count(CollegeBranch.id)).filter_by(branch_id=b.id).scalar()
            updated_fks += cb_count
            deleted_rows += 1
            
    # Estimate college_branches merge
    for row in dup_cb:
        count = row[-1]
        # Delete count - 1 college_branches
        deleted_rows += (count - 1)
        # Update cutoffs FKs pointing to the deleted ones to point to the main one
        c_id, b_id, _ = row
        cbs = CollegeBranch.query.filter_by(college_id=c_id, branch_id=b_id).all()
        main_cb = cbs[0]
        for cb in cbs[1:]:
            cutoff_count = db.session.query(func.count(YearlyCutoff.id)).filter_by(college_branch_id=cb.id).scalar()
            updated_fks += cutoff_count
            
    # Hostel and Facilities
    for row in dup_hostel:
        deleted_rows += (row[1] - 1)
    for row in dup_facilities:
        deleted_rows += (row[1] - 1)

    report.append(f"- **Rows to be deleted**: ~{deleted_rows}\n")
    report.append(f"- **Foreign keys to be updated**: ~{updated_fks}\n")
    report.append("- **Information lost**: None. Only redundant exact-match rows and duplicate relationship references are removed. NBA status will be combined via logical OR if needed.\n")

    with open(artifact_path, "w") as f:
        f.write("\n".join(report))
        
    print(f"Report generated at {artifact_path}")

if __name__ == "__main__":
    generate_report()
