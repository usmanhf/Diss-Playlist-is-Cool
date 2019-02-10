var redirect = function () {
    const client_id = 'a306c77b15cc46b7a80ed913f4a4a206';
    const base_uri = (
        window.location.protocol + '//' + window.location.hostname + window.location.pathname
    ); // needs testing with browsers other than Chrome
    // window.location.pathname includes leading slash?
    // window.location.hostname trailing slash?
    const redirect_uri = encodeURIComponent(base_uri + 'callback');
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
