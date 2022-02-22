import React, { useEffect, useState } from 'react'

export default function useAuth() {

    const [authToken, setauthToken] = useState();
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()
    
    useEffect(() => {

    })
    return (
    <div>useAuth</div>
    )
}
