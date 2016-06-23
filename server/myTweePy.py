import tweepy, vaderSentiment, datetime, __passwd__
import mongoengine as db
from tweePyCreds import *
from geopy.geocoders import Nominatim
#override tweepy.StreamListener to add logic to on_status

#locDict.csv is the names of each area in the map overlay, rather than that list i worked on lol
tempDex = open('static/data/locDict.csv').read().lower()
townDex = tempDex.split('\n')

dbname = "louisboyledb"
user = "ubuntu15.10"

c = db.connect(host=("mongodb://{user}:{passwd}@ds011412.mlab.com:11412/{dbname}".format(user=user, passwd=__passwd__.passwd, dbname=dbname)))

class Tweet(db.Document):
	content = db.StringField()
	location = db.StringField()
	timestamp = db.DateTimeField(default=datetime.datetime.now)
	vCompound = db.FloatField()

def main():	
	geolocator = Nominatim()
	class MyStreamListener(tweepy.StreamListener):
		def on_status(self, status):
			if status.user.location != None:
				for town in townDex:
					if status.user.location.lower() == town:
						location = geolocator.geocode(status.user.location)
						if location.latitude > 49.6 and location.latitude < 60.9 and location.longitude > -8.2 and location.longitude < 1.8:
							vCompound = vaderSentiment.sentiment(status.text)['compound']
							print (status.text, status.user.location, vCompound)
							Tweet(content = status.text, location = status.user.location, vCompound = vCompound).save()

	auth = tweepy.OAuthHandler(auth1, auth2)
	auth.set_access_token(access1, access2)

	api = tweepy.API(auth)

	listener = MyStreamListener()
	myStream = tweepy.Stream(auth, listener)
	myStream.filter(track=['brexit'])

main()