import sqlite3

db_path = r"C:\Users\Admin\.gemini\antigravity\scratch\tnea_backend\app.db"
conn = sqlite3.connect(db_path)
c = conn.cursor()

def check_college(code):
    print(f"\n--- Checking college code {code} ---")
    c.execute("SELECT id, name FROM colleges WHERE tnea_code = ?", (code,))
    college = c.fetchone()
    if not college:
        print(f"College {code} not found!")
        return
    
    col_id, name = college
    print(f"College ID: {col_id}, Name: {name}")
    
    c.execute("SELECT id, branch_id FROM college_branches WHERE college_id = ?", (col_id,))
    col_branches = c.fetchall()
    print(f"Number of branches for this college: {len(col_branches)}")
    
    cb_ids = [cb[0] for cb in col_branches]
    if cb_ids:
        placeholders = ','.join(['?']*len(cb_ids))
        c.execute(f"SELECT COUNT(*) FROM yearly_cutoffs WHERE college_branch_id IN ({placeholders})", cb_ids)
        print(f"Number of cutoff records: {c.fetchone()[0]}")
    else:
        print("No cutoff records because no branches.")

check_college('2008')
check_college('2007')

conn.close()
