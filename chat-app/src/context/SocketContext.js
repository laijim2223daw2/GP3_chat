import React, { useContext, useEffect } from 'react';
import { createContext } from 'react';

import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from './chat/ChatContext';
import { useSocket } from '../hooks/useSocket'

import { types } from '../types/types';
import { scrollToBottomAnimated } from '../helpers/scrollToBottom';

/**
 * Contexto del socket
 */
export const SocketContext = createContext();

/**
 * Proveedor del socket
 * @param {object} children - Componentes hijos
 */
export const SocketProvider = ({ children }) => {

    const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://192.168.0.11:8080');
    const { auth } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        if (auth.logged) {
            conectarSocket();
        }
    }, [auth, conectarSocket]);

    useEffect(() => {
        if (!auth.logged) {
            desconectarSocket();
        }
    }, [auth, desconectarSocket]);

    /**
     * Escucha los cambios en los usuarios conectados
     */
    useEffect(() => {

        socket?.on('lista-usuarios', (usuarios) => {
            dispatch({
                type: types.usuariosCargados,
                payload: usuarios
            });
        })

    }, [socket, dispatch]);


    useEffect(() => {
        /**
         * Escucha los mensajes personales
         */
        socket?.on('mensaje-personal', (mensaje) => {
            dispatch({
                type: types.nuevoMensaje,
                payload: mensaje
            });

            scrollToBottomAnimated('mensajes');
        })

    }, [socket, dispatch]);


    return (
        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>
    )
}
