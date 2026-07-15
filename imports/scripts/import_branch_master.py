import json
import sqlite3
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent

DB = BASE_DIR / "app.db"
JSON = BASE_DIR / "imports" / "json" / "branch_master_2023.json"

conn = sqlite3.connect(DB)
cur = conn.cursor()

with open(JSON, encoding="utf-8") as f:
    branches = json.load(f)

inserted = 0
updated = 0

for b in branches:
    cur.execute(
        "SELECT id FROM branches WHERE code=?",
        (b["code"],)
    )

    row = cur.fetchone()

    if row:
        cur.execute(
            "UPDATE branches SET name=? WHERE code=?",
            (b["name"], b["code"])
        )
        updated += 1
    else:
        cur.execute(
            "INSERT INTO branches(code, name) VALUES(?, ?)",
            (b["code"], b["name"])
        )
        inserted += 1

conn.commit()

print("=" * 50)
print("Inserted :", inserted)
print("Updated  :", updated)
print("=" * 50)

conn.close()