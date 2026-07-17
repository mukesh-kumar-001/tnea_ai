import sqlite3

def check_db():
    conn = sqlite3.connect('app.db')
    c = conn.cursor()
    
    print("--- Cutoffs in 2025 ---")
    c.execute("SELECT COUNT(*) FROM yearly_cutoffs WHERE year = 2025")
    print(c.fetchone())
    
    c.execute("SELECT * FROM yearly_cutoffs WHERE year = 2025 LIMIT 5")
    for row in c.fetchall():
        print(row)
        
if __name__ == '__main__':
    check_db()
