import React, { Suspense } from 'react';
import * as Sentry from '@sentry/react';
import { RouteConfig } from 'react-router-config';

import { Route, Switch, BrowserRouter } from 'react-router-dom';

const SentryRoute = Sentry.withSentryRouting(Route);

const RichRoute = React.memo<{ route: RouteConfig[] }>(function RichRoutes({ route: routes }) {
    return (
        <Switch>
            {routes.map(route => (
                <SentryRoute
                    key={route.path as React.Key}
                    path={route.path}
                    render={props => {
                        if (!route.component) {
                            return null;
                        }
                        console.log('routes', routes);
                        return (
                            <Suspense
                                fallback={
                                    route.suspenseCompoent ?? (
                                        <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
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
    );
});
export default RichRoute;
