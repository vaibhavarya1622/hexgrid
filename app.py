#original project
#flask code

#virtualenv env
#.\\env\Scripts\activate.ps1
#pip install flask flask-sqlalchemy
#pip install pandas
#python app.py
from flask import Flask, render_template, url_for, request, jsonify,send_file,send_from_directory
import json
import csv
import pandas as pd
import solar
import fomatcsv
import correl
import rem
import formatcsv_dates
import lstmmodel

app = Flask(__name__)

@app.route('/')
def index():
    return send_from_directory(app.static_folder,'index.html')

@app.route('/getlati',methods=["POST"])
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
def getlongi():
    if request.method == 'POST':
        value_longi = request.json['longikey']
        dfb = pd.DataFrame(value_longi,columns=["Longitudes"])
        mthd=int(request.json['method'])
        dfb.to_csv('longitude.csv', index=False)
        # cdf = pd.read_csv('method.csv',header=None)
        # mthd=cdf[0][0]
        solar.getvals()
        
        fomatcsv.convert()
        
        #fomatcsv_dates.convert_dates()
        #pass your method_var here
        
        correl.cor(mthd)
        lstmmodel.apply()
        rem.unwanted()
        
        return 'ok'
#def getinfo():
    # here we want to get the value of the key (i.e. ?key=value)
#    value = request.args.getlist('key[]')

@app.route('/getstartd',methods=["GET","POST"])
def getstart():
    if request.method == 'POST':
        value = [request.json['start_date'].split('T')[0],request.json['end_date'].split('T')[0]]
        df = pd.DataFrame(value,columns=["dates"])
        df.to_csv('dates.csv', index=False)
        return "ok"


#download csv on download_csv.html
@app.route('/download_csv')
def download_file():
    p="corr_op.csv"
    return send_file(p,attachment_filename='result.csv')

@app.route('/download_inter')
def download_interm():
    p="final_save_dates.csv"
    return send_file(p,attachment_filename='values.csv')


@app.route('/corr_mthd',methods=["GET","POST"])
def corr_mthd():
    if request.method == 'POST':
        cmthd = request.form.get('mthd')
        with open("method.csv", 'w',newline='') as f:
            writer = csv.writer(f)
            writer.writerow(cmthd)
        return "ok"


if __name__ == "__main__":
    app.run(debug=True)
