import sqlite3
c = sqlite3.connect('app.db')
print("Colleges:")
print(c.execute("SELECT tnea_code, name FROM colleges WHERE tnea_code LIKE '%2006%' OR name LIKE '%PSG%'").fetchall())

print("\nBranches in 2006:")
print(c.execute("SELECT * FROM college_branches WHERE college_id = (SELECT id FROM colleges WHERE tnea_code='2006')").fetchall())

print("\nCutoffs in 2006:")
print(c.execute("SELECT count(*) FROM yearly_cutoffs WHERE college_branch_id IN (SELECT id FROM college_branches WHERE college_id = (SELECT id FROM colleges WHERE tnea_code='2006'))").fetchall())
