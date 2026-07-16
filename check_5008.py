import sqlite3

db_path = r"C:\Users\Admin\.gemini\antigravity\scratch\tnea_backend\app.db"
conn = sqlite3.connect(db_path)
c = conn.cursor()

def check_college(code):
    c.execute("SELECT id, name FROM colleges WHERE tnea_code = ?", (code,))
    college = c.fetchone()
    if not college: return
    col_id, name = college
    c.execute("SELECT id FROM college_branches WHERE college_id = ?", (col_id,))
    cb_ids = [cb[0] for cb in c.fetchall()]
    if cb_ids:
        placeholders = ','.join(['?']*len(cb_ids))
        c.execute(f"SELECT COUNT(*) FROM yearly_cutoffs WHERE college_branch_id IN ({placeholders})", cb_ids)
        print(f"Code {code}: {c.fetchone()[0]} cutoffs")

check_college('5008')
check_college('2008')

conn.close()
