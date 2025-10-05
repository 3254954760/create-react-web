// App.tsx
import React from 'react';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import RichRoute from '@router/rich-route';
import { AppRoutes } from './router/routes';

interface AppProps {
    location?: string; // SSR 时由服务器传入
    context?: any; // SSR 时 StaticRouter 需要
}

const App: React.FC<AppProps> = ({ location, context }) => {
    if (typeof window === 'undefined') {
        // SSR 环境：使用 StaticRouter
        return (
            <StaticRouter location={location} context={context}>
                <RichRoute route={AppRoutes} />
            </StaticRouter>
        );
    }

    // CSR 环境：使用 BrowserRouter
    return (
        <BrowserRouter>
            <RichRoute route={AppRoutes} />
        </BrowserRouter>
    );
};

export default App;
