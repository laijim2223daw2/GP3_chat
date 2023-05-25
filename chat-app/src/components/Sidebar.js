import React, { useContext, useState } from 'react';
import { SidebarChatItem } from './SidebarChatItem';
import { ChatContext } from '../context/chat/ChatContext';
import { AuthContext } from '../auth/AuthContext';

export const Sidebar = () => {

    const { chatState } = useContext(ChatContext);
    const { usuarios } = chatState;

    const { auth } = useContext(AuthContext);
    const { uid } = auth;

    const [search, setSearch] = useState('');

    const filteredUsers = usuarios.filter(user =>
        user.uid !== uid && user.nombre.toLowerCase().includes(search.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div className="inbox_chat">
            <div className="search_bar">
                <input
                    type="text"
                    className="search_input"
                    placeholder="Buscar..."
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>

            {filteredUsers.map((usuario) => (
                <SidebarChatItem
                    key={usuario.uid}
                    usuario={usuario}
                />
            ))}

            {/* <!-- Espacio extra para scroll --> */}
            <div className="extra_space"></div>
        </div>
    );
};
