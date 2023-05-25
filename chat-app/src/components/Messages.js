import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';

import { IncomingMessage } from './IncomingMessage';
import { OutgoingMessage } from './OutgoingMessage';
import { SendMessage } from './SendMessage';

export const Messages = () => {

    const { chatState } = useContext(ChatContext);
    const { auth } = useContext(AuthContext);

    const usuarioActivo = chatState.usuarios.find((u) => u.uid === chatState.chatActivo);

    return (
      <>
      <div className="chat-header">
                <h4 className="user-name">{usuarioActivo ? usuarioActivo.nombre : 'Selecciona un chat'}</h4>
                {usuarioActivo && (
                <div>
                    <span className={`user-status ${usuarioActivo.online ? 'online' : 'offline'}`}>
                    {usuarioActivo.online ? 'Online' : 'Offline'}
                    </span>
                </div>
                )}
            </div>
        <div className="mesgs">
            

            <div 
                id="mensajes"
                className="msg_history"
            >

                {
                    chatState.mensajes.map( msg => (
                        ( msg.para === auth.uid )
                            ? <IncomingMessage key={ msg._id } msg={ msg } />
                            : <OutgoingMessage key={ msg._id } msg={ msg } />
                    ))
                }

            </div>

           <SendMessage />

        </div>
        </>
    )
}
