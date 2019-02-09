import spotipy
import spotipy.util as util

from flask import Flask
app = Flask(__name__)
#scope = ['playlist-modify-private', 'playlist-modify-public']
scope = ''
token = None

@app.route('/')
def auth():
    print ("ok this is happening")
    token = util.prompt_for_user_token('', scope, ,redirect_uri='http://localhost:5000/cat/')
    print ("this is the token " + token + "/n/n/n/n")

@app.route('/cat/')
def search():
    if token:
        spotify = spotipy.Spotify(auth=token)
        name = "chance"
        results = spotify.search(q='artist:' + name, type='artist')
        return results
    else:
        print ("FAIL")
        return 'dumbass bitch'
