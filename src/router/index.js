import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import PostIdPage from '../pages/PostIdPage';
import Login from "../pages/Login";
import Home from "../pages/Home";
import AuthAlready from "../pages/AuthAlready"


export const privateRoutes = [
    { path: "/about", element: <About/>},
    { path: "/posts", element: <Posts/> },
    { path: "/posts/:id", element: <PostIdPage/>},
    { path: "*", element: <Error/> },
    { path: "/login", element: <AuthAlready/>},
    { path: "/", element: <Home/>}
]

export const publicRoutes = [
    { path: "/login", element: <Login/> },
    { path: "*", element: <Error/> },
    { path: "/", element: <Home/>}
]