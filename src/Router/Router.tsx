import { HashRouter, Route, Routes } from 'react-router-dom';
import routes from './routes';
import { useEffect } from 'react';

const Router = () => {

    useEffect(() => {
        if(localStorage.getItem('file_arrays') === undefined)
            localStorage.setItem('file_arrays', JSON.stringify([]));
    }, []);

    return (
        <HashRouter>
            <Routes>
                {routes.map(route => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))}
            </Routes>
        </HashRouter>
    );
};

export default Router;
