import sqlite3

def fix_db():
    conn = sqlite3.connect('app2.db', timeout=10)
    c = conn.cursor()
    
    # 1. Merge College 5008 into 0001
    c.execute("SELECT id FROM colleges WHERE tnea_code = '0001'")
    ceg_id = c.fetchone()
    c.execute("SELECT id FROM colleges WHERE tnea_code = '5008'")
    dup_id = c.fetchone()
    
    if ceg_id and dup_id:
        ceg_id = ceg_id[0]
        dup_id = dup_id[0]
        
        # Move branches
        c.execute("UPDATE college_branches SET college_id = ? WHERE college_id = ?", (ceg_id, dup_id))
        
        # Move facilities
        c.execute("UPDATE facilities SET college_id = ? WHERE college_id = ?", (ceg_id, dup_id))
        
        # Move hostel
        c.execute("UPDATE hostel_information SET college_id = ? WHERE college_id = ?", (ceg_id, dup_id))
        
        # Move fees
        c.execute("UPDATE fee_structure SET college_id = ? WHERE college_id = ?", (ceg_id, dup_id))
        
        # Move placements
        c.execute("UPDATE placement_statistics SET college_id = ? WHERE college_id = ?", (ceg_id, dup_id))
        
        # Delete duplicate college
        c.execute("DELETE FROM colleges WHERE id = ?", (dup_id,))
        print("Merged College 5008 into 0001")
        
    # 2. Merge Branch SB into CS
    c.execute("SELECT id FROM branches WHERE code = 'CS'")
    cs_id = c.fetchone()
    c.execute("SELECT id FROM branches WHERE code = 'SB'")
    sb_id = c.fetchone()
    
    if cs_id and sb_id:
        cs_id = cs_id[0]
        sb_id = sb_id[0]
        
        # Update college_branches
        c.execute("SELECT id, college_id FROM college_branches WHERE branch_id = ?", (sb_id,))
        sb_branches = c.fetchall()
        for cb_id, coll_id in sb_branches:
            # check if college already has CS
            c.execute("SELECT id FROM college_branches WHERE college_id = ? AND branch_id = ?", (coll_id, cs_id))
            existing = c.fetchone()
            if existing:
                # Merge cutoffs to existing CS and delete SB cb
                c.execute("UPDATE yearly_cutoffs SET college_branch_id = ? WHERE college_branch_id = ?", (existing[0], cb_id))
                c.execute("UPDATE seat_matrix SET college_branch_id = ? WHERE college_branch_id = ?", (existing[0], cb_id))
                c.execute("DELETE FROM college_branches WHERE id = ?", (cb_id,))
            else:
                # Just update the branch_id
                c.execute("UPDATE college_branches SET branch_id = ? WHERE id = ?", (cs_id, cb_id))
                
        # Delete SB branch
        c.execute("DELETE FROM branches WHERE id = ?", (sb_id,))
        print("Merged Branch SB into CS")
        
    conn.commit()
    conn.close()

if __name__ == '__main__':
    fix_db()
