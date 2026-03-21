from random import choice

# logic that get's random price
prices = ["Home", "Bike", "Nike", "Pen"]
def getPrice():
    data = choice(prices)
    return data
