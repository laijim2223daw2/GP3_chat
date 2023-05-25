import React, { useContext, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
  } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

import { ChatPage } from '../pages/ChatPage';
import { AuthRouter } from './AuthRouter';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

/**
 * Enrutador principal de la aplicación
 */
export const AppRouter = () => {

    const { auth, verificaToken } = useContext(AuthContext);

    useEffect(() => {
        /**
         * Verifica el token del usuario al cargar la aplicación
         */
        verificaToken();
    }, [verificaToken])


    if (auth.checking) {
        return (
            <div className="loading">
                <div className="spinner"></div>
                <h1>Espere por favor</h1>
            </div>
            );
    }

    return (
        <Router>
            <div>
                <Switch>
                    {/* Rutas de autenticación */}
                    <PublicRoute isAuthenticated={auth.logged} path="/auth" component={AuthRouter} />
                    
                    {/* Ruta privada */}
                    <PrivateRoute isAuthenticated={auth.logged} exact path="/" component={ChatPage} />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
