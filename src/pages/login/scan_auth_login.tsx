import { Button } from 'antd';
import { useCallback, useEffect, useState } from 'react';

const ScanAuthLogin = () => {
    const [userId, setUserId] = useState('');
    useEffect(() => {
        const id = new URLSearchParams(window.location.search).get('userId');
        setUserId(id);
    }, []);

    const AuthLogin = useCallback(() => {
        fetch(`/api/scan-auth-login/${userId}`, {
            method: 'POST'
        });
    }, [userId]);
    return <Button onClick={AuthLogin}>授权登陆</Button>;
};

export default ScanAuthLogin;
