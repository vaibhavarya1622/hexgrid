from flask import Flask,request,send_from_directory
import json
import csv
import pandas as pd

app = Flask(__name__,static_url_path='',static_folder='frontend/build')

@app.route('/')
def index():
    return send_from_directory(app.static_folder,'index.html')

@app.route('/getlati',methods=["POST"])
def getlati():
    if request.method == 'POST':
        value_lati = request.json['latikey']
        dfa = pd.DataFrame(value_lati,columns=["Latitudes"])
        dfa.to_csv('latitude.csv', index=False)
        return "ok"
        
@app.route('/getlongi',methods=["POST"])
def getlongi():
    if request.method == 'POST':
        value_longi = request.json['longikey']
        dfb = pd.DataFrame(value_longi,columns=["Longitudes"])
        dfb.to_csv('longitude.csv', index=False)
        return "ok"
