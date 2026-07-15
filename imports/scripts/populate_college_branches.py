import sqlite3
import json
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent

DB = BASE.parent / "app.db"
INPUT = BASE / "json" / "cutoffs_2025.json"

conn = sqlite3.connect(DB)
cur = conn.cursor()

with open(INPUT, "r", encoding="utf-8") as f:
    records = json.load(f)

# -------------------------------
# Build lookup tables
# -------------------------------

cur.execute("SELECT id, tnea_code FROM colleges")
college_lookup = {
    str(code).zfill(4): cid
    for cid, code in cur.fetchall()
}

cur.execute("SELECT id, code FROM branches")
branch_lookup = {
    code: bid
    for bid, code in cur.fetchall()
}

cur.execute("SELECT college_id, branch_id FROM college_branches")
existing = {
    (college_id, branch_id)
    for college_id, branch_id in cur.fetchall()
}

added = 0
already_exists = 0
missing_college = 0
missing_branch = 0
missing_codes = set()

# -------------------------------
# Insert missing mappings
# -------------------------------

seen = set()

for row in records:

    tnea_code = str(row["tnea_code"]).zfill(4)
    branch_code = row["branch_code"]

    key = (tnea_code, branch_code)

    if key in seen:
        continue

    seen.add(key)

    college_id = college_lookup.get(tnea_code)

    if college_id is None:
        print("College missing:", tnea_code)
        missing_college += 1
        continue

    branch_id = branch_lookup.get(branch_code)

    if branch_id is None:
      missing_codes.add(branch_code)
      missing_branch += 1
      continue
print("\nMissing branch codes:")
for code in sorted(missing_codes):
    print(code)
        

    if (college_id, branch_id) in existing:
        already_exists += 1
        continue

    cur.execute("""
        INSERT INTO college_branches
        (
            college_id,
            branch_id,
            nba_accredited
        )
        VALUES (?, ?, 0)
    """, (college_id, branch_id))

    existing.add((college_id, branch_id))
    added += 1

conn.commit()

print("=" * 60)
print("Finished")
print("=" * 60)
print("Added           :", added)
print("Already exists  :", already_exists)
print("Missing college :", missing_college)
print("Missing branch  :", missing_branch)

conn.close()