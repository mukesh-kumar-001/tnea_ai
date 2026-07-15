import fitz
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
PDF_FILE = BASE_DIR / "pdfs" / "Information_about_colleges.pdf"

doc = fitz.open(PDF_FILE)

# Change 128 to any page you want to inspect
page = doc[127]   # PDF page 128

text = page.get_text()

print(text)