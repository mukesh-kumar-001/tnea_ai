import sqlite3
db_path = r"C:\Users\Admin\.gemini\antigravity\scratch\tnea_backend\app.db"
conn = sqlite3.connect(db_path)
c = conn.cursor()

c.execute("SELECT COUNT(*) FROM yearly_cutoffs WHERE cutoff_mark > 200")
print("Cutoffs > 200:", c.fetchone()[0])

c.execute("SELECT cutoff_mark, general_rank FROM yearly_cutoffs WHERE cutoff_mark > 200 LIMIT 5")
print("Sample:", c.fetchall())

conn.close()
