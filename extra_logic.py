from random import choice
from datetime import datetime

# logic that get's random price
prices = ["Home", "Bike", "Free spin", "Nike AirMax", "pen", "Free spin"]
def getPrice():
    data = choice(prices)
    return data

now = datetime.now()
date = now.day
mnt = now.month
year = now.year

current_time = f"{date}-{mnt}-{year}"
