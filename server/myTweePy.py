import tweepy
import vaderSentiment
import json
from tweePyCreds import *
from geopy.geocoders import Nominatim
#override tweepy.StreamListener to add logic to on_status

def handleJSON():
	jsonOBJ = open('static/data/geoJSON.json')
	Dict = json.loads(jsonOBJ.read())
	jsonOBJ.close()
	for i in Dict['features']:
		i['properties']['colour'] = 'red'
	newJSON = open('static/data/geoFixed.json','r+')
	newJSON.write(json.dumps(Dict))
	return newJSON.read()[:200]
#	return json.dumps(Dict)

tempDex = open('Towns_List.csv').read().lower()
townDex = tempDex.split('\r\n')
def main():	
	geolocator = Nominatim()
	class MyStreamListener(tweepy.StreamListener):
		def on_status(self, status):
			if status.user.location != None:
				for town in townDex:
					if status.user.location.lower() == town:
						location = geolocator.geocode(status.user.location)
						if location.latitude > 49.6 and location.latitude < 60.9 and location.longitude > -8.2 and location.longitude < 1.8:
							print(status.text.encode('utf8'), status.user.location, location.latitude, location.longitude, vaderSentiment.sentiment(status.text))

	auth = tweepy.OAuthHandler(auth1, auth2)
	auth.set_access_token(access1, access2)

	api = tweepy.API(auth)

	listener = MyStreamListener()
	myStream = tweepy.Stream(auth, listener)
	myStream.filter(track=['brexit'])

main()
#handleJSON()