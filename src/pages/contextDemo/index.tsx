import React from 'react';
import {Provider} from './hooks/useContext';
// context + reducer demo
import Acomponent from './Acomponent';
import Bcomponent from './Bcomponent';
const ContextDemo = () => {
    return (
        <Provider>
            <Acomponent />
            <Bcomponent />
        </Provider>
    );
};
export default ContextDemo;
