import fitz
import json
import re
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent

doc = fitz.open(BASE / "pdfs" / "Information_about_colleges.pdf")

facilities = []

for page in doc:

    text = page.get_text()

    if "Hostel" not in text:
        continue

    # Get TNEA code
    code = None
    for block in page.get_text("blocks"):
        m = re.search(r"\b\d{4}\b", block[4])
        if m:
            code = m.group(0)
            break

    if code is None:
        continue

    # Transport Facilities
    transport = False
    m = re.search(r"Transport\s+Facilities\s*\(Y/N\)\s*(Yes|No)", text, re.S)
    if m:
        transport = (m.group(1) == "Yes")

    facilities.append({
        "tnea_code": code,
        "has_transport": transport
    })

json_dir = BASE / "json"
json_dir.mkdir(exist_ok=True)

with open(json_dir / "facilities_2023.json", "w", encoding="utf-8") as f:
    json.dump(facilities, f, indent=4, ensure_ascii=False)

print("=" * 50)
print("Facilities parsed:", len(facilities))
print("=" * 50)
print(facilities[:5])