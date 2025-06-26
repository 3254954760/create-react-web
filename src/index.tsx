import React, {useState, Suspense} from 'react';
import {RichRoute, AppRoutes} from './router/routes';
const APP = () => {
    return (
        // <Suspense fallback={<div>loading</div>}>
            <RichRoute routes={AppRoutes}></RichRoute>
        // {/* </Suspense> */}
    );
};
export default APP;
