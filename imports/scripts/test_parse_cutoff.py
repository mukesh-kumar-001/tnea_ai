import requests
from bs4 import BeautifulSoup

url = "https://tneacutoff.com/college/2007"

response = requests.get(
    url,
    headers={"User-Agent": "Mozilla/5.0"},
    timeout=20
)
with open("page.html", "w", encoding="utf-8") as f:
    f.write(response.text)

print("Status:", response.status_code)
print("Length:", len(response.text))

soup = BeautifulSoup(response.text, "lxml")

tables = soup.find_all("table")

print("Tables found:", len(tables))

if len(tables) == 0:
    print("\nFirst 1000 characters of HTML:\n")
    print(response.text[:1000])
else:
    for i, table in enumerate(tables):
        print(f"\nTable {i+1}")

        rows = table.find_all("tr")
        print("Rows:", len(rows))

        for row in rows[:5]:
            cols = [c.get_text(" ", strip=True) for c in row.find_all(["th", "td"])]
            print(cols)