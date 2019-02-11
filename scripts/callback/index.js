if (window.location.hash) {
    console.log(window.location.hash);
    
    const hash = window.location.hash.substr(1);
    let result = {};
    hash.split("&").forEach(function(part) {
        var item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
    });
    console.log(result['state']);
    accessToken = window.location.href.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];

    let count = 0;
    let tracks = {};
    let words = result['state'].split(' ');
    let promise = new Promise(function(resolve, reject) {
        for (let i = 0; i < words.length; i++) {
            const request = new XMLHttpRequest();
            request.onload = function() {
                count++;
                console.log('Ready:', this.readyState, 'Status:', this.status);
                // Process the server response here.
                const resp = JSON.parse(request.responseText);
                for (let j = 0; j < resp['tracks']['items'].length; j++) {
                    if (resp['tracks']['items'][j]['name'].toLowerCase() === words[i].toLowerCase()) {
                        tracks[words[i]] = resp['tracks']['items'][j]['uri'];
                        break;
                    }
                }
                console.log(count, words.length);
                if (count === words.length) {
                    resolve();
                }
            };

            let txt = encodeURIComponent(words[i]);
            request.open('GET', 'https://api.spotify.com/v1/search?q=' + txt + '&type=track', true);
            request.setRequestHeader('Authorization', 'Bearer ' + accessToken);
            request.send()
        }
    })
    promise.then(function(){
        console.log(tracks);
        console.log(Object.keys(tracks).length);
        makePlaylist(accessToken, words, tracks);
    });
    // tracks is NOT ready
} else {
    console.log('no hash found');
}

var makePlaylist = function (accessToken, words, tracks) {
    let track_uris_encoded = []; // song URIs in order of words in text
    for (let i = 0; i < words.length; i++) {
        if (tracks[words[i]]) {
            track_uris_encoded.push(encodeURIComponent(tracks[words[i]]));
        }
    }
    const track_uris_str = track_uris_encoded.join(',');

    // Get user id
    let id;
    const requestGetId = new XMLHttpRequest();
    requestGetId.onload = function() {
        const resp = JSON.parse(requestGetId.responseText);
        id = resp['id'];
    }
    requestGetId.open('GET', 'https://api.spotify.com/v1/me', false);
    requestGetId.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    requestGetId.send();

    // Create playlist
    let tracksEndpoint;
    const requestMakePlaylist = new XMLHttpRequest();
    requestMakePlaylist.onload = function() {
        const resp = JSON.parse(requestMakePlaylist.responseText);
        tracksEndpoint = resp['tracks']['href'];
        console.log(tracksEndpoint);
    }
    requestMakePlaylist.open('POST', 'https://api.spotify.com/v1/users/' + id + '/playlists', false);
    requestMakePlaylist.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    requestMakePlaylist.setRequestHeader('Content-Type', 'application/json');
    requestMakePlaylist.send('{"name": "Diss Playlist"}');

    // Add tracks
    const requestAddTracks = new XMLHttpRequest();
    requestAddTracks.onload = function() {
        console.log(requestAddTracks.responseText);
    }
    requestAddTracks.open('POST', tracksEndpoint + '?uris=' + track_uris_str, false);
    requestAddTracks.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    requestAddTracks.send();
}
