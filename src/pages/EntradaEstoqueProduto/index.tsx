import React, {useCallback, useRef} from 'react';
import {FormHandles} from '@unform/core';
import Header from '../../components/Header';
import {Form} from '@unform/web';
import {FiArrowLeft} from 'react-icons/fi';
import {Link, useHistory, useParams} from 'react-router-dom';
import {Container, Content} from './styles';
import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/AuthContext';

interface MovimentarProdutoFormData {
    produtoId: string;
    tipoMovimentacao: number;
    quantidade: number;
}

interface ParamsProps {
    produtoId: string;
}

const EntradaEstoqueProduto: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const {produtoId} = useParams<ParamsProps>();

    const {authorization} = useAuth();
    const history = useHistory();
    
    const handleSubmit = useCallback(async (data: MovimentarProdutoFormData) => {
        try {
            data.produtoId = produtoId;
            data.tipoMovimentacao = 1;
            
            await api.post('/movimentacoes', data, {
                headers: {
                    authorization: authorization
                }
            });            
            alert('Movimentação realizada com sucesso!');
            history.push("/estoque");

        }catch(err) {
            alert('Erro ao movimentar o estoque!');
        }
    },[]);
    return (
        <>
            <Header />
            <Container>
                <Content>
                    <h1>Entrada de produto no estoque</h1>
                    <Form ref={formRef} onSubmit={handleSubmit}>

                        <Input name='quantidade' type="number" placeholder='Quantidade' />
                        
                        <Button type='submit'>Salvar</Button>
                        <Link to={`/estoque/${produtoId}`}>
                            <FiArrowLeft />
                            Voltar
                        </Link>
                    </Form>
                </Content>
            </Container>
        </>
    );
}

export default EntradaEstoqueProduto;