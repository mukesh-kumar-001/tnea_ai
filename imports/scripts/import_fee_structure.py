import sqlite3
import json
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent

DB = BASE.parent / "app.db"

conn = sqlite3.connect(DB)
cur = conn.cursor()

with open(BASE / "json" / "fee_structure_2023.json", encoding="utf-8") as f:
    fees = json.load(f)

inserted = 0
updated = 0
missing = 0

for fee in fees:

    cur.execute(
        "SELECT id FROM colleges WHERE tnea_code=?",
        (fee["tnea_code"],)
    )
    row = cur.fetchone()

    if not row:
        print("Missing:", fee["tnea_code"])
        missing += 1
        continue

    college_id = row[0]

    cur.execute(
        "SELECT id FROM fee_structure WHERE college_id=? AND year=?",
        (college_id, fee["year"])
    )
    exists = cur.fetchone()

    values = (
        fee["tuition_fee"],
        fee["admission_fee"],
        fee["establishment_fee"],
        fee["hostel_fee"],
        fee["transport_min_fee"],
        fee["transport_max_fee"],
    )

    if exists:
        cur.execute("""
            UPDATE fee_structure
            SET tuition_fee=?,
                admission_fee=?,
                establishment_fee=?,
                hostel_fee=?,
                transport_min_fee=?,
                transport_max_fee=?
            WHERE college_id=? AND year=?
        """, values + (college_id, fee["year"]))
        updated += 1
    else:
        cur.execute("""
            INSERT INTO fee_structure(
                college_id,
                year,
                tuition_fee,
                admission_fee,
                establishment_fee,
                hostel_fee,
                transport_min_fee,
                transport_max_fee
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            college_id,
            fee["year"],
            *values
        ))
        inserted += 1

conn.commit()
conn.close()

print("=" * 50)
print("Inserted :", inserted)
print("Updated  :", updated)
print("Missing  :", missing)
print("=" * 50)
