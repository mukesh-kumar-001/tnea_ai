import sqlite3

db_path = r"C:\Users\Admin\.gemini\antigravity\scratch\tnea_backend\app.db"
conn = sqlite3.connect(db_path)
c = conn.cursor()

c.execute("SELECT COUNT(*) FROM cutoffs WHERE college_code = '2008'")
count = c.fetchone()[0]
print(f"Count of cutoffs for 2008: {count}")

c.execute("SELECT COUNT(*) FROM cutoffs WHERE college_code = '2007'")
count_2007 = c.fetchone()[0]
print(f"Count of cutoffs for 2007: {count_2007}")

c.execute("SELECT * FROM cutoffs WHERE college_code = '2008' LIMIT 5")
print("Sample cutoffs for 2008:", c.fetchall())

conn.close()
