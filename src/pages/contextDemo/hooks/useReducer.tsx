import {State, Action} from './interface';

export const initState: State = {
    sku: '',
    image: '',
    dockerUrl: ''
};

const setter = (s: any, props: string, value: any) => {
    return {
        ...s,
        [props]: value
    };
};
type action = 'setSku' | 'setImage' | 'setImageUrl';
type Reducer = (s: State, value?: any) => State;
export const reducer: {[key in action]: Reducer} = {
    setSku: (state: any, val: any) => setter(state, 'sku', val),
    setImage: (state: any, val: any) => setter(state, 'image', val),
    setImageUrl: (state: any, val: any) => setter(state, 'imageUrl', val)
};

// 外部传入 dispatch 和 state ，在这里二次封装以下
export const dispatcher = (state: State, dispatch: (val: {type: action; value?: string}) => void) => {
    return {
        setSku(value: string) {
            dispatch({
                type: 'setSku',
                value: value
            });
            // 这里可以return 做些其他逻辑
        },
        setImage(value: string) {
            dispatch({
                type: 'setImage',
                value: value
            });
        },
        setImageUrl(value: string) {
            dispatch({
                type: 'setImageUrl',
                value: value
            });
        }
    };
};
