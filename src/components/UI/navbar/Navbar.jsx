import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { AuthContext } from '../../../context'
import MyButton from '../button/MyButton'

const Navbar = () => {
    const { setIsAuth } = useContext(AuthContext)

    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem("auth")
    }

    return (
        <div className="navbar">
            <div>
                <MyButton onClick={logout}>
                    <Link to="/login">Выйти</Link>
                </MyButton>
            </div>
            <div className="navbar__links">
                <Link className="navbar__items" to="/about">О сайте</Link>
                <Link className="navbar__items" to="/login">Войти</Link>
                <Link className="navbar__items" to="/posts">Посты</Link>
            </div>
        </div>
    )
}

export default Navbar