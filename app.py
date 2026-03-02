from flask import Flask, render_template, redirect, request, session
from flask_session import Session
from datetime import timedelta

app = Flask(__name__)

app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(days=30)
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.route("/", methods=["GET", "POST"])
def index():
    if not session.get("enter"):
        return redirect("/landing")
    return render_template("index.html")

@app.route("/landing", methods=["GET", "POST"])
def landing():
    return render_template("landing.html", page_id = "landing")