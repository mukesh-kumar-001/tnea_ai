import json
import fitz
import re
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
PDF_FILE = BASE_DIR / "pdfs" / "Information_about_colleges.pdf"

doc = fitz.open(PDF_FILE)

colleges = []

for page_no, page in enumerate(doc, start=1):

    text = page.get_text()

    # Skip non-college pages
    if "Name of the Principal" not in text:
        continue

    blocks = page.get_text("blocks")

    college = {
    "page": page_no,
    "tnea_code": "",
    "name": "",
    "district": "",
    "type": "",
    "established_year": None,
    "autonomous": False,
    "minority": False,
    "principal": "",
    "address": "",
    "taluk": "",
    "pincode": "",
    "phone": "",
    "email": "",
    "website": "",
    "transport": False,
    "hostel": {},
    "branches": []
}
    # -------- Find college code --------
    for block in blocks:
        block_text = block[4].strip()

        m = re.search(r"\b\d{4}\b", block_text)
        if m:
            college["tnea_code"] = m.group()
            break

    # -------- Find college name --------
    # Use the first long line that is not a label
    labels = {
        "District",
        "Taluk",
        "Address.",
        "Address",
        "Phone/Fax",
        "Website",
        "EMail-ID",
        "Autonomous",
        "Minority",
        "Hostel",
        "Facilities",
        "Name of the Principal",
        "Bank",
        "Transport Facilities",
    }

    longest = ""

    for block in blocks:

        for line in block[4].split("\n"):

            t = line.strip()

            if len(t) < 25:
                continue

            if any(t.startswith(label) for label in labels):
                continue

            if re.fullmatch(r"\d+", t):
                continue

            if len(t) > len(longest):
                longest = t

    college["name"] = longest

    # -------- District --------
    m = re.search(r"District\s+([A-Z ]+)", text)

    if m:
        college["district"] = m.group(1).strip()

    # -------- Autonomous --------
    m = re.search(r"Autonomous\s+Status\s+(Yes|No)", text)

    if m:
       college["autonomous"] = (
    m.group(1).strip().lower() == "yes"
)

    colleges.append(college)

print("=" * 80)
print(f"Detected {len(colleges)} colleges")
print("=" * 80)

# Convert Yes/No to True/False


JSON_DIR = BASE_DIR / "json"
JSON_DIR.mkdir(exist_ok=True)

OUTPUT_JSON = JSON_DIR / "colleges_2023.json"

with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(colleges, f, indent=4, ensure_ascii=False)

print(f"\nJSON file created successfully:")
print(OUTPUT_JSON)

print("\nFirst 5 colleges:\n")

for c in colleges[:5]:
    print(c)
for page_no, page in enumerate(doc, start=1):
    text = page.get_text()
    if any(code in text for code in ["2621", "2717", "3809"]):
        print(page_no)