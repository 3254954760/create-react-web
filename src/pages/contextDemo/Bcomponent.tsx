import React, {FC, useContext} from 'react';
import {ContextDemo} from './hooks/useContext';
const Bcomponent: FC = () => {
    const {state, setSku} = useContext(ContextDemo);

    return (
        <>
            <div onClick={() => setSku('B修改的sku')}>Bcomponent</div>
            <div>{state.sku}</div>
        </>
    );
};
export default Bcomponent;
