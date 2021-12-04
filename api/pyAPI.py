from flask import Flask
from flask_restful import Resource, Api, reqparse
import pandas as pd
import ast
import os
import sys
sys.path.append('../python_files')
import ocr
import json

app = Flask(__name__)
api = Api(app)

class Image(Resource):
    # methods go here
    def getData(self):
        # Opening JSON file
        f = open('../python_files/chemical_data.json')
        # returns JSON object as
        # a dictionary
        data = json.load(f)
        print(data['chemicals'][0])
        return data['chemicals'][0]
    
    def post(self):
        parser.add_argument('path', required=True)  # add userId arg
        ocr.ImageDataFinder(path,0)
        # Opening JSON file
        f = open('../python_files/chemical_data.json')
        # returns JSON object as
        # a dictionary
        data = json.load(f)
        print(data['chemicals'][0])
        return data['chemicals'][0]
    pass

api.add_resource(Image, '/image')  # '/users' is our entry point

if __name__ == '__main__':
    print('working')
    ocr.ImageDataFinder('../python_files/acetone.png',0)
