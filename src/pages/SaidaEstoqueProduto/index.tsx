import React, {useCallback, useEffect, useRef, useState} from 'react';
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
    valorVenda: number;
    dataVenda: string;
}

interface ProdutoProps {
    descricao: string;
    valorFornecedor: number;
    quantidade: number;
}

interface ParamsProps {
    produtoId: string;
}

const SaidaEstoqueProduto: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const {produtoId} = useParams<ParamsProps>();
    const [produto, setProduto] = useState<ProdutoProps>();

    const {authorization} = useAuth();
    const history = useHistory();

    useEffect(() => {
    
        api.get(`/produtos/${produtoId}`, {
            headers: {
                authorization: authorization
            }
        }).then(response => {
            setProduto(response.data);
        });       
    },[setProduto, produto]);
    
    const handleSubmit = useCallback(async (data: MovimentarProdutoFormData) => {
        try {
            data.produtoId = produtoId;
            data.tipoMovimentacao = 2;
            console.log(produto);
    
            if(produto?.quantidade != undefined && produto?.quantidade < data.quantidade) {
                alert('Quantidade de produto insuficiente no estoque.');
                return;
            }
            console.log(data);
            console.log(produto);
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
    },[setProduto, produto]);
    return (
        <>
            <Header />
            <Container>
                <Content>
                    <h1>Saida de produto no estoque</h1>
                    <Form ref={formRef} onSubmit={handleSubmit}>

                        <Input name='quantidade' type="number" placeholder='Quantidade' />
                        <Input name='valorVenda' type="number" placeholder='Valor venda' />
                        <Input name='dataVenda' type="date" placeholder='Data venda' />

                        
                        <Button type='submit'>Salvar</Button>
                        <Link to="/estoque">
                            <FiArrowLeft />
                            Voltar
                        </Link>
                    </Form>
                </Content>
            </Container>
        </>
    );
}

export default SaidaEstoqueProduto;