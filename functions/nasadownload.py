#import nasa info
import pandas as pd
import numpy as np
import sys,os
import requests
import csv
import json
from pandas import *

value=[]
value_int_a=[]
value_int_b=[]
j=0
def getvals():
    i=0
    j=0
    
    def rcssv():
        for x in range(0,19):
            file_name="data1_{x}.csv".format(x=x)
            with open(file_name, newline='') as f:
                reader = csv.reader(f)
                data = list(reader)
                for a in range(14,7319):
                    s = str(data[a])
                    s=s.translate({ord(' '): None,ord('['): None,ord(']'): None,ord('"'): None,ord(','): None,ord("'"): None})
                    s=s.split(':')
                    value.append(s)
            for b in range(0,7304):
                dte = value[b][0]
                dte=int(dte)
                value_int_a.append(dte)
                val = value[b][1]
                val=float(val)
                value_int_b.append(val)
            csssv()
            f.close()
    def req_data():
        i=0
        data = read_csv('latitude.csv')
        lt = data['Latitudes'].tolist()
        data = read_csv("longitude.csv")
        lng = data['Longitudes'].tolist()
        for x in range(0,12):
            lat = lt[x]
            long = lng[x]
            s_d='20000101'
            e_d='20200101'
            url = 'https://power.larc.nasa.gov/cgi-bin/v1/DataAccess.py?&request=execute&identifier=SinglePoint&parameters=ALLSKY_SFC_SW_DWN&startDate={s_d}&endDate={e_d}&userCommunity=SSE&tempAverage=DAILY&outputList=CSV&lat={lat}&lon={long}'.format(s_d=s_d,e_d=e_d,lat=lat,long=long)
            r = requests.get(url = url)
            kf="data1_{i}.csv".format(i=i)
            i=i+1
            a = r.content
            cf_f = open(kf, 'wb')
            cf_f.write(a)
    def csssv():
        header = ['date','value']
        global j
        if j>18:
            j=0
        file_name="data2_{j}.csv".format(j=j)
        with open(file_name, 'w') as f:
            writer = csv.writer(f)
            writer.writerow(header)
            writer.writerows(zip(value_int_a, value_int_b))
        j=j+1
        value.clear()
        value_int_a.clear()
        value_int_b.clear()
    
    req_data()          