import React, {useState} from 'react';

const Root = () => {
    const [data, setData] = useState(0);
    return <div>掘金${data}</div>;
};
export default Root;
