import sqlite3
import requests
import json
import time
from pathlib import Path
from bs4 import BeautifulSoup

BASE = Path(__file__).resolve().parent.parent

DB = BASE.parent / "app.db"
OUTPUT = BASE / "json" / "cutoffs_2025.json"

HEADERS = {
    "User-Agent": "Mozilla/5.0"
}

COMMUNITIES = ["OC", "BC", "MBC", "SC", "BCM", "SCA", "ST"]

conn = sqlite3.connect(DB)
cur = conn.cursor()

cur.execute("""
SELECT tnea_code, name
FROM colleges
ORDER BY tnea_code
""")

colleges = cur.fetchall()

all_records = []

print("=" * 60)
print(f"Colleges to scrape: {len(colleges)}")
print("=" * 60)

for tnea_code, college_name in colleges:

    url_code = str(int(tnea_code))
    url = f"https://tneacutoff.com/college/{url_code}"
    try:

        response = requests.get(
            url,
            headers=HEADERS,
            timeout=20
        )

        if response.status_code != 200:
            print(f"Skipped {tnea_code} ({response.status_code})")
            continue

        soup = BeautifulSoup(response.text, "lxml")

        tables = soup.find_all("table")

        if len(tables) < 3:
            print(f"{tnea_code}: Missing tables")
            continue

        cutoff_table = tables[0]

        rows = cutoff_table.find_all("tr")

        print(f"{tnea_code}: {len(rows)-1} branches")

        all_records.append({
            "tnea_code": tnea_code,
            "college_name": college_name,
            "branches_found": len(rows) - 1
        })

        time.sleep(0.1)

    except Exception as e:
        print(f"{tnea_code}: {e}")

OUTPUT.parent.mkdir(exist_ok=True)

with open(OUTPUT, "w", encoding="utf-8") as f:
    json.dump(all_records, f, indent=4)

conn.close()

print("=" * 60)
print("Finished")
print(f"Colleges processed: {len(all_records)}")
print(f"JSON saved to: {OUTPUT}")
print("=" * 60)