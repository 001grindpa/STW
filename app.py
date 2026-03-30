from flask import Flask, render_template, redirect, request, session, jsonify
from flask_session import Session
from datetime import timedelta
from extra_logic import getPrice, current_time
import json

app = Flask(__name__)

app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(days=30)
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.before_request
def session_state():
    session.permanent = True

@app.route("/", methods=["GET", "POST"])
def index():
    if not session.get("username"):
        return redirect("/landing")
    return render_template("index.html", page_id="index")

@app.route("/landing", methods=["GET", "POST"])
def landing():
    if request.method == "POST":
        username = request.json["username"]
        if not username.strip():
            return jsonify({"msg": "please enter a username"}), 406
        session["username"] = username
        session["priceFeedObj"] = []
        return jsonify({"msg": "enter"})
        # return redirect("/")
    return render_template("landing.html", page_id = "landing")

@app.route("/randPrice", methods=["GET", "POST"])
def randPrice():
    if not session.get("priceFeedObj"):
        session["priceFeedObj"] = []
    price = getPrice()
    priceFeed = {"msg": price, "date": current_time}
    session.get("priceFeedObj").append(priceFeed)

    
    return jsonify({"priceFeed": priceFeed, "priceFeedObj": session.get("priceFeedObj")})
