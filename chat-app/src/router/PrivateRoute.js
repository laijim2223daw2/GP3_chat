import React from 'react'
import { Redirect, Route } from 'react-router-dom'

/**
 * Ruta privada
 * @param {boolean} isAuthenticated - Indicador de autenticación del usuario
 * @param {object} component - Componente a renderizar si el usuario está autenticado
 * @param {object} rest - Resto de propiedades
 */
export const PrivateRoute = ({
   isAuthenticated,
   component: Component,
   ...rest
}) => {
    return (
        <Route { ...rest }
            component={ (props) => (
                /**
                 * Renderiza el componente si el usuario está autenticado,
                 * de lo contrario, redirige a la página de autenticación
                 */
                (isAuthenticated)
                    ? <Component { ...props } />
                    : <Redirect to="/auth" />
            )} 
        />
    )
}
