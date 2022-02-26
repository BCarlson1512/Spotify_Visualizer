import { useEffect, useState } from 'react'
import Axios from 'axios';

/**
 * Webhook that takes a spotify auth code and generates the access token
 * @param code -> Access code 
 * @returns authentication token
 */
export default function useAuth(code) {
    const [accessToken,setAccessToken] = useState();
    const [refreshToken,setRefreshToken] = useState();
    const [expiresIn,setExpiresIn] = useState();

    useEffect(()=> {
        Axios.post("http://localhost:3001/login",{
            code,
        }).then( res =>{
            //console.log(res.data);
            setAccessToken(res.data.accessToken);
            setRefreshToken(res.data.refreshToken);
            setExpiresIn(res.data.expiresIn);
            window.history.pushState({}, "", "/");
        }).catch(() => {
            window.location.href = '/';
        })
    }, [code]);

    useEffect(()=> {
        if (!refreshToken || !expiresIn) return;
        const interval = setInterval(() => { 
            Axios.post("http://localhost:3001/refresh",{
                refresh_token: refreshToken,
            }).then( res =>{
                //console.log(res.data);
                setRefreshToken(res.data.refreshToken);
                setExpiresIn(res.data.expiresIn);
                //window.history.pushState({}, "", "/");
            }).catch(() => {
                window.location.href = '/';
            })
        }, (expiresIn - 60) * 1000)
        return () => clearInterval(interval);
    },[refreshToken, expiresIn]);

    return accessToken;
}
