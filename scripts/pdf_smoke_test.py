"""
Fills the resume Builder form once per template and downloads the exported
PDF, so every template's PDF output can be checked in one place.

Usage:
    python scripts/pdf_smoke_test.py [base_url] [output_dir]

Defaults:
    base_url:   http://localhost:5173
    output_dir: ./pdf_test_results  (next to this script's project root)

Requires: the dev server already running (`npm run dev`), Python 3, and
`pip install selenium` (Selenium 4's built-in manager downloads a matching
chromedriver automatically as long as Chrome is installed).
"""

import os
import sys
import time
import shutil

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

TEMPLATE_IDS = [
    "modern",
    "minimal",
    "portfolio",
    "editorial-dark",
    "editorial-light",
    "bold",
    "timeline",
    "corporate",
    "ats",
]

SAMPLE_DATA = {
    "name": "Selenium Test User",
    "designation": "QA Automation Engineer",
    "experiences[0].mainHeading": "Senior Test Engineer",
    "experiences[0].companyName": "Acme Testing Co.",
    "experiences[0].date": "2023 -- Present",
    "experiences[0].description": (
        "Automated end-to-end regression tests across every template variant."
    ),
    "projects[0].mainHeading": "Automated PDF QA Suite",
    "projects[0].date": "2026",
    "projects[0].description": (
        "Built a Selenium suite that renders and downloads every resume "
        "template for visual regression checks."
    ),
    "education[0].mainHeading": "BS Computer Science",
    "education[0].schoolName": "FAST NUCES",
    "education[0].date": "2019 -- 2023",
    "rightSidebar.skills[0]": "Test Automation",
    "rightSidebar.tools[0]": "Selenium",
    "rightSidebar.languages[0]": "English",
}

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SAMPLE_IMAGE = os.path.join(PROJECT_ROOT, "public", "photo.png")


def build_driver(download_dir):
    options = webdriver.ChromeOptions()
    options.add_argument("--headless=new")
    options.add_argument("--window-size=1440,2200")
    options.add_experimental_option(
        "prefs",
        {
            "download.default_directory": download_dir,
            "download.prompt_for_download": False,
            "plugins.always_open_pdf_externally": True,
        },
    )
    driver = webdriver.Chrome(options=options)
    driver.execute_cdp_cmd(
        "Page.setDownloadBehavior",
        {"behavior": "allow", "downloadPath": download_dir},
    )
    return driver


def fill_form(driver, wait):
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[name="name"]')))

    for field_name, value in SAMPLE_DATA.items():
        el = driver.find_element(By.CSS_SELECTOR, f'[name="{field_name}"]')
        el.clear()
        el.send_keys(value)

    image_input = driver.find_element(By.CSS_SELECTOR, 'input[name="image"]')
    image_input.send_keys(SAMPLE_IMAGE)

    submit_btn = driver.find_element(By.CSS_SELECTOR, 'button[type="submit"]')
    submit_btn.click()


def wait_for_download(download_dir, timeout=20):
    deadline = time.time() + timeout
    while time.time() < deadline:
        files = [
            f
            for f in os.listdir(download_dir)
            if f.endswith(".pdf") and not f.endswith(".crdownload")
        ]
        if files:
            return os.path.join(download_dir, files[0])
        time.sleep(0.5)
    return None


def run(base_url, output_dir):
    os.makedirs(output_dir, exist_ok=True)
    results = []

    for template_id in TEMPLATE_IDS:
        template_dir = os.path.join(output_dir, f"_dl_{template_id}")
        os.makedirs(template_dir, exist_ok=True)

        print(f"[{template_id}] starting...")
        driver = build_driver(template_dir)
        try:
            wait = WebDriverWait(driver, 15)
            driver.get(f"{base_url}/builder?template={template_id}")
            time.sleep(2)  # let the dev-server-served CSS finish applying
            fill_form(driver, wait)

            # Give the preview a moment to re-render with submitted data
            # before triggering the html2canvas capture.
            time.sleep(1.5)

            download_btn = wait.until(
                EC.element_to_be_clickable(
                    (By.XPATH, '//button[contains(text(), "Download Resume")]')
                )
            )
            download_btn.click()

            downloaded = wait_for_download(template_dir)
            if downloaded:
                final_path = os.path.join(output_dir, f"{template_id}.pdf")
                shutil.move(downloaded, final_path)
                size_kb = os.path.getsize(final_path) / 1024
                print(f"[{template_id}] OK -> {final_path} ({size_kb:.1f} KB)")
                results.append((template_id, "OK", final_path))
            else:
                print(f"[{template_id}] FAILED: no PDF appeared within timeout")
                results.append((template_id, "TIMEOUT", None))
        except Exception as exc:  # noqa: BLE001
            print(f"[{template_id}] ERROR: {exc}")
            results.append((template_id, f"ERROR: {exc}", None))
        finally:
            driver.quit()
            shutil.rmtree(template_dir, ignore_errors=True)

    print("\n=== Summary ===")
    for template_id, status, path in results:
        print(f"{template_id:16s} {status}")

    failures = [r for r in results if r[1] != "OK"]
    return 0 if not failures else 1


if __name__ == "__main__":
    base_url = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:5173"
    output_dir = (
        sys.argv[2]
        if len(sys.argv) > 2
        else os.path.join(PROJECT_ROOT, "pdf_test_results")
    )
    sys.exit(run(base_url, output_dir))
