#original project
#virtualenv env
#.\\env\Scripts\activate.ps1
#pip install flask flask-sqlalchemy
#pip install pandas
#python app.py
from flask import Flask, render_template, url_for, request, jsonify,send_from_directory
import json
import csv
import pandas as pd
# from flask_cors import cross_origin

app = Flask(__name__,static_url_path='',static_folder='frontend/build')

@app.route('/')
def index():
    return send_from_directory(app.static_folder,'index.html')

@app.route('/getlati',methods=["POST"])
# @cross_origin()
def getlati():
    if request.method == 'POST':
        ##data = request.get_json(silent=True)
        ##print(data)
        ##with open("sample.json", "w") as outfile:
            ##outfile.write(data)
        ##return jsonify(data)
        #data = jsonify(data)
        value_lati = request.json['latikey']
        dfa = pd.DataFrame(value_lati,columns=["Latitudes"])
        dfa.to_csv('latitude.csv', index=False)
        return "ok"
        
@app.route('/getlongi',methods=["POST"])
# @cross_origin()
def getlongi():
    if request.method == 'POST':
        value_longi = request.json['longikey']
        dfb = pd.DataFrame(value_longi,columns=["Longitudes"])
        dfb.to_csv('longitude.csv', index=False)
        return "ok"
#def getinfo():
    # here we want to get the value of the key (i.e. ?key=value)
#    value = request.args.getlist('key[]')
