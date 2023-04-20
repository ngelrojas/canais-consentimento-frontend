import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from '../pages/not-found/NotFound';
import PATHS from './paths';

const MainRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {
                    PATHS.map((path, index) => {
                        return (
                            <Route
                                key={index}
                                path={path.path}
                                element={<path.component />}
                            />
                        );
                    })
                }
                <Route path="*" element={<NotFound />} />
                
            </Routes>
        </BrowserRouter>
    );
};

export default MainRoutes;