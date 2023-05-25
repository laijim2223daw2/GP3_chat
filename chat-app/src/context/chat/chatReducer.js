import { types } from '../../types/types';

/**
 * Reductor del chat
 * @param {object} state - Estado actual del chat
 * @param {object} action - Acción a realizar en el chat
 * @returns {object} - Nuevo estado del chat después de aplicar la acción
 */
export const chatReducer = (state, action) => {

    switch (action.type) {

        /**
         * Cargar usuarios en el chat
         */
        case types.usuariosCargados:
            return {
                ...state,
                usuarios: [...action.payload]
            }

        /**
         * Activar un chat específico
         */
        case types.activarChat:
            if (state.chatActivo === action.payload) return state;

            return {
                ...state,
                chatActivo: action.payload,
                mensajes: []
            }

        /**
         * Agregar un nuevo mensaje al chat activo
         */
        case types.nuevoMensaje:
            if (
                state.chatActivo === action.payload.de ||
                state.chatActivo === action.payload.para
            ) {
                return {
                    ...state,
                    mensajes: [...state.mensajes, action.payload]
                }
            } else {
                return state;
            }

        /**
         * Cargar mensajes en el chat activo
         */
        case types.cargarMensajes:
            return {
                ...state,
                mensajes: [...action.payload]
            }

        /**
         * Caso por defecto: retornar el estado actual sin cambios
         */
        default:
            return state;
    }
}
