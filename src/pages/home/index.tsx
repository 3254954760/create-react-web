import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
const Home = () => {
    const history = useHistory();
    const [state, setState] = useState(0);
    const goLogin = () => {
        history.push('/login');
    };
    useEffect(() => {
        console.log('创建', state);
        return () => {
            console.log('销毁', state);
        };
    }, [state]);
    return (
        <>
            <div>home</div>

            <div onClick={() => setState(state + 1)}>销毁重建</div>
            <button onClick={goLogin}>去登录</button>
        </>
    );
};

export default Home;
