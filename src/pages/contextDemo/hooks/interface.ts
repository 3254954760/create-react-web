export interface State {
    sku: string;
    image: string;
    dockerUrl: string;
}
export interface Action {
    type: string;
    value?: any;
}
export interface ReducerProps {
    state: State;
    action: Action;
}
