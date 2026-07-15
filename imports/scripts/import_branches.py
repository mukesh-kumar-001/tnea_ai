import sqlite3
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent.parent
DB = BASE / "app.db"

branches = {
    "AD": "Artificial Intelligence and Data Science",
    "AU": "Automobile Engineering",
    "AT": "Artificial Intelligence and Machine Learning",
    "BM": "Biomedical Engineering",
    "BT": "Biotechnology",
    "CE": "Civil Engineering",
    "CH": "Chemical Engineering",
    "CL": "Civil Engineering (Tamil Medium)",
    "CM": "Computer Science and Engineering (Tamil Medium)",
    "CN": "Civil Engineering (Computer Applications)",
    "CS": "Computer Science and Engineering",
    "CV": "Civil and Environmental Engineering",
    "EC": "Electronics and Communication Engineering",
    "EE": "Electrical and Electronics Engineering",
    "EI": "Electronics and Instrumentation Engineering",
    "IT": "Information Technology",
    "ME": "Mechanical Engineering",
    "MF": "Manufacturing Engineering",
    "MR": "Mechatronics Engineering",
    "MT": "Metallurgical Engineering",
    "AE": "Aeronautical Engineering",
    "AG": "Agricultural Engineering",
    "FD": "Fashion Technology",
    "FT": "Food Technology",
    "RA": "Robotics and Automation"
}

conn = sqlite3.connect(DB)
cur = conn.cursor()

count = 0

for code, name in branches.items():
    cur.execute(
        "INSERT OR IGNORE INTO branches(code, name) VALUES(?, ?)",
        (code, name)
    )
    count += 1

conn.commit()
conn.close()

print(f"Imported {count} branch master records.")