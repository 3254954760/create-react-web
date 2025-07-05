import React, {FC, useContext} from 'react';
import {ContextDemo} from './hooks/useContext';
const Acomponent: FC = () => {
    const {state, setSku} = useContext(ContextDemo);

    return (
        <>
            <div onClick={() => setSku('a修改的sku')}>Acomponent</div>
            <div>{state.sku}</div>
        </>
    );
};
export default Acomponent;
