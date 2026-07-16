import sqlite3

db_path = r"C:\Users\Admin\.gemini\antigravity\scratch\tnea_backend\app.db"
conn = sqlite3.connect(db_path)
c = conn.cursor()

# 1. Revert the old 2008's name back to CEG. We know its id was 4.
c.execute("UPDATE colleges SET name = 'University Departments of Anna University, Chennai - CEG Campus' WHERE id = 4")

# 2. Give id=4 a temporary code
c.execute("UPDATE colleges SET tnea_code = 'TEMP' WHERE id = 4")

# 3. Give the real Thiagarajar (which was 5008, id=375) the code 2008.
c.execute("UPDATE colleges SET tnea_code = '2008' WHERE id = 375")

# 4. Give the old CEG (id=4) the code 5008
c.execute("UPDATE colleges SET tnea_code = '5008' WHERE id = 4")

conn.commit()
print("Successfully swapped 2008 and 5008!")

conn.close()
