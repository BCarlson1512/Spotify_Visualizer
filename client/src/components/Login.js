import React from 'react'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

export default function Login() {
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize?client_id=a4a973fdd7b04086abbccb93d5fd8360&response_type=code&redirect_uri=http://localhost:3000/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";
    return (
        <Container sx={{display: 'flex', align: 'center', justifyContent: 'center', minWidth: '100vh'}}>
            <Button variant="contained" href={AUTH_ENDPOINT} color="success" sx={{justifyContent: "center"}}> Login With Spotify </Button>
        </Container>
    )
};