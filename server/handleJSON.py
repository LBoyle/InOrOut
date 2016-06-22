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
			blue = 0
			red = 0
			if countPos > 1 or countNeg > 1:
				blue = ((float(countPos)/float(countPos+countNeg))*255)
				red = ((float(countNeg)/float(countPos+countNeg))*255)

			resDict[i] = "rgb("+str(int(red))+",0,"+str(int(blue))+")"
		
		newJSON = open('static/data/procDict.json','r+')
		newJSON.write(json.dumps(resDict))
		newJSON.close()
		
	logic()
# "rgb("+str(int(red))+",0,"+str(int(blue))+")"