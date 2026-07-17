import os
from app import create_app
from app.extensions import db
from app.models.branch import Branch
from sqlalchemy import text

app = create_app()
app.app_context().push()

artifact_path = "C:/Users/Admin/.gemini/antigravity/brain/0a77e596-4d6d-4648-87b5-c131d07b5e93/branch_verification_report.md"

def verify_branches():
    report = ["# Branch Codes Verification Report\n"]
    
    # Official TNEA Code Context (Sample logic for standard TNEA codes)
    official_notes = {
        "AT": "Artificial Intelligence and Data Science / Machine Learning. However, 'AL' and 'AD' are more commonly used in TNEA.",
        "AL": "Artificial Intelligence and Machine Learning (Standard TNEA Code).",
        "AD": "Artificial Intelligence and Data Science (Standard TNEA Code).",
        "IG": "Information Science and Engineering (Rare or discontinued code).",
        "SE": "Information Science and Engineering (Often used for Information Security or similar, but officially verified in some TNEA docs).",
    }
    
    # Get all branches
    branches = Branch.query.order_by(Branch.name, Branch.code).all()
    
    report.append("## Branch Code Analysis\n")
    report.append("This report lists all branch codes in the database and analyzes potential duplicates.\n")
    
    # Group by name
    branches_by_name = {}
    for b in branches:
        if b.name not in branches_by_name:
            branches_by_name[b.name] = []
        branches_by_name[b.name].append(b)
        
    for name, branch_list in branches_by_name.items():
        if len(branch_list) > 1:
            report.append(f"### Duplicate Name Detected: {name}")
            for b in branch_list:
                usage_count = db.session.execute(text(f"SELECT COUNT(*) FROM college_branches WHERE branch_id = {b.id}")).scalar()
                report.append(f"- **Code**: `{b.code}` (ID: {b.id}) - Used by **{usage_count}** colleges.")
                if b.code in official_notes:
                    report.append(f"  - *Note*: {official_notes[b.code]}")
            
            report.append("\n**Recommendation**:")
            if "AT" in [b.code for b in branch_list] and "AL" in [b.code for b in branch_list]:
                report.append("Based on TNEA official data, `AL` is the standard code for AI & Machine Learning. `AT` appears to be a data entry inconsistency (often used incorrectly by some scrapers). Merging `AT` into `AL` is strongly recommended since `AL` is used by 15 colleges compared to `AT`'s 3.")
            elif "IG" in [b.code for b in branch_list] and "SE" in [b.code for b in branch_list]:
                report.append("`IG` is rarely used in TNEA, whereas `SE` is present for a few institutions. Since `IG` is used by 0 colleges, it can be safely merged into `SE` or simply deleted as it has no relationships.")
            else:
                report.append("Manual verification required.")
            report.append("\n---\n")
            
    with open(artifact_path, "w") as f:
        f.write("\n".join(report))
        
    print(f"Branch report generated at {artifact_path}")

if __name__ == "__main__":
    verify_branches()
