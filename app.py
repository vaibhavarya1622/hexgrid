from flask import Flask,request,send_from_directory
import json
import csv
import pandas as pd
from flask_cors import cross_origin
from functions import nasadownload as nasa
app = Flask(__name__,static_url_path='',static_folder='frontend/build')

@app.route('/')
def index():
    return send_from_directory(app.static_folder,'index.html')

@app.route('/getlati',methods=["POST"])
# @cross_origin()
def getlati():
    if request.method == 'POST':
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

@app.route('/submit',methods=["POST"])
# @cross_origin()
def submit():
    start_date=request.json['start_date']
    end_date=request.json['end_date']
    with open('dates.csv',mode='w') as csv_file:
        writer=csv.DictWriter(csv_file,fieldnames=['start_date','end_date'])
        writer.writeheader()
        writer.writerow({'start_date':start_date,'end_date':end_date})
    return "success",200

@app.route('/fetch_from_nasa')
# @cross_origin()
def get_data():
    nasa.getvals()
    return 'success',200

# if __name__=='__main__':
#     app.run(debug=True)