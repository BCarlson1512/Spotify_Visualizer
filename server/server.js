const path = require('path');
require("dotenv").config({path: path.resolve(__dirname, './.env')});
const express = require("express");
const SpotifyWebAPI = require("spotify-web-api-node");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const code = req.body.code;
    const spotifyWebAPI = new SpotifyWebAPI({
        redirectUri: "http://localhost:3000/",
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    });
    spotifyWebAPI.authorizationCodeGrant(code)
    .then(data => { // Spotify auth works...
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    })
    .catch((err) => { // Spotify authentication error
        console.log(err)
        res.sendStatus(400);
    })
});

app.post("/refresh", (req,res) => {
    const refreshToken = req.body.refresh_token;
    // Get the refresh tokenconsole.log(req.body)
    //console.log(refreshToken);
    const spotifyWebAPI = new SpotifyWebAPI({
        redirectUri: "http://localhost:3000/",
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        refreshToken,
    });
    spotifyWebAPI.refreshAccessToken().then(
        (data) => {
            //console.log(data.body)
            res.json({
                accessToken: data.body.access_token,
                expiresIn: data.body.expires_in
            })
            //spotifyWebAPI.setAccessToken(data.body['access_token']);
        }).catch((err) => {
            console.log(err)
            res.sendStatus(400);
        }
    );
});

app.listen(process.env.PORT);
console.log(`Listening on Port: ` + process.env.PORT);