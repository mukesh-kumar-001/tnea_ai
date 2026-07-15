import fitz
import json
import re
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent

doc = fitz.open(BASE / "pdfs" / "Information_about_colleges.pdf")

hostels = []

for page in doc:

    text = page.get_text()

    if "Hostel" not in text:
        continue

    # Find the first 4-digit code on the page
    code = None
    for block in page.get_text("blocks"):
        m = re.search(r"\b\d{4}\b", block[4])
        if m:
            code = m.group(0)
            break

    if code is None:
        continue

    yesno = re.findall(
        r"Accomodation Available.*?(Yes|No).*?(Yes|No)",
        text,
        re.S,
    )

    if yesno:
        boys = yesno[0][0] == "Yes"
        girls = yesno[0][1] == "Yes"
    else:
        boys = False
        girls = False

    fee = 0.0
    m = re.search(r"Establishment\s+Charges\s+(\d+)", text)
    if m:
        fee = float(m.group(1))

    hostels.append({
        "tnea_code": code,
        "boys": boys,
        "girls": girls,
        "annual_fee": fee
    })

json_dir = BASE / "json"
json_dir.mkdir(exist_ok=True)

with open(json_dir / "hostel_2023.json", "w", encoding="utf-8") as f:
    json.dump(hostels, f, indent=4)

print("Hostels parsed:", len(hostels))
print(hostels[:5])