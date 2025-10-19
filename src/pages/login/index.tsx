import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import styles from './index.module.less';
const status = {
    0: '未授权',
    1: '已授权',
    2: '超时'
};
const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79'
};
const Login = () => {
    const [login, setLogin] = useState(0);
    const [qrcode, setQrcode] = useState('');
    const [userId, setUserId] = useState('');
    useEffect(() => {
        const getQrcode = async () => {
            const { code, userId } = (await (await fetch('/api/get-qrcode')).json()) as {
                code: string;
                userId: string;
            };
            setQrcode(code);
            setUserId(userId);
        };
        getQrcode();
    }, []);

    useEffect(() => {
        if (!userId) return;
        const checkLogin = async () => {
            const res = await fetch(`/api/check-auth`).then(res => res.json());
            const { status } = res;
            setLogin(status);
        };
        let timer = setInterval(() => {
            checkLogin();
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, [userId]);

    return (
        <div>
            <img className={styles.qrcode} src={qrcode} alt="qrcode" />
            <div className={styles.status}>{status[login]}</div>
        </div>
    );
};

export default Login;
