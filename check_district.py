import sqlite3

db_path = r"C:\Users\Admin\.gemini\antigravity\scratch\tnea_backend\app.db"
conn = sqlite3.connect(db_path)
c = conn.cursor()

c.execute("SELECT district FROM colleges WHERE tnea_code = '2008'")
print("District for 2008:", c.fetchone())

conn.close()
