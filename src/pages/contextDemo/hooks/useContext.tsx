import React, {createContext, FC, ReactNode, useReducer} from 'react';
import {dispatcher, initState, reducer as useReducers} from './useReducer';
import {Action} from './interface';
const reducer = (State, action: Action) => {
    // 这里更改数据
    const fn = useReducers[action.type];
    return fn(State, action.value);
};
// type DispatcherType = {
//     [key in action]: (value: string) => void;
// };
// type Ctx = {
//     state: State;
// } & DispatcherType;

// export const ContextDemo = createContext<Ctx>({} as Ctx);
export const ContextDemo = createContext({});

export const Provider: FC<{children: ReactNode}> = ({children}) => {
    const [contextValue, dispatch] = useReducer(reducer, initState);
    // 这里传入dispatch
    const setter = dispatcher(contextValue, dispatch);

    return (
        <ContextDemo.Provider
            value={{
                state: contextValue,
                ...setter
            }}
        >
            {children}
        </ContextDemo.Provider>
    );
};
