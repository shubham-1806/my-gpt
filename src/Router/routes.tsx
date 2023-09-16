import Home from "../Pages/Home/Home";
import ResultPage from "../Pages/ResultPage/ResultPage";


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
    }
];
  
export default routes;