import React, { useContext } from 'react';
import { ChatSelect } from '../components/ChatSelect';
import { InboxPeople } from '../components/InboxPeople';
import { Messages } from '../components/Messages';
import { ChatContext } from '../context/chat/ChatContext';

import '../css/chat.css';

/**
 * Página del chat
 */
export const ChatPage = () => {

    const { chatState } = useContext(ChatContext);

    return (
        <div className="messaging">
            <div className="inbox_msg">

                <InboxPeople />

                {
                    /**
                     * Renderiza el componente de mensajes si hay un chat activo,
                     * de lo contrario, muestra el componente de selección de chat.
                     */
                    (chatState.chatActivo)
                        ? <Messages />
                        : <ChatSelect />
                }

            </div>
        </div>
    )
}
