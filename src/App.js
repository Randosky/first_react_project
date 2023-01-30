import React, { useEffect, useState } from "react";
import AppRouter from "./components/AppRouter";
import "./styles/App.css";
import Navbar from "./components/UI/navbar/Navbar";
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from "./context"


function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setIsAuth(true)
    }
    setLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      setLoading,
    }}>
      <Router>
        <Navbar />
        <AppRouter />
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
