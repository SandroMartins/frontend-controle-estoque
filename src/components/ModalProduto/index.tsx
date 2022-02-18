import React from 'react';

import {FiX} from 'react-icons/fi';
import Input from '../Input';

import {Modal, Container, Content} from './styles';

interface ModalProps {
    [key: string]: any;
}

const ModalProduto: React.FC<ModalProps> = ({onClose= () => {} , children}) => {
    return(
        <Modal>
            <Container>
                <button className='close' onClick={onClose}>
                    <FiX/>
                </button>
                <Content><Input name='email' placeholder='E-mail' /></Content>
            </Container>
        </Modal>
    );
};


export default ModalProduto;