import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
const Home = () => {
    const history = useHistory();

    const goLogin = () => {
        history.push('/login');
    };
    return (
        <>
            <div>home</div>
            <button onClick={goLogin}>去登录</button>
        </>
    );
};

export default Home;
