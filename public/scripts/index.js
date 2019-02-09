var redirect = function () {
    console.log('https://accounts.spotify.com/authorize?client_id=a306c77b15cc46b7a80ed913f4a4a206&redirect_uri=http:%2F%2Flocalhost%2Fcallback&scope=playlist-modify-public%20playlist-modify-private&response_type=token');
    window.location.href = 'https://accounts.spotify.com/authorize?client_id=a306c77b15cc46b7a80ed913f4a4a206&redirect_uri=http:%2F%2Flocalhost%2Fcallback&scope=playlist-modify-public%20playlist-modify-private&response_type=token&state=faded';
}
