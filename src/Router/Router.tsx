import { HashRouter, Route, Routes } from 'react-router-dom';
import routes from './routes';

const Router = () => {
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
