import React, { Suspense } from 'react';
import * as Sentry from '@sentry/react';
import { RouteConfig } from 'react-router-config';

import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

const Login = React.lazy(() => import('@pages/login'));
const Home = React.lazy(() => import('@pages/home'));
const Layout = React.lazy(() => import('@layout/index'));
const App = React.lazy(() => import('@pages/app'));
const ContextDemo = React.lazy(() => import('@pages/contextDemo'));
const FileUpload = React.lazy(() => import('@pages/file-upload'));
const SSR = React.lazy(() => import('@pages/SSR'));
// todo / 和/home 应该是同一个，并且点击home 路由应该是/
export enum PATH {
    HOME = '/home',
    LOGIN = '/login',
    APP = '/app',
    CONTEXTDEMO = '/contextdemo',
    FILE_UPLOAD = '/file-upload',
    SSR = '/SSR'
}
const layoutRoutes = [
    {
        path: PATH.HOME,
        component: Home
    },
    {
        path: PATH.APP,
        component: App
    }
] as RouteConfig[];

export const AppRoutes = [
    {
        path: PATH.LOGIN,
        component: Login
    },
    {
        path: PATH.CONTEXTDEMO,
        component: ContextDemo
    },
    {
        path: PATH.FILE_UPLOAD,
        component: FileUpload
    },
    {
        path: PATH.SSR,
        component: SSR
    },
    {
        path: '/',
        name: 'home',
        component: Layout,
        routes: layoutRoutes
    }

    // {
    //     path: '/about',
    //     Component: About
    // }
] as RouteConfig[];
