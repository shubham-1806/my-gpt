import Grammer from '../Pages/Grammer/Grammer';
import Chat from '../Pages/Chat/Chat';
import Home from '../Pages/Home/Home';
import ResultPage from '../Pages/ResultPage/ResultPage';
import Saved from '../Pages/Saved/Saved';
import Summary from '../Pages/Summary/Summary';

interface RouteType {
    path: `/${string}`;
    element: JSX.Element;
}
const routes: RouteType[] = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/result',
        element: <ResultPage />,
    },
    {
        path: '/summary',
        element: <Summary />,
    },
    {
        path: '/grammar',
        element: <Grammer />,
    },
    {
        path: '/chat',
        element: <Chat />,
    },
    {
        path: '/saved',
        element: <Saved />,
    },
];

export default routes;
