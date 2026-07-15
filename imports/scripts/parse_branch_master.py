import fitz
import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
PDF = BASE_DIR / "pdfs" / "Information_about_colleges.pdf"

doc = fitz.open(PDF)

branches = []
capture = False

for page in doc:
    lines = [l.strip() for l in page.get_text().splitlines() if l.strip()]

    for i in range(len(lines)):

        if "LIST OF COURSE CODE" in lines[i]:
            capture = True
            continue

        if not capture:
            continue

        if lines[i] == "*****":
            capture = False
            break

        if len(lines[i]) == 2 and lines[i].isupper():

            if i + 1 < len(lines):

                branches.append({
                    "code": lines[i],
                    "name": lines[i + 1]
                })

# Remove duplicates
unique = {}
for b in branches:
    unique[b["code"]] = b["name"]

result = [{"code": c, "name": n} for c, n in sorted(unique.items())]

json_dir = BASE_DIR / "json"
json_dir.mkdir(exist_ok=True)

with open(json_dir / "branch_master_2023.json", "w", encoding="utf-8") as f:
    json.dump(result, f, indent=4, ensure_ascii=False)

print("=" * 60)
print("Branches:", len(result))
print("=" * 60)

for b in result:
    print(b)