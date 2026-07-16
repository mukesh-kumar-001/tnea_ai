import sqlite3

db_path = r"C:\Users\Admin\.gemini\antigravity\scratch\tnea_backend\app.db"
conn = sqlite3.connect(db_path)
c = conn.cursor()

c.execute("SELECT COUNT(*) FROM yearly_cutoffs WHERE college_code = '2008'")
count = c.fetchone()[0]
print(f"Count of cutoffs for 2008: {count}")

c.execute("SELECT COUNT(*) FROM yearly_cutoffs WHERE college_code = '2007'")
count_2007 = c.fetchone()[0]
print(f"Count of cutoffs for 2007: {count_2007}")

# Update college code 2007 cutoffs to 2008? Wait, let's see.
# In the DB, what college is 2007?
c.execute("SELECT name FROM colleges WHERE tnea_code = '2007'")
res = c.fetchone()
print("College 2007 is:", res)

# Let's see what is currently in yearly_cutoffs for both
c.execute("SELECT branch_name, category, cutoff_mark, year FROM yearly_cutoffs WHERE college_code = '2008' LIMIT 5")
print("Sample cutoffs for 2008:", c.fetchall())

c.execute("SELECT branch_name, category, cutoff_mark, year FROM yearly_cutoffs WHERE college_code = '2007' LIMIT 5")
print("Sample cutoffs for 2007:", c.fetchall())

conn.close()
