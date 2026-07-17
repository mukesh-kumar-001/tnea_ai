import sqlite3

def check_db():
    conn = sqlite3.connect('app.db')
    c = conn.cursor()
    
    print("--- Top 5 cutoffs ordered by general_rank ---")
    c.execute("SELECT id, general_rank FROM yearly_cutoffs WHERE year = 2025 AND category = 'BC' ORDER BY general_rank ASC LIMIT 5")
    for row in c.fetchall():
        print(row)
        
if __name__ == '__main__':
    check_db()
