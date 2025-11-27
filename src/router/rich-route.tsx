import React, { Suspense } from 'react';
import * as Sentry from '@sentry/react';
import { RouteConfig } from 'react-router-config';

import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

const SentryRoute = Sentry.withSentryRouting(Route);

const RichRoute = React.memo<{ route: RouteConfig[] }>(function RichRoutes({ route: routes }) {
    return (
        <Switch>
            {routes.map(route => {
                // 如果路由有 render 属性，直接使用（用于 Redirect 等特殊情况）
                if ((route as any).render) {
                    return (
                        <SentryRoute key={route.path as React.Key} path={route.path} render={(route as any).render} />
                    );
                }

                return (
                    <SentryRoute
                        key={route.path as React.Key}
                        path={route.path}
                        render={props => {
                            if (!route.component) {
                                return null;
                            }
                            // 检查组件渲染结果是否是 Redirect
                            const Component = route.component;
                            const rendered = <Component route={route.routes || []} {...props} />;

                            // 如果渲染的是 Redirect，直接返回，不包裹 Suspense
                            if (rendered && rendered.type === Redirect) {
                                return rendered;
                            }

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
                                    {rendered}
                                </Suspense>
                            );
                        }}
                    />
                );
            })}
        </Switch>
    );
});
export default RichRoute;
