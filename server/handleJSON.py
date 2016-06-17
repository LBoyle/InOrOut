import __passwd__, datetime, json
import mongoengine as db

dbname = "louisboyledb"
user = "ubuntu15.10"

c = db.connect(host=("mongodb://{user}:{passwd}@ds011412.mlab.com:11412/{dbname}".format(user=user, passwd=__passwd__.passwd, dbname=dbname)))

tempDex = open('static/data/locDict.csv').read().lower()
townDex = tempDex.split('\n')

class Tweet(db.Document):
	content = db.StringField()
	location = db.StringField()
	timestamp = db.DateTimeField(default=datetime.datetime.now)
	vCompound = db.FloatField()

# class LocData(db.Document):
# 	location = db.StringField()
# 	numPos = db.IntField()
# 	numNeg = db.IntField()

def logic():
	resDict = {}
	data = [(p.location, p.vCompound) for p in Tweet.objects]
	for i in townDex:
		countPos = 0
		countNeg = 0
		for p in data:
			if p[0].lower() == i:
				if p[1] > 0:
					countPos += 1
				elif p[1] < 0:
					countNeg +=1
		resDict[i] = {"numPos" : countPos, "numNeg" : countNeg}
	# print resDict
	newJSON = open('static/data/procDict.json','r+')
	newJSON.write(json.dumps(resDict))
	newJSON.close()
#		LocData(location=i, numPos=countPos, numNeg=countNeg).save()

logic()
# def handleJSON():
# 	jsonOBJ = open('static/data/geoJSON.json', 'r')
# 	Dict = json.loads(jsonOBJ.read())
# 	jsonOBJ.close()
# 	for i in Dict['features']:
# 		#here's where the magic happens
# 		i['properties']['colour'] = 'red'
# 	newJSON = open('static/data/geoFixed.json','r+')
# 	newJSON.write(json.dumps(Dict))
# 	Dict = newJSON.read()
# 	newJSON.close()

# 	jsonOBJ = open('static/data/geoNIJSON.json', 'r')
# 	Dict = json.loads(jsonOBJ.read())
# 	jsonOBJ.close()
# 	for i in Dict['features']:
# 		#here's where the magic happens
# 		i['properties']['colour'] = 'red'
# 	newJSON = open('static/data/geoNIFixed.json','r+')
# 	newJSON.write(json.dumps(Dict))
# 	Dict = newJSON.read()
# 	newJSON.close()