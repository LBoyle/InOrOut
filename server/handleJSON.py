def handleJSON():
	import __passwd__, datetime, json, math
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
	#  	location = db.StringField()
	#  	numPos = db.IntField()
	#  	numNeg = db.IntField()

	def logic():
		resDict = {}
		data = [(p.location, p.vCompound) for p in Tweet.objects]
		for i in townDex:
			countPos = 1
			countNeg = 1
			for p in data:
				if p[0].lower() == i:
					if p[1] > 0.2:
						countPos += 1
					elif p[1] < -0.2:
						countNeg +=1
			
			blue = (float(countPos)/float(countPos+countNeg))*255
			red = (float(countNeg)/float(countPos+countNeg))*255

			resDict[i] = {"numPos" : countPos, "numNeg" : countNeg, "red":int(math.floor(red)), "blue":int(math.floor(blue))}
		#	LocData(location=i, numPos=countPos, numNeg=countNeg).save()
		# print resDict
		newJSON = open('static/data/procDict.json','r+')
		newJSON.write(json.dumps(resDict))
		newJSON.close()
		
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