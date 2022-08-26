import React from 'react';
import { useStore } from 'effector-react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';
import { Auth } from './components/Auth/AuthPage';
import { Header } from './components/Header/Header';
import { $auth } from './context/auth';

function App() {
    const isLogged = useStore($auth);

    return (
        <div className="App">
            <Header />
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            isLogged ? (
                                <Navigate to={'/accountings'} />
                            ) : (
                                <Navigate to={'/login'} />
                            )
                        }
                    />
                    <Route
                        path="/registration"
                        element={
                            isLogged ? (
                                <Navigate to={'/accountings'} />
                            ) : (
                                <Auth type="registration" />
                            )
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            isLogged ? (
                                <Navigate to={'/accountings'} />
                            ) : (
                                <Auth type="login" />
                            )
                        }
                    />
                    <Route
                        path="/accountings"
                        element={
                            isLogged ? (
                                <h1>Accountings</h1>
                            ) : (
                                <Navigate to={'/login'} />
                            )
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
