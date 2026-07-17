import sqlite3

def audit():
    conn = sqlite3.connect('app.db')
    c = conn.cursor()
    
    print("--- 1. Checking duplicate colleges by name (trimmed/case-insensitive) ---")
    c.execute("SELECT LOWER(TRIM(name)), COUNT(*) FROM colleges GROUP BY LOWER(TRIM(name)) HAVING COUNT(*) > 1")
    col_names = c.fetchall()
    print("Duplicate names:", col_names)
    for name, cnt in col_names:
        c.execute("SELECT id, tnea_code, name, district FROM colleges WHERE LOWER(TRIM(name)) = ?", (name,))
        print("Details:", c.fetchall())
        
    print("\n--- 2. Checking duplicate branches by code or name ---")
    c.execute("SELECT code, COUNT(*) FROM branches GROUP BY code HAVING COUNT(*) > 1")
    print("Duplicate branch codes:", c.fetchall())
    c.execute("SELECT LOWER(TRIM(name)), COUNT(*) FROM branches GROUP BY LOWER(TRIM(name)) HAVING COUNT(*) > 1")
    branch_names = c.fetchall()
    print("Duplicate branch names:", branch_names)
    for name, cnt in branch_names:
        c.execute("SELECT id, code, name FROM branches WHERE LOWER(TRIM(name)) = ?", (name,))
        print("Details:", c.fetchall())

    print("\n--- 3. Checking duplicate entries in college_branches (same college_id, branch_id) ---")
    c.execute("SELECT college_id, branch_id, COUNT(*) FROM college_branches GROUP BY college_id, branch_id HAVING COUNT(*) > 1")
    cb_dups = c.fetchall()
    print("Duplicate college_branches:", cb_dups)
    for cid, bid, cnt in cb_dups:
        c.execute("SELECT id, college_id, branch_id, nba_accredited FROM college_branches WHERE college_id = ? AND branch_id = ?", (cid, bid))
        print("Details:", c.fetchall())
        
    print("\n--- 4. Checking duplicate cutoffs (same college_branch_id, year, category) ---")
    c.execute("SELECT college_branch_id, year, category, COUNT(*) FROM yearly_cutoffs GROUP BY college_branch_id, year, category HAVING COUNT(*) > 1")
    cutoff_dups = c.fetchall()
    print("Duplicate cutoffs count:", len(cutoff_dups))
    if cutoff_dups:
        print("Sample duplicate cutoffs:", cutoff_dups[:5])

    print("\n--- 5. Checking colleges table for potentially duplicated colleges with different codes ---")
    # For example, similar names or same name but different code
    c.execute("SELECT name, tnea_code FROM colleges")
    colleges = c.fetchall()
    # Normalize name to compare
    def clean(n):
        return ''.join(e for e in n if e.isalnum()).lower()
    
    seen = {}
    dups_by_similarity = []
    for name, code in colleges:
        clean_name = clean(name)
        if clean_name in seen:
            dups_by_similarity.append((seen[clean_name], code, name))
        else:
            seen[clean_name] = code
    print("Potential duplicates by similarity:", dups_by_similarity)

    conn.close()

if __name__ == '__main__':
    audit()
