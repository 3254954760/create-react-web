import React, {useState, Suspense} from 'react';
import {Route, RouteProps, Switch, BrowserRouter} from 'react-router-dom';

const Login = React.lazy(() => import('@pages/login'));
const Home = React.lazy(() => import('@pages/home'));
export enum PATH {
    HOME = '/',
    LOGIN = '/login'
}
export const RichRoute = React.memo<{routes: RouteProps[]}>(function RichRoutes({routes}) {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>loading</div>}>
                <Switch>
                    {routes.map(props => (
                        <Route key={props.path as React.Key} path={props.path} {...props} />
                    ))}
                </Switch>
            </Suspense>
        </BrowserRouter>
    );
});
export const AppRoutes: RouteProps[] = [
    {
        path: PATH.LOGIN,
        component: Login
    },
    {
        path: PATH.HOME,
        component: Home
    }
    // {
    //     path: '/about',
    //     Component: About
    // }
];
