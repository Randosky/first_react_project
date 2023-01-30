import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import MyButton from '../components/UI/button/MyButton'
import MyInput from '../components/UI/input/MyInput'
import { AuthContext } from '../context';

const Login = () => {
    const { setIsAuth } = useContext(AuthContext)
    const submit = event => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true')
    }

    return (
        <div>
            <h1>Страница для авторизации</h1>
            <form>
                <MyInput type="text" placeholder="Введите логин"></MyInput>
                <MyInput type="password" placeholder="Введите пароль"></MyInput>
                <MyButton onClick={submit}><Link to="/posts">Войти</Link></MyButton>
            </form>
        </div>
    )
}

export default Login