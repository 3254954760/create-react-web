import React, {Suspense} from 'react';
import * as Sentry from '@sentry/react';
import {RouteConfig} from 'react-router-config';

import {Route, RouteProps, Switch, BrowserRouter} from 'react-router-dom';

const Login = React.lazy(() => import('@pages/login'));
const Home = React.lazy(() => import('@pages/home'));
export enum PATH {
    HOME = '/',
    LOGIN = '/login'
}
const SentryRoute = Sentry.withSentryRouting(Route);

export const RichRoute = React.memo<{route: RouteConfig[]}>(function RichRoutes({route: routes}) {
    return (
        <BrowserRouter>
            <Switch>
                {routes.map(route => (
                    <SentryRoute
                        key={route.path as React.Key}
                        path={route.path}
                        render={props => {
                            if (!route.component) {
                                return null;
                            }
                            return (
                                <Suspense
                                    fallback={
                                        route.suspenseCompoent ?? (
                                            <div style={{position: 'absolute', top: '50%', left: '50%'}}>
                                                loading.........
                                            </div>
                                        )
                                    }
                                >
                                    {
                                        // route.component 其实是做了控制权限下发，做的子路由
                                    }
                                    <route.component route={route.routes} {...props} />
                                </Suspense>
                            );
                        }}
                    />
                ))}
            </Switch>
        </BrowserRouter>
    );
});
export const AppRoutes: RouteConfig[] = [
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
