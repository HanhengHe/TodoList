import { useState, useCallback } from 'react';

export const useAuth = () => {

    const [token, setToken] = useState(null);

    const [tokenExpirationDate, setTokenExpirationDate] = useState();
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);

    const login = useCallback((uerName, uid, token, expirationDate) => {
        setToken(token);
        setUserId(uid);
        setUserName(uerName);
        const tokenExpirationDate =
          expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
        setTokenExpirationDate(tokenExpirationDate);
        localStorage.setItem(
            'userData',
            JSON.stringify({
                userId: uid,
                token: token,
                expiration: tokenExpirationDate.toISOString()
            })
        );
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setTokenExpirationDate(null);
        setUserId(null);
        setUserName(null);
        localStorage.removeItem('userData');
    }, []);

    return { token, login, logout, userName, userId };
};