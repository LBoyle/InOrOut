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

	def logic():
		myList = []
		data = [(p.location, p.vCompound) for p in Tweet.objects]
		for i in townDex:
			resDict = {}
			countPos = 1
			countNeg = 1
			for p in data:
				if p[0].lower() == i:
					if p[1] > 0.2:
						countPos += 1
					elif p[1] < -0.2:
						countNeg +=1
			green= 255
			blue = 255
			red = 255
			if countPos > 1 or countNeg > 1:
				blue = ((float(countPos)/float(countPos+countNeg))*255)
				red = ((float(countNeg)/float(countPos+countNeg))*255)
				green = 0

			resDict['loc'] = i
			resDict['col'] = "rgb("+str(int(red))+","+str(int(green))+","+str(int(blue))+")"
			resDict['nums'] = (countPos-1, countNeg-1)
			myList.append(resDict)
		newDict = {"features" : myList}
		newJSON = open('static/data/procDict.json','r+')
		newJSON.write(json.dumps(newDict))
		newJSON.close()
		return newDict
		
#	logic()
# "rgb("+str(int(red))+",0,"+str(int(blue))+")"


	# def addColour(linkName, newName, locKey):
	# 	colourDict = logic()	 		
	# 	jsonOBJ = open(linkName, 'r')
	#  	Dict = json.loads(jsonOBJ.read())
	#  	jsonOBJ.close()
	# 	for i in Dict['features']:
	# 		i['properties']['colour'] = colourDict[i['properties'][locKey].lower()]
	#  	newJSON = open(newName,'r+')
	#  	newJSON.write(json.dumps(Dict))
	# 	Dict = newJSON.read()
	# 	newJSON.close()

	# def jsonMeshing():
	# 	addColour('static/data/geoJSON.json','static/data/geoFixed.json','LAD13NM')
	# 	addColour('static/data/geoNIJSON.json','static/data/geoNIFixed.json','LGDNAME')
		
	logic()
	#jsonMeshing()
if __name__ == "__main__":
	handleJSON()