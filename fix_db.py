import sqlite3

db_path = r"C:\Users\Admin\.gemini\antigravity\scratch\tnea_backend\app.db"
conn = sqlite3.connect(db_path)
c = conn.cursor()

c.execute("SELECT id, tnea_code, name FROM colleges WHERE tnea_code = '2008'")
print("Before:", c.fetchall())

# Update 2008
c.execute("UPDATE colleges SET name = 'Thiagarajar College of Engineering (Autonomous)' WHERE tnea_code = '2008'")
conn.commit()

c.execute("SELECT id, tnea_code, name FROM colleges WHERE tnea_code = '2008'")
print("After:", c.fetchall())

conn.close()
