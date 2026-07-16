import sqlite3

db_path = r"C:\Users\Admin\.gemini\antigravity\scratch\tnea_backend\app.db"
conn = sqlite3.connect(db_path)
c = conn.cursor()

# Update the database to properly remove the corrupted cutoff values 
# (which were actually ranks) so the API doesn't serve them as cutoffs.
c.execute("UPDATE yearly_cutoffs SET cutoff_mark = NULL WHERE cutoff_mark > 200")
conn.commit()

c.execute("SELECT COUNT(*) FROM yearly_cutoffs WHERE cutoff_mark > 200")
print("Cutoffs > 200 after fix:", c.fetchone()[0])

conn.close()
