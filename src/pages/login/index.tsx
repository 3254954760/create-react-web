import React, { useState } from 'react';
import { Carousel } from 'antd';
const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79'
};
const App = () => (
    <Carousel autoplay speed={1000}>
        <div>
            <h3 style={contentStyle}>1</h3>
        </div>
        <div
            style={{
                width: '100px',
                background: 'red'
            }}
        >
            <h3>2</h3>
        </div>
        <div>
            <h3 style={contentStyle}>3</h3>
        </div>
        <div>
            <h3 style={contentStyle}>4</h3>
        </div>
    </Carousel>
);
export default App;
// const Login = () => {
//     const [login, setLogin] = useState(0);
//     return <div>login</div>;
// };

// export default Login;
