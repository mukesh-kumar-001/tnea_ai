import json
import sqlite3
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent.parent

with open(BASE / "imports/json/branches_2023.json", encoding="utf-8") as f:
    data = json.load(f)

conn = sqlite3.connect(BASE / "app.db")
cur = conn.cursor()

db_codes = {r[0] for r in cur.execute("SELECT code FROM branches")}

missing = sorted({b["branch_code"] for b in data if b["branch_code"] not in db_codes})

print("=" * 50)
print(f"Missing branch codes ({len(missing)}):")
print("=" * 50)

for code in missing:
    print(code)

conn.close()