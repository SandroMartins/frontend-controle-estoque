import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/AuthContext';
import api from '../../services/api';
import {Link, useHistory} from 'react-router-dom';
import HeaderComponent from '../../components/Header';
import {Table, Button} from 'react-bootstrap';

import {FiDelete, FiEdit} from 'react-icons/fi';

import {
    Container,
    Menu,
    TabelaProduto

} from './styles';

interface Usuario {
    nome: string;
    email: string;
}

interface ProdutoProps{
    id: number;
    descricao: string;
    tipoProduto: TipoProdutoProps;
    valorFornecedor: number;
    quantidade: number
}

interface TipoProdutoProps {
    id: number;
    descricao: string;
}

const Produto: React.FC = () => {
    const {logout, user, authorization} = useAuth();
    const [usuario, setUsuario] = useState<Usuario>({} as Usuario);
    const [produtos, setProdutos] = useState<ProdutoProps[]>([]);

    const history = useHistory();

    useEffect(() => {
        api.get(`usuarios/email?value=${user}`, {
            headers: {
                authorization: authorization
            }
        }).then(response => {
            setUsuario(response.data.content);
        });
        
    },[setUsuario]);

    useEffect(() => {
        api.get(`/produtos`, {
            headers: {
                authorization: authorization
            }
        }).then(response => {
            setProdutos(response.data.content);            
        });       
    },[setProdutos]);

    const handleDelete = useCallback(async (id) => {
        try {
            await api.delete(`/produtos/${id}`, {
                headers: {
                    authorization: authorization
                }
            });
            alert('Cadastro excluido com sucesso!');
            setProdutos(produtos.filter(produto => produto.id !== id))

        }catch(err) {
            alert('Erro ao excluir o produto!');
        }
    },[setProdutos, produtos]);

    function handleEdit(id: number) {
        history.push(`/salvarProduto/${id}`)
    }

    return(
        <>
            <HeaderComponent />
            <Container>
                <Menu>
                    <h1>Produto</h1>
                    <span>|</span>

                    <Link to='/estoque'>
                        <h1>Estoque</h1>    
                    </Link>
                </Menu>
                <Link to="/salvarProduto">
                    <Button variant="success">Cadastrar produto</Button>
                </Link>

                <TabelaProduto>    
                    <Table className='tabelaProd' striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DESCRIÇÃO</th>
                                <th>TIPO PRODUTO</th>
                                <th>QUANTIDADE</th>
                                <th>VALOR FORNECEDOR</th>
                                <th>AÇÕES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.map(prod => (
                                <tr key={prod.id}>
                                    <td>{prod.id}</td>
                                    <td>{prod.descricao}</td>
                                    <td>{prod.tipoProduto.descricao}</td>
                                    <td>{prod.quantidade}</td>
                                    <td>{prod.valorFornecedor}</td>
                                    <td>
                                        <button onClick={() => handleEdit(prod.id)}>
                                            <FiEdit/>
                                        </button>
                                        <button onClick={() => handleDelete(prod.id)}>
                                            <FiDelete/>
                                        </button>
                                    </td>
                                </tr>
                           ))}                                    
                           </tbody>
                    </Table>
                </TabelaProduto>
            </Container>
        </>
    );
}

export default Produto;