import requests
from bs4 import BeautifulSoup

url = "https://tneacutoff.com/college/1"

headers = {
    "User-Agent": "Mozilla/5.0"
}

response = requests.get(url, headers=headers)

print("Status:", response.status_code)

soup = BeautifulSoup(response.text, "lxml")

tables = soup.find_all("table")

print("Tables found:", len(tables))

for i, table in enumerate(tables):
    print("=" * 60)
    print(f"TABLE {i+1}")
    print(table.get_text(" ", strip=True)[:1000])