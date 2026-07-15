import fitz
import json
import re
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
PDF_FILE = BASE_DIR / "pdfs" / "Information_about_colleges.pdf"

doc = fitz.open(PDF_FILE)

all_branches = []

for page_number, page in enumerate(doc, start=1):

    text = page.get_text()

    if "Approved" not in text or "Intake" not in text:
        continue

    # Find TNEA code (first 4-digit number on the page)
    m = re.search(r"\b\d{4}\b", text)

    if not m:
        continue

    college_code = m.group()

    tokens = text.split()

    i = 0

    while i < len(tokens):

        if re.fullmatch(r"\d+", tokens[i]):

            if i + 5 < len(tokens):

                if re.fullmatch(r"[A-Z]{2}", tokens[i + 1]):

                    try:

                        branch = {
                            "college_code": college_code,
                            "branch_code": tokens[i + 1],
                            "approved_intake": int(tokens[i + 2]),
                            "year_started": int(tokens[i + 3]),
                            "nba": tokens[i + 4] == "Yes",
                            "nba_valid_upto": None if tokens[i + 5] == "-" else int(tokens[i + 5])
                        }

                        all_branches.append(branch)

                        i += 6
                        continue

                    except ValueError:
                        pass

        i += 1

print("=" * 70)
print("Branches found:", len(all_branches))
print("=" * 70)

JSON_DIR = BASE_DIR / "json"
JSON_DIR.mkdir(exist_ok=True)

OUTPUT = JSON_DIR / "branches_2023.json"

with open(OUTPUT, "w", encoding="utf-8") as f:
    json.dump(all_branches, f, indent=4)

print("\nSaved to:")
print(OUTPUT)

print("\nFirst 10 branches:\n")

for b in all_branches[:10]:
    print(b)