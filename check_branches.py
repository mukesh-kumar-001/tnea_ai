import sqlite3

db_path = r"C:\Users\Admin\.gemini\antigravity\scratch\tnea_backend\app.db"
conn = sqlite3.connect(db_path)
c = conn.cursor()

c.execute("""
SELECT cb.branch_id, y.year, y.cutoff_mark, y.general_rank 
FROM yearly_cutoffs y
JOIN college_branches cb ON y.college_branch_id = cb.id
WHERE cb.college_id = (SELECT id FROM colleges WHERE tnea_code='5914')
AND y.category='OC' AND y.year=2023
""")
print("2023 OC Cutoffs for 5914 with branch_id:")
for row in c.fetchall():
    print(row)

conn.close()
