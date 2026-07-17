import sqlite3

def check_db():
    conn = sqlite3.connect('app.db')
    c = conn.cursor()
    
    print("--- Max Year in Cutoffs ---")
    c.execute("SELECT MAX(year) FROM yearly_cutoffs")
    print(c.fetchone())
    
    print("\n--- Duplicate Colleges 0001 and 5008 ---")
    c.execute("SELECT id, tnea_code, name FROM colleges WHERE tnea_code IN ('0001', '5008')")
    for row in c.fetchall():
        print(row)
        
    print("\n--- Branches with 'Computer Science and Engineering' ---")
    c.execute("SELECT id, code, name FROM branches WHERE name LIKE '%Computer Science%'")
    for row in c.fetchall():
        print(row)
        
if __name__ == '__main__':
    check_db()
