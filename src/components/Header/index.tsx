import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/AuthContext';

import {FiPower} from 'react-icons/fi';
import {
    Container,
    Header, 
    HederContent,
    Menu,
    Titulo,
    Usuario,

} from './styles';
import api from '../../services/api';

interface Usuario {
    nome: string;
    email: string;
}

const HeaderComponent: React.FC = () => {
    const {logout, user, authorization} = useAuth();
    const [usuario, setUsuario] = useState<Usuario>({} as Usuario);

    useEffect(() => {
        api.get(`usuarios/email?value=${user}`, {
            headers: {
                authorization: authorization
            }
        }).then(response => {
            setUsuario(response.data);
            console.log(response.data);
        });
        
    },[setUsuario]);

    return(
        <Container>
            <Header>
                <HederContent>
                    <Menu>
                        <Titulo><h1>Controle de estoque</h1></Titulo>
                    </Menu>
                    <Usuario>
                        <div>
                            <span>Bem vindo,</span>
                            <strong>{usuario.nome}</strong>
                        </div>
                        <button type='button' onClick={logout}>
                            <FiPower />
                        </button>
                    </Usuario>
                    
                </HederContent>
            </Header>
        </Container>
    );
}

export default HeaderComponent;