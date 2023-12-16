import Grammer from "../Pages/Grammer/Grammer";
import Home from "../Pages/Home/Home";
import ResultPage from "../Pages/ResultPage/ResultPage";
import Summary from "../Pages/Summary/Summary";



interface RouteType {
    path: `/${string}`;
    element: JSX.Element;
}
const routes: RouteType[] = [
    {
        path: '/',
        element: <Home />
    },
    {
        path:'/result',
        element: <ResultPage />
    },
    {
        path:'/summary',
        element: <Summary/>
    },
    {
        path: '/grammar',
        element: <Grammer />
    }

];
  
export default routes;