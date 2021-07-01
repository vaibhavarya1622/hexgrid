from flask import Flask,request,send_from_directory,send_file
import json
import csv
import pandas as pd
# from flask_cors import cross_origin
import nasadownload as nasa
import solar
import correl
import fomatcsv
import rem

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
        solar.getvals()
        fomatcsv.convert()
        correl.cor()
        rem.unwanted()
        return "ok"

@app.route('/submit',methods=["POST"])
# @cross_origin()
def submit():
    value=[request.json['start_date'].split('T')[0],request.json['end_date'].split('T')[0]]
    print(value)
    df=pd.DataFrame(value,columns=['dates'])
    df.to_csv('dates.csv',index=False)
    return 'ok',200

#download csv on download_csv.html
@app.route('/download')
# @cross_origin()
def download_file():
    return send_file('corr_op.csv',as_attachment=True)

if __name__=='__main__':
    app.run(debug=True)