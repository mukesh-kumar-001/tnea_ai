import json
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent
INPUT = BASE / "json" / "cutoffs_2025.json"

MISSING = {
    "AL","BC","CD","CF","CG","CI","CJ","CK","DA","EA",
    "EF","EL","EV","ID","MB","MJ","MZ","SC","SF","XS"
}

with open(INPUT, "r", encoding="utf-8") as f:
    data = json.load(f)

found = {}

for row in data:
    code = row["branch_code"]

    if code in MISSING:
        found[code] = row["branch_name"]

print("=" * 60)

for code in sorted(found):
    print(f"{code:3} -> {found[code]}")

print("=" * 60)
print("Found", len(found), "of", len(MISSING))