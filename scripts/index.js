var redirect = function () {
    const client_id = 'a306c77b15cc46b7a80ed913f4a4a206';
    const redirect_uri = encodeURIComponent('https://' + self.location.host + '/Diss-Playlist-is-Cool/callback');
    const scope = encodeURIComponent('playlist-modify-public playlist-modify-private');
    const response_type = 'token';
    const state = encodeURIComponent(document.getElementById('text-field').value);
    window.location.href = (
        'https://accounts.spotify.com/authorize?' +
        'client_id=' + client_id +
        '&redirect_uri=' + redirect_uri +
        '&scope=' + scope +
        '&response_type=' + response_type +
        '&state=' + state
    );
}
