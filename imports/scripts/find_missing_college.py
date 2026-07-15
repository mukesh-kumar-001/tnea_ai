import json
import sqlite3
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent.parent

conn = sqlite3.connect(BASE / "app.db")
cur = conn.cursor()

with open(BASE / "imports/json/colleges_2023.json", encoding="utf-8") as f:
    colleges = json.load(f)

db_codes = {
    row[0]
    for row in cur.execute("SELECT tnea_code FROM colleges")
}

for c in colleges:
    if c["tnea_code"] not in db_codes:
        print(c)

conn.close()