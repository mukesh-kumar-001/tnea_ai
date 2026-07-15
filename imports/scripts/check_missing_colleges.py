import json, sqlite3
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent.parent
json_codes = {c["tnea_code"] for c in json.load(open(BASE/"imports/json/colleges_2023.json", encoding="utf-8"))}

conn = sqlite3.connect(BASE/"app.db")
db_codes = {r[0] for r in conn.execute("SELECT tnea_code FROM colleges")}
conn.close()

print("Missing in DB:", sorted(json_codes - db_codes))
print("Extra in DB:", sorted(db_codes - json_codes))