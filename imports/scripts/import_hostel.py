import json
import sqlite3
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent

DB = BASE_DIR / "app.db"
JSON_FILE = BASE_DIR / "imports" / "json" / "hostel_2023.json"

conn = sqlite3.connect(DB)
cur = conn.cursor()

with open(JSON_FILE, "r", encoding="utf-8") as f:
    hostels = json.load(f)

inserted = 0
updated = 0
missing = 0

for h in hostels:

    cur.execute(
        "SELECT id FROM colleges WHERE tnea_code=?",
        (h["tnea_code"],)
    )

    row = cur.fetchone()

    if not row:
        print("Missing:", h["tnea_code"])
        missing += 1
        continue

    college_id = row[0]

    cur.execute(
        "SELECT id FROM hostel_information WHERE college_id=?",
        (college_id,)
    )

    existing = cur.fetchone()

    if existing:
        cur.execute("""
            UPDATE hostel_information
            SET boys_hostel_available=?,
                girls_hostel_available=?,
                annual_fee=?
            WHERE college_id=?
        """,
        (
            h["boys"],
            h["girls"],
            h["annual_fee"],
            college_id
        ))
        updated += 1

    else:
        cur.execute("""
            INSERT INTO hostel_information
            (college_id,boys_hostel_available,girls_hostel_available,annual_fee)
            VALUES(?,?,?,?)
        """,
        (
            college_id,
            h["boys"],
            h["girls"],
            h["annual_fee"]
        ))
        inserted += 1

conn.commit()

print("=" * 50)
print("Inserted :", inserted)
print("Updated  :", updated)
print("Missing  :", missing)
print("=" * 50)

conn.close()