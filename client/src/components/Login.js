import React from 'react'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

export default function Login() {
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize?client_id=a4a973fdd7b04086abbccb93d5fd8360&response_type=code&redirect_uri=http://localhost:3000/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";
    return (
        <>
            <div style={{position: "relative", display:"flex", justifyContent:"center", alignItems: "center", flexDirection: "column", paddingBottom:"2vh", zIndex:"100", color: "white"}}>
                <h1>Welcome to Spoti-Viz</h1>
                <h3>An audio visualizer powered by Spotify API</h3>
                <p>Created By Ben Carlson</p>
                <p>To get started, log in with Spotify below</p>
            </div>
            <Container sx={{position: "relative", display: 'flex', align: 'center', justifyContent: 'center', minWidth: '100vh', zIndex:"100"}}>
                <Button variant="contained" href={AUTH_ENDPOINT} color="success" sx={{justifyContent: "center"}}>
                <div style={{paddingRight:"0.5vw"}}>
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" fill="#ffffff">
                    <path d="M19.098 10.638c-3.868-2.297-10.248-2.508-13.941-1.387-.593.18-1.22-.155-1.399-.748-.18-.593.154-1.22.748-1.4 4.239-1.287 11.285-1.038 15.738 1.605.533.317.708 1.005.392 1.538-.316.533-1.005.709-1.538.392zm-.126 3.403c-.272.44-.847.578-1.287.308-3.225-1.982-8.142-2.557-11.958-1.399-.494.15-1.017-.129-1.167-.623-.149-.495.13-1.016.624-1.167 4.358-1.322 9.776-.682 13.48 1.595.44.27.578.847.308 1.286zm-1.469 3.267c-.215.354-.676.465-1.028.249-2.818-1.722-6.365-2.111-10.542-1.157-.402.092-.803-.16-.895-.562-.092-.403.159-.804.562-.896 4.571-1.045 8.492-.595 11.655 1.338.353.215.464.676.248 1.028zm-5.503-17.308c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12z"/>
                    </svg>
                </div> Login With Spotify </Button>
            </Container>
            <img style={{position: 'absolute', top: '0', left: '0', zIndex:"1", filter: "blur(7px)", height: '100%', width: '100%'}}src="RaveBGND.jpg" alt="backgroundprop"/>
        </>
    )
};