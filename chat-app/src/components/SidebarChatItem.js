import React, { useContext } from 'react';

import { ChatContext } from '../context/chat/ChatContext';
import { fetchConToken } from '../helpers/fetch';
import { scrollToBottom } from '../helpers/scrollToBottom';

import { types } from '../types/types';

export const SidebarChatItem = ({ usuario }) => {

    const { chatState, dispatch } = useContext( ChatContext );
    const { chatActivo } = chatState;

    const onClick = async() => {

        dispatch({
            type: types.activarChat,
            payload: usuario.uid
        });

        // Cargar los mensajes del chat
        const resp = await fetchConToken(`mensajes/${ usuario.uid }`);
        dispatch({
            type: types.cargarMensajes,
            payload: resp.mensajes
        });

        scrollToBottom('mensajes');
    }

    return (
        <div
            className={`chat_list ${ (usuario.uid === chatActivo) && 'active_chat' }`}
            onClick={ onClick }
        >
            {/* active_chat */}
            <div className="chat_people">
                <div className="chat_img"> 
                    <img src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png" alt="sunil" />
                </div>
                <div className="chat_ib">
                    <h4> { usuario.nombre } </h4>
                    {
                        ( usuario.online )
                            ? <span className="text-success">Online</span>
                            : <span className="text-danger">Offline</span>
                    }
                   
                </div>
            </div>
        </div>
    )
}
