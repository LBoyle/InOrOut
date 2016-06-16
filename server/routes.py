from flask import Flask, render_template, url_for, jsonify, send_file
import datetime
#import myTweePy as twp

app = Flask(__name__)
#print twp.handleJSON()

@app.route('/', methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
def homepage():
	return render_template('leaflet.html', )

@app.route('/deliver/UK', methods=['GET', 'POST'])
def overlayUK():
	return send_file('static/data/geoFixed.json', mimetype="text/json")

@app.route('/deliver/NI', methods=['GET', 'POST'])
def overlayNI():
	return send_file('static/data/geoNIFixed.json', mimetype="text/json")


app.run(host='0.0.0.0', port=8080, debug=True)