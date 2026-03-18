# EXP 6 — Simple Flask App

## Setup

1. Create a Python virtual environment (recommended):
   ```bash
   python -m venv .venv
   .\.venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Run

```bash
python app.py
```

Then open http://127.0.0.1:5000 in your browser.

## Endpoints

- `/` — renders the home page.
- `/hello/<name>` — returns a simple greeting.
