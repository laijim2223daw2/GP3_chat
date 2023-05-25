import { useCallback, useEffect, useState } from 'react';
import io from 'socket.io-client';

/**
 * Hook personalizado para utilizar un socket.io-client en React.
 * @param {string} serverPath - Ruta del servidor socket.io
 * @returns {object} - Objeto con el socket, estado de conexión y funciones para conectar y desconectar el socket
 */
export const useSocket = (serverPath) => {

    const [socket, setSocket] = useState(null);
    const [online, setOnline] = useState(false);

    /**
     * Conecta el socket al servidor.
     */
    const conectarSocket = useCallback(() => {

        const token = localStorage.getItem('token');

        const socketTemp = io.connect(serverPath, {
            transports: ['websocket'],
            autoConnect: true,
            forceNew: true,
            query: {
                'x-token': token
            }
        });
        setSocket(socketTemp);
    }, [serverPath]);

    /**
     * Desconecta el socket.
     */
    const desconectarSocket = useCallback(() => {
        socket?.disconnect();
    }, [socket]);

    useEffect(() => {
        /**
         * Actualiza el estado de conexión en base al estado del socket.
         */
        setOnline(socket?.connected);
    }, [socket])

    useEffect(() => {
        /**
         * Establece el estado de conexión como "online" cuando se conecta al servidor.
         */
        socket?.on('connect', () => setOnline(true));
    }, [socket])

    useEffect(() => {
        /**
         * Establece el estado de conexión como "offline" cuando se desconecta del servidor.
         */
        socket?.on('disconnect', () => setOnline(false));
    }, [socket])

    return {
        socket,
        online,
        conectarSocket,
        desconectarSocket
    }
}
