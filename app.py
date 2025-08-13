
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__, static_folder=".", static_url_path="")
CORS(app)

# ==============================
# DATABASE SETUP
# ==============================
def init_db():
    conn = sqlite3.connect("users.db")
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT,
            role TEXT
        )
    """)
    # Sample users
    sample_users = [
        ("admin", "1234", "admin"),
        ("company1", "abcd", "company"),
        ("employee1", "pass1", "employee"),
        ("farmer1", "farm123", "farmer")
    ]
    for u in sample_users:
        cur.execute("INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)", u)
    conn.commit()
    conn.close()

# ==============================
# API ROUTES
# ==============================
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    role = data.get("role")

    conn = sqlite3.connect("users.db")
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE username=? AND password=? AND role=?", (username, password, role))
    user = cur.fetchone()
    conn.close()

    if user:
        return jsonify({"success": True, "message": "Login successful", "role": role})
    else:
        return jsonify({"success": False, "message": "Invalid credentials"})

@app.route("/dashboard-data/<role>", methods=["GET"])
def dashboard_data(role):
    sample_data = {
        "admin": {"total_users": 4, "system_status": "Running"},
        "company": {"sales": 5000, "employees": 12},
        "employee": {"tasks": 8, "projects": 3},
        "farmer": {"crops": ["Wheat", "Rice"], "harvest": "Good"}
    }
    return jsonify(sample_data.get(role, {}))

# ==============================
# FRONTEND ROUTES
# ==============================
@app.route("/")
def home():
    return send_from_directory(".", "index.html")

@app.route("/<path:filename>")
def serve_static_files(filename):
    return send_from_directory(".", filename)

# ==============================
# MAIN
# ==============================
if __name__ == "__main__":
    init_db()
    app.run(debug=True)
