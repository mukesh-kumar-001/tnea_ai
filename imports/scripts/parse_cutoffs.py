import asyncio
import json
import sqlite3
from pathlib import Path

from playwright.async_api import (
    async_playwright,
    TimeoutError as PlaywrightTimeoutError
)

# ============================================================
# CONFIGURATION
# ============================================================

DB_PATH = "app.db"

OUTPUT = Path("imports/json/tnea_cutoffs_all_years.json")

RAW_HTML = Path("imports/raw_html")

CHECKPOINT = Path("imports/checkpoints")

LOG_DIR = Path("imports/logs")

for folder in (
    OUTPUT.parent,
    RAW_HTML,
    CHECKPOINT,
    LOG_DIR
):
    folder.mkdir(
        parents=True,
        exist_ok=True
    )


CATEGORY_COLUMNS = [
    "OC",
    "BC",
    "MBC",
    "SC",
    "BCM",
    "SCA",
    "ST"
]


VALID_YEARS = set(
    range(2020, 2035)
)


# ============================================================
# UTILITY
# ============================================================

def clean(text):

    if text is None:
        return ""

    return (
        text
        .replace("\xa0", " ")
        .replace("\n", " ")
        .replace("\t", " ")
        .strip()
    )


def safe_float(value):

    value = clean(value)

    if value in ("", "-"):
        return None

    try:
        return float(value)
    except:
        return None


def safe_int(value):

    value = clean(value)

    if value in ("", "-"):
        return None

    try:
        return int(
            value.replace(",", "")
        )
    except:
        return None


# ============================================================
# DATABASE
# ============================================================

def load_colleges():

    conn = sqlite3.connect(DB_PATH)

    cur = conn.cursor()

    cur.execute("""

        SELECT tnea_code

        FROM colleges

        ORDER BY CAST(tnea_code AS INTEGER)

    """)

    colleges = [

        str(row[0]).zfill(4)

        for row in cur.fetchall()

    ]

    conn.close()

    return colleges


# ============================================================
# CHECKPOINT SUPPORT
# ============================================================

def load_completed():

    file = CHECKPOINT / "completed.json"

    if not file.exists():

        return set()

    with open(
        file,
        encoding="utf8"
    ) as f:

        return set(json.load(f))


def save_completed(completed):

    with open(
        CHECKPOINT / "completed.json",
        "w",
        encoding="utf8"
    ) as f:

        json.dump(
            sorted(list(completed)),
            f,
            indent=4
        )


# ============================================================
# PAGE LOADER
# ============================================================

async def open_college(page, college_code):

    url = f"https://tneacutoff.com/college/{int(college_code)}"

    print("=" * 70)
    print("Opening", url)

    for attempt in range(3):

        try:

            await page.goto(
                url,
                wait_until="domcontentloaded",
                timeout=60000
            )

            await page.wait_for_selector(
                "table",
                timeout=30000
            )

            break

        except PlaywrightTimeoutError:

            if attempt == 2:
                return False

            print(
                f"Retry {attempt+1}"
            )

            await page.wait_for_timeout(
                3000
            )

    title = await page.title()

    if "404" in title.lower():

        print("404 skipped")

        return False

    html = await page.content()

    with open(
        RAW_HTML / f"{college_code}.html",
        "w",
        encoding="utf8"
    ) as f:

        f.write(html)

    return True


# ============================================================
# YEAR DISCOVERY
# ============================================================

async def get_available_years(page):

    buttons = page.locator('button[aria-haspopup="listbox"]')

    current_year = None
    if await buttons.count() > 1:
        try:
            text = clean(await buttons.nth(1).text_content())
            for y in VALID_YEARS:
                if str(y) in text:
                    current_year = y
                    break
        except Exception:
            pass

    years = []

    for attempt in range(3):
        if await buttons.count() > 1:
            try:
                await buttons.nth(1).click()
            except Exception:
                pass

        await page.wait_for_timeout(700)

        options = page.locator("div.cursor-pointer")
        count = await options.count()

        if count > 0:
            for i in range(count):
                text = clean(await options.nth(i).text_content())
                if text.isdigit():
                    year = int(text)
                    if year in VALID_YEARS:
                        years.append(year)
            break

    await page.keyboard.press("Escape")

    if current_year and current_year not in years:
        years.append(current_year)

    years = sorted(list(set(years)), reverse=True)

    print("Years:", years)

    return years


