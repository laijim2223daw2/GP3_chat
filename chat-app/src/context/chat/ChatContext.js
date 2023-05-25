import React, { createContext, useReducer } from 'react';
import { chatReducer } from './chatReducer';

/**
 * Contexto del chat
 */
export const ChatContext = createContext();

/**
 * Estado inicial del contexto del chat
 */
const initialState = {
    uid: '',
    chatActivo: null, // UID del usuario al que quiero enviar mensajes
    usuarios: [], // Todos los usuarios de la base de datos
    mensajes: [], // El chat seleccionado
}

/**
 * Proveedor del chat
 * @param {object} children - Componentes hijos
 */
export const ChatProvider = ({ children }) => {

    const [chatState, dispatch] = useReducer(chatReducer, initialState);

    return (
        <ChatContext.Provider value={{
            chatState,
            dispatch
        }}>
            {children}
        </ChatContext.Provider>
    )
}
