import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/AuthContext';
import api from '../../services/api';
import {Link, useHistory, useParams} from 'react-router-dom';
import HeaderComponent from '../../components/Header';
import {Table} from 'react-bootstrap';

import {FiArrowLeft} from 'react-icons/fi';

import {
    Container,
    Menu,
    TabelaProduto

} from './styles';

interface MovimentacoesProps{
    id: number;
    produtoId: number;
    tipoMovimentacao: string;
    tipoProduto: TipoProdutoProps;
    valorVenda: number;
    dataVenda: number;
    quantidade: number;
    totalLucro: number;
}

interface ProdutoProps {
    descricao: string;
    tipoProduto: TipoProdutoProps;
    valorFornecedor: number;
    quantidade: number;
}

interface TipoProdutoProps {
    id: number;
    descricao: string;
}

interface ParamsProps {
    id: string;
}



const Historico: React.FC = () => {
    const {logout, user, authorization} = useAuth();
    const [produto, setProduto] = useState<ProdutoProps>();
    const [movimentacoes, setMovimentacoes] = useState<MovimentacoesProps[]>([]);
    const [tipoProd, setTipoprod] = useState('');
    const {id} = useParams<ParamsProps>();

    const history = useHistory();

    useEffect(() => {
    
        api.get(`/movimentacoes?produto=${id}`, {
            headers: {
                authorization: authorization
            }
        }).then(response => {
            setMovimentacoes(response.data.content);
            console.log(response.data.content);
        });       
    },[setMovimentacoes]);

    useEffect(() => {
    
        api.get(`/produtos/${id}`, {
            headers: {
                authorization: authorization
            }
        }).then(response => {
            setProduto(response.data);
        });       
    },[setProduto]);
    
    return(
        <>
            <HeaderComponent />
            <Container>
                <Menu>
                    <h1>HISTÓRICO DE MOVIMENTAÇÕES</h1>    
                </Menu>

                <Link to="/estoque">
                    <FiArrowLeft />
                    Voltar
                </Link>

                <h6>Produto:<span>{produto?.descricao}</span></h6>
                <h6>Valor fornecedor: <span>{produto?.valorFornecedor}</span></h6>
                <h6>Quantidade Disponivel: <span>{produto?.quantidade}</span></h6>

                <TabelaProduto>    
                    <Table className='tabelaProd' striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>TIPO MOVIMENTAÇÃO</th>
                                <th>VALOR VENDA</th>
                                <th>DATA VENDA</th>
                                <th>QUANTIDADE MOVIMENTADA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movimentacoes.map(mov => (
                                <tr key={mov.id}>
                                    <td>{mov.id}</td>
                                    <td>{mov.tipoMovimentacao}</td>
                                    <td>{mov.valorVenda}</td>
                                    <td>{mov.dataVenda}</td>
                                    <td>{mov.quantidade}</td>
                                </tr>
                           ))}                                    
                           </tbody>
                    </Table>
                </TabelaProduto>
            </Container>
        </>
    );
}

export default Historico;