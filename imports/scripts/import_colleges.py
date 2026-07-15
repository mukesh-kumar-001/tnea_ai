import json
import sqlite3
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent

DB_FILE = BASE_DIR / "app.db"
JSON_FILE = BASE_DIR / "imports" / "json" / "colleges_2023.json"

conn = sqlite3.connect(DB_FILE)
cursor = conn.cursor()

with open(JSON_FILE, "r", encoding="utf-8") as f:
    colleges = json.load(f)

inserted = 0
updated = 0

for college in colleges:

    cursor.execute(
        """
        SELECT id
        FROM colleges
        WHERE tnea_code = ?
        """,
        (college["tnea_code"],)
    )

    row = cursor.fetchone()

    if row:
        cursor.execute(
            """
            UPDATE colleges
            SET
                name=?,
                district=?,
                autonomous=?,
                page=?
            WHERE tnea_code=?
            """,
            (
                college["name"],
                college["district"],
                int(college["autonomous"]),
                college["page"],
                college["tnea_code"]
            )
        )
        updated += 1

    else:
        cursor.execute(
            """
            INSERT INTO colleges
            (
                tnea_code,
                name,
                district,
                type,
                established_year,
                autonomous,
                page
            )
            VALUES
            (?, ?, ?, ?, ?, ?, ?)
            """,
            (
                college["tnea_code"],
                college["name"],
                college["district"],
                college.get("type", ""),
                college.get("established_year"),
                int(college["autonomous"]),
                college["page"]
            )
        )
        inserted += 1

conn.commit()

print("=" * 60)
print("Inserted :", inserted)
print("Updated  :", updated)
print("=" * 60)

conn.close()
