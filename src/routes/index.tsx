import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from '../pages/not-found';
import PATHS from './paths';
import SignIn from '../components/sign-in';

const MainRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn />} />
                {
                    PATHS.map((path, index) => {
                        return (
                            <Route
                                key={index}
                                path={path.url}
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