import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
    redirectUri: '${process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI}/api/callback',
});

export default spotifyApi;