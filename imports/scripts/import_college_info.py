import fitz
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

PDF_DIR = BASE_DIR / "pdfs"
OUTPUT_DIR = BASE_DIR / "output"

OUTPUT_DIR.mkdir(exist_ok=True)

pdf_files = list(PDF_DIR.glob("*.pdf"))

if not pdf_files:
    print("No PDF files found in imports/pdfs/")
    exit()

for pdf in pdf_files:
    print(f"Reading {pdf.name}...")

    doc = fitz.open(pdf)
    text = ""

    for page in doc:
        text += page.get_text()

    output_file = OUTPUT_DIR / f"{pdf.stem}.txt"
    output_file.write_text(text, encoding="utf-8")

    
    print(f"Pages extracted: {len(doc)}")
print(f"Output saved to: {output_file}")
print("Extraction complete.")
print(f"Extracted → {output_file.name}")

print("Done.")