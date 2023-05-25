import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';

import '../css/login-register.css';

/**
 * Enrutador de autenticación
 */
export const AuthRouter = () => {
    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100 p-t-50 p-b-90">

                    <Switch>
                        {/* Ruta de inicio de sesión */}
                        <Route exact path="/auth/login" component={LoginPage} />

                        {/* Ruta de registro */}
                        <Route exact path="/auth/register" component={RegisterPage} />

                        {/* Redireccionar a la ruta de inicio de sesión por defecto */}
                        <Redirect to="/auth/login" />
                    </Switch>

                </div>
            </div>
        </div>
    )
}
