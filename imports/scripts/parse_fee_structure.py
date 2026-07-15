import fitz
import json
import re
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent

doc = fitz.open(BASE / "pdfs" / "Information_about_colleges.pdf")

fees = []

for page in doc:

    text = page.get_text()

    if "Hostel" not in text:
        continue

    # College code
    code = None
    for block in page.get_text("blocks"):
        m = re.search(r"\b\d{4}\b", block[4])
        if m:
            code = m.group(0)
            break

    if code is None:
        continue

    def get_number(label):
        m = re.search(rf"{label}\s+(\d+)", text, re.S)
        if m:
            return float(m.group(1))
        return None

    fees.append({
        "tnea_code": code,
        "year": 2023,
        "tuition_fee": None,
        "admission_fee": get_number("Admission\\s+Fees"),
        "establishment_fee": get_number("Establishment\\s+Charges"),
        "hostel_fee": None,
        "transport_min_fee": get_number("Min\\s+Transport\\s+Charges"),
        "transport_max_fee": get_number("Max\\s+Transport\\s+Charges")
    })

json_dir = BASE / "json"
json_dir.mkdir(exist_ok=True)

with open(json_dir / "fee_structure_2023.json", "w", encoding="utf-8") as f:
    json.dump(fees, f, indent=4, ensure_ascii=False)

print("=" * 60)
print("Fee records parsed:", len(fees))
print("=" * 60)
print(fees[:5])