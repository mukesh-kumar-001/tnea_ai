import sqlite3
import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[2]

DB = BASE_DIR / "app.db"
JSON_FILE = BASE_DIR / "imports" / "json" / "colleges_2023.json"

conn = sqlite3.connect(DB)
cursor = conn.cursor()

with open(JSON_FILE, "r", encoding="utf-8") as f:
    colleges = json.load(f)

updated = 0
not_found = 0

for college in colleges:

    cursor.execute("""
        UPDATE colleges
        SET
            name=?,
            district=?,
            autonomous=?,
            page=?
        WHERE tnea_code=?
    """, (
        college["name"],
        college["district"],
        1 if college["autonomous"] else 0,
        college["page"],
        college["code"]
    ))

    if cursor.rowcount:
        updated += 1
    else:
        not_found += 1
        print(f"Not found: {college['code']}")

conn.commit()
conn.close()

print()
print("="*50)
print(f"Updated : {updated}")
print(f"Not found : {not_found}")
print("="*50)