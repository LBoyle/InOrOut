from flask import Flask, render_template, url_for, send_file
import datetime, __passwd__, json
import mongoengine as db
from handleJSON import *

app = Flask(__name__)

dbname = "louisboyledb"
user = "ubuntu15.10"

c = db.connect(host=("mongodb://{user}:{passwd}@ds011412.mlab.com:11412/{dbname}".format(user=user, passwd=__passwd__.passwd, dbname=dbname)))

class Tweet(db.Document):
	content = db.StringField()
	location = db.StringField()
	timestamp = db.DateTimeField(default=datetime.datetime.now)
	vCompound = db.FloatField()

@app.route('/')
@app.route('/index')
def homepage():
	return render_template('leaflet.html')

@app.route('/deliver/UK')
def overlayUK():
	return send_file('static/data/geoJSON.json', mimetype="text/json")

@app.route('/deliver/NI')
def overlayNI():
	return send_file('static/data/geoNIJSON.json', mimetype="text/json")

@app.route('/deliver/data')
def overlayColours():
	handleJSON()
	return send_file('static/data/procDict.json', mimetype="text/json")

# testing
@app.route('/results')
def displayResults():
	return render_template('results.html', items=[(p.content, p.location, p.timestamp, p.vCompound) for p in Tweet.objects])

app.run(host='0.0.0.0', port=8080, debug=True)