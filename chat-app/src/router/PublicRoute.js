import React from 'react'
import { Redirect, Route } from 'react-router-dom'

/**
 * Ruta pública
 * @param {boolean} isAuthenticated - Indicador de autenticación del usuario
 * @param {object} component - Componente a renderizar si el usuario no está autenticado
 * @param {object} rest - Resto de propiedades
 */
export const PublicRoute = ({
   isAuthenticated,
   component: Component,
   ...rest
}) => {
    return (
        <Route { ...rest }
            component={ (props) => (
                /**
                 * Renderiza el componente si el usuario no está autenticado,
                 * de lo contrario, redirige a la página principal
                 */
                ( !isAuthenticated )
                    ? <Component { ...props } />
                    : <Redirect to="/" />
            )} 
        />
    )
}
