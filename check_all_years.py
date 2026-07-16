import sqlite3

db_path = r"C:\Users\Admin\.gemini\antigravity\scratch\tnea_backend\app.db"
conn = sqlite3.connect(db_path)
c = conn.cursor()

c.execute("""
SELECT year, category, cutoff_mark, general_rank 
FROM yearly_cutoffs 
WHERE college_branch_id IN (
    SELECT id FROM college_branches WHERE college_id = (SELECT id FROM colleges WHERE tnea_code='5914')
) 
AND category='OC'
""")
print("OC Cutoffs for 5914:")
for row in c.fetchall():
    print(row)

conn.close()
