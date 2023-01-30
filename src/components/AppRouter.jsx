import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom';
import { AuthContext } from '../context';
import { privateRoutes, publicRoutes } from "../router"
import Loader from './UI/loader/Loader';


const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)

    if (isLoading) {
        return <Loader/>
    }
    

    return (
        isAuth
            ?
            <Routes>
                {privateRoutes.map((route) => {
                    return <Route key={route.path} element={route.element} path={route.path} />
                })}
            </Routes>
            :
            <Routes>
                {publicRoutes.map((route) => {
                    return <Route key={route.path} element={route.element} path={route.path} />
                })}
            </Routes>
    )
}

export default AppRouter