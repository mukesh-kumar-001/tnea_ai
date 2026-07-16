import sqlite3

db_path = r"C:\Users\Admin\.gemini\antigravity\scratch\tnea_backend\app.db"
conn = sqlite3.connect(db_path)
c = conn.cursor()

c.execute("SELECT id, tnea_code, name FROM colleges WHERE name LIKE '%Thiagarajar%' OR name LIKE '%Anna University%'")
print("Colleges matching Thiagarajar or Anna Univ:")
for row in c.fetchall():
    print(row)

conn.close()