# ============================================================
# CHANGE YEAR
# ============================================================
async def change_year(page, year):
    buttons = page.locator('button[aria-haspopup="listbox"]')

    current_year_text = clean(await buttons.nth(1).text_content())
    if str(year) in current_year_text:
        print(f"Already on {year}")
        return True

    for attempt in range(3):
        await buttons.nth(1).click()
        await page.wait_for_timeout(500)
        
        option = page.locator(f'div.cursor-pointer:has-text("{year}")')
        if await option.count() > 0:
            break
            
    option = page.locator(f'div.cursor-pointer:has-text("{year}")')
    if await option.count() == 0:
        print(f"FAILED TO FIND {year}")
        await page.keyboard.press("Escape")
        return False

    await option.first.click()

    try:
        await page.wait_for_load_state("networkidle", timeout=10000)
    except:
        pass

    await page.wait_for_timeout(1500)

    print("Switched to", year)

    return True

# ============================================================
# TABLE HELPERS
# ============================================================

async def extract_tables(page):

    tables = []

    table_locator = page.locator("table")

    count = await table_locator.count()

    print(f"Tables discovered: {count}")

    for i in range(count):

        table = table_locator.nth(i)

        rows = await table.locator("tr").all()

        parsed_rows = []

        for row in rows:

            cells = await row.locator(
                "th, td"
            ).all_text_contents()

            cells = [
                clean(x)
                for x in cells
            ]

            if any(cells):

                parsed_rows.append(cells)

        if parsed_rows:

            tables.append(parsed_rows)

    return tables


# ============================================================
# TABLE IDENTIFICATION
# ============================================================

def identify_table(rows):

    if not rows:
        return None

    header = " ".join(rows[0]).upper()

    # Cutoff table
    if (
        "OC" in header and
        "BC" in header and
        "MBC" in header and
        "SC" in header
    ):
        return "cutoff"

    # Seat matrix
    if (
        "TOTAL SEATS" in header and
        "ALLOTTED" in header
    ):
        return "seat"

    # Rank table
    if (
        "GENERAL RANK" in header or
        "COMMUNITY RANK" in header
    ):
        return "rank"

    return None


# ============================================================
# CUTOFF PARSER
# ============================================================

def parse_cutoff_table(
    college_code,
    year,
    rows
):

    records = []

    for row in rows[1:]:

        if len(row) < 9:
            continue

        branch_name = row[0]
        branch_code = row[1]

        if (
            branch_code.lower() == "code"
            or branch_code == ""
        ):
            continue

        for i, category in enumerate(CATEGORY_COLUMNS):

            cutoff = safe_float(
                row[i + 2]
            )

            records.append({

                "college_code": college_code,

                "year": year,

                "branch_name": branch_name,

                "branch_code": branch_code,

                "category": category,

                "cutoff_mark": cutoff

            })

    return records


# ============================================================
# RANK PARSER
# ============================================================

def parse_rank_table(
    college_code,
    year,
    rows
):

    records = []

    header = rows[0]

    category_columns = {}

    general_rank_index = None

    community_rank_index = None

    for i, column in enumerate(header):

        text = column.upper()

        if text in CATEGORY_COLUMNS:

            category_columns[i] = text

        elif "GENERAL" in text:

            general_rank_index = i

        elif "COMMUNITY" in text:

            community_rank_index = i

    for row in rows[1:]:

        if len(row) < 2:
            continue

        branch_name = row[0]

        branch_code = row[1]

        for idx, category in category_columns.items():

            community_rank = None

            general_rank = None

            if idx < len(row):

                community_rank = safe_int(
                    row[idx]
                )

            if (
                general_rank_index is not None
                and general_rank_index < len(row)
            ):

                general_rank = safe_int(
                    row[general_rank_index]
                )

            records.append({

                "college_code": college_code,

                "year": year,

                "branch_name": branch_name,

                "branch_code": branch_code,

                "category": category,

                "community_rank": community_rank,

                "general_rank": general_rank

            })

    return records


