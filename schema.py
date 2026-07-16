import sqlite3
db_path = r"C:\Users\Admin\.gemini\antigravity\scratch\tnea_backend\app.db"
conn = sqlite3.connect(db_path)
c = conn.cursor()
c.execute("PRAGMA table_info(yearly_cutoffs)")
print("Columns in yearly_cutoffs:", c.fetchall())

# Let's see what is in yearly_cutoffs LIMIT 5
c.execute("SELECT * FROM yearly_cutoffs LIMIT 5")
print("Data:", c.fetchall())

conn.close()
