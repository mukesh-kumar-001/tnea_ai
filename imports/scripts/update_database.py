import sqlite3
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[2]
DB_PATH = BASE_DIR / "app.db"

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

columns = [
    ("district", "TEXT"),
    ("autonomous", "INTEGER"),
    ("page", "INTEGER")
]

cursor.execute("PRAGMA table_info(colleges)")
existing = [row[1] for row in cursor.fetchall()]

for name, datatype in columns:
    if name not in existing:
        cursor.execute(f"ALTER TABLE colleges ADD COLUMN {name} {datatype}")
        print(f"Added column: {name}")

conn.commit()
conn.close()

print("Database updated successfully!")