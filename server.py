from flask import Flask
app = Flask(__name__)

@app.route('/')
def search():
    import spotipy
    spotify = spotipy.Spotify()
    name = "chance"
    results = spotify.search(q='artist:' + name, type='artist')
    return results
