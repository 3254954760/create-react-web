import React, { useState, Suspense } from 'react';
import { AppRoutes } from './router/routes';
import { BrowserRouter } from 'react-router-dom';

import RichRoute from '@router/rich-route';
const APP = () => {
    return (
        <BrowserRouter>
            <RichRoute route={AppRoutes}></RichRoute>
        </BrowserRouter>
    );
};
export default APP;
