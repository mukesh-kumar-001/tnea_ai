import json
import sqlite3
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent.parent

DB = BASE / "app.db"
JSON = BASE / "imports" / "json" / "branches_2023.json"

conn = sqlite3.connect(DB)
cur = conn.cursor()

with open(JSON, "r", encoding="utf-8") as f:
    branches = json.load(f)

inserted = 0
skipped = 0

for item in branches:

    # Find college
    cur.execute(
        "SELECT id FROM colleges WHERE tnea_code=?",
        (item["college_code"],)
    )
    college = cur.fetchone()

    if not college:
        skipped += 1
        continue

    # Find branch
    cur.execute(
        "SELECT id FROM branches WHERE code=?",
        (item["branch_code"],)
    )
    branch = cur.fetchone()

    if not branch:
        skipped += 1
        continue

    # Prevent duplicates
    cur.execute("""
        SELECT id
        FROM college_branches
        WHERE college_id=? AND branch_id=?
    """, (college[0], branch[0]))

    if cur.fetchone():
        continue

    cur.execute("""
        INSERT INTO college_branches
        (
            college_id,
            branch_id,
            nba_accredited
        )
        VALUES (?, ?, ?)
    """, (
        college[0],
        branch[0],
        int(item["nba"])
    ))

    inserted += 1

conn.commit()
conn.close()

print("=" * 50)
print("Inserted :", inserted)
print("Skipped  :", skipped)
print("=" * 50)