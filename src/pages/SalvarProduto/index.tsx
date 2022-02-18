import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FormHandles} from '@unform/core';
import Header from '../../components/Header';
import {Form} from '@unform/web';
import {FiArrowLeft, FiUser, FiMail, FiLock} from 'react-icons/fi';
import {Link, useHistory, useParams} from 'react-router-dom';
import {Container, Content} from './styles';
import api from '../../services/api';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/AuthContext';

interface RegistrarProdutoFormData {
    descricao: string;
    tipoProduto: string;
    valorFornecedor: number;
}

interface TipoProdutoFormData {
    id: number;
    descricao: string;
}

interface ParamsProps {
    id: string;
}

const SalvarProduto: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const {id} = useParams<ParamsProps>();
    const {authorization} = useAuth();
    const [produto, setProduto] = useState<RegistrarProdutoFormData>();
    const [tipoProduto, setTipoProduto] = useState('1');
    const history = useHistory();

    useEffect(() => {
        api.get(`/produtos/${id}`, {
            headers: {
                authorization: authorization
            }
        }).then(response => {
            setTipoProduto(response.data.tipoProduto.id);
            setProduto({
                descricao: response.data.descricao,
                tipoProduto: response.data.tipoProduto.id,
                valorFornecedor: response.data.valorFornecedor
            });
        });       
    },[setProduto, setTipoProduto]);

    const handleChange = useCallback((event: SelectChangeEvent) => {
        setTipoProduto(event.target.value as string);
        
      },[setTipoProduto]);
    
    const handleSubmit = useCallback(async (data: RegistrarProdutoFormData) => {
        try {
            if (id === undefined) {
                await api.post('/produtos', {
                    descricao: data.descricao,
                    tipoProduto,
                    valorFornecedor: data.valorFornecedor
                }, {
                    headers: {
                        authorization: authorization
                    }
                });
            } else {
                await api.put(`/produtos/${id}`, {
                    id,
                    tipoProduto,
                    descricao: data.descricao,
                    valorFornecedor: data.valorFornecedor
                }, {
                    headers: {
                        authorization: authorization
                    }
                });
                
            }
            
            alert('Cadastro salvo com sucesso!');
            history.push('/produto');

        }catch(err) {
            alert('Erro ao cadastrar o produto!');
        }
    },[setTipoProduto, tipoProduto]);
    return (
        <>
            <Header />
            <Container>
                <Content>
                    <h1>Gerenciamento de produtos</h1>
                    <Form initialData={produto} ref={formRef} onSubmit={handleSubmit}>

                        <Input name='descricao' placeholder='Descrição' />
                        <Select 
                            labelId="comboBox"
                            id="comboBoxId"
                            value={tipoProduto}
                            label="Tipo Produto"
                            onChange={handleChange}
                        >
                            <MenuItem  className='menuItemComboBox' value={1}>Eletrônico</MenuItem>
                            <MenuItem className='menuItemComboBox' value={2}>Eletrodométisco</MenuItem>
                            <MenuItem className='menuItemComboBox' value={3}>Móvel</MenuItem>
                        </Select>
                        <Input name='valorFornecedor' type={'number'} placeholder='Valor Fornecedor' />

                        <Button type='submit'>Salvar</Button>
                        <Link to="/produto">
                            <FiArrowLeft />
                            Voltar
                    </Link>
                    </Form>
                </Content>
            </Container>
        </>
    );
}

export default SalvarProduto;