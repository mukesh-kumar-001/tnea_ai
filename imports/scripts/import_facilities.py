import sqlite3
import json
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent

DB = BASE.parent / "app.db"

conn = sqlite3.connect(DB)
cur = conn.cursor()

with open(BASE / "json" / "facilities_2023.json", encoding="utf-8") as f:
    facilities = json.load(f)

inserted = 0
updated = 0
missing = 0

for item in facilities:

    cur.execute(
        "SELECT id FROM colleges WHERE tnea_code=?",
        (item["tnea_code"],)
    )
    row = cur.fetchone()

    if not row:
        missing += 1
        print("Missing:", item["tnea_code"])
        continue

    college_id = row[0]

    cur.execute(
        "SELECT id FROM facilities WHERE college_id=?",
        (college_id,)
    )
    exists = cur.fetchone()

    if exists:
        cur.execute("""
            UPDATE facilities
            SET has_transport=?
            WHERE college_id=?
        """, (
            item["has_transport"],
            college_id
        ))
        updated += 1
    else:
        cur.execute("""
            INSERT INTO facilities
            (college_id, has_library, has_sports, has_transport)
            VALUES (?, NULL, NULL, ?)
        """, (
            college_id,
            item["has_transport"]
        ))
        inserted += 1

conn.commit()
conn.close()

print("=" * 50)
print("Inserted :", inserted)
print("Updated  :", updated)
print("Missing  :", missing)
print("=" * 50)