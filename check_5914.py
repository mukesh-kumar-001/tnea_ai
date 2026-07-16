import sqlite3
db_path = r"C:\Users\Admin\.gemini\antigravity\scratch\tnea_backend\app.db"
conn = sqlite3.connect(db_path)
c = conn.cursor()

c.execute("SELECT id FROM colleges WHERE tnea_code = '5914'")
college_id = c.fetchone()[0]

c.execute("SELECT id FROM college_branches WHERE college_id = ?", (college_id,))
cb_ids = [cb[0] for cb in c.fetchall()]

placeholders = ','.join(['?']*len(cb_ids))
c.execute(f"SELECT branch_name, year, category, cutoff_mark, community_rank, general_rank FROM yearly_cutoffs WHERE college_branch_id IN ({placeholders}) LIMIT 10", cb_ids)
print(c.fetchall())

conn.close()
