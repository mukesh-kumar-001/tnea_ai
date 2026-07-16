import sqlite3
db_path = r"C:\Users\Admin\.gemini\antigravity\scratch\tnea_backend\app.db"
conn = sqlite3.connect(db_path)
c = conn.cursor()
c.execute("SELECT COUNT(*) FROM yearly_cutoffs WHERE community_rank IS NOT NULL")
print("Records with community rank:", c.fetchone()[0])
conn.close()