# ============================================================
# SEAT PARSER
# ============================================================

def parse_seat_table(
    college_code,
    year,
    rows
):

    records = []

    for row in rows[1:]:

        if len(row) < 5:
            continue

        records.append({

            "college_code": college_code,

            "year": year,

            "branch_name": row[0],

            "branch_code": row[1],

            "total_seats": safe_int(row[2]),

            "allotted": safe_int(row[3]),

            "vacant": safe_int(row[4])

        })

    return records
# ============================================================
# PARSE ONE COLLEGE (ALL YEARS)
# ============================================================

async def parse_college(page, college_code):

    ok = await open_college(
        page,
        college_code
    )

    if not ok:
        return []

    years = await get_available_years(page)

    if not years:
        print("No years found, defaulting to 2024 for current page tables.")
        years = [2024]

    all_records = []

    first_year = True

    for year in years:

        print(f"\nYear : {year}")

        if not first_year:

            changed = await change_year(
                page,
                year
            )

            if not changed:

                continue

        first_year = False

        tables = await extract_tables(
            page
        )

        for table in tables:

            table_type = identify_table(
                table
            )

            if table_type == "cutoff":

                all_records.extend(

                    parse_cutoff_table(
                        college_code,
                        year,
                        table
                    )

                )

            elif table_type == "rank":

                all_records.extend(

                    parse_rank_table(
                        college_code,
                        year,
                        table
                    )

                )

            elif table_type == "seat":

                all_records.extend(

                    parse_seat_table(
                        college_code,
                        year,
                        table
                    )

                )

    print(
        f"{college_code} -> {len(all_records)} records"
    )

    return all_records


# ============================================================
# SAVE JSON
# ============================================================

def save_json(records):

    with open(
        OUTPUT,
        "w",
        encoding="utf8"
    ) as f:

        json.dump(
            records,
            f,
            indent=4,
            ensure_ascii=False
        )


# ============================================================
# STATISTICS
# ============================================================

def print_statistics(records):

    colleges = {
        r["college_code"]
        for r in records
    }

    years = {
        r["year"]
        for r in records
        if "year" in r
    }

    cutoff = sum(
        1
        for r in records
        if "cutoff_mark" in r
    )

    rank = sum(
        1
        for r in records
        if "community_rank" in r
    )

    seat = sum(
        1
        for r in records
        if "total_seats" in r
    )

    print("\n" + "=" * 70)

    print("SUMMARY")

    print("=" * 70)

    print("Colleges :", len(colleges))

    print("Years    :", sorted(years))

    print("Cutoffs  :", cutoff)

    print("Ranks    :", rank)

    print("Seats    :", seat)

    print("Records  :", len(records))

    print("=" * 70)


# ============================================================
# MAIN
# ============================================================

async def main():

    colleges = load_colleges()

    completed = load_completed()

    all_records = []

    if OUTPUT.exists():

        with open(
            OUTPUT,
            encoding="utf8"
        ) as f:

            all_records = json.load(f)

    print("=" * 70)

    print("Total Colleges :", len(colleges))

    print("Completed      :", len(completed))

    print("=" * 70)

    async with async_playwright() as p:

        browser = await p.chromium.launch(
            headless=True
        )

        page = await browser.new_page()

        await page.set_viewport_size({

            "width": 1600,

            "height": 1200

        })

        for index, college in enumerate(colleges):

            if college in completed:

                print(
                    f"Skipping {college}"
                )

                continue

            print(
                f"\n[{index+1}/{len(colleges)}] {college}"
            )

            try:

                records = await parse_college(
                    page,
                    college
                )

                all_records.extend(
                    records
                )

                save_json(
                    all_records
                )

                completed.add(
                    college
                )

                save_completed(
                    completed
                )

            except Exception as e:

                print(
                    "FAILED:",
                    college,
                    e
                )

        await browser.close()

    print_statistics(
        all_records
    )


if __name__ == "__main__":

    asyncio.run(main())