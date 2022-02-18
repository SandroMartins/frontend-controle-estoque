import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/AuthContext';
import api from '../../services/api';
import {Link, useHistory} from 'react-router-dom';
import HeaderComponent from '../../components/Header';
import {Table} from 'react-bootstrap';

import {FiArrowRight} from 'react-icons/fi';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import {
    Container,
    Menu,
    TabelaProduto

} from './styles';

interface ProdutoProps{
    id: number;
    descricao: string;
    tipoProduto: TipoProdutoProps;
    valorFornecedor: number;
    quantidade: number;
    quantidadeTotalSaidaProduto: number;
    totalLucro: number;
}

interface TipoProdutoProps {
    id: number;
    descricao: string;
}


const Estoque: React.FC = () => {
    const {logout, user, authorization} = useAuth();
    const [produtos, setProdutos] = useState<ProdutoProps[]>([]);
    const [tipoProd, setTipoprod] = useState('');
    const [tipoProduto, setTipoProduto] = useState('1');

    const history = useHistory();

    useEffect(() => {
        console.log(tipoProduto);
        api.get(`/produtos?tipoProduto=${tipoProduto}`, {
            headers: {
                authorization: authorization
            }
        }).then(response => {
            setProdutos(response.data.content);
            console.log(response.data.content);
        });       
    },[setProdutos, tipoProduto]);

    function handleHistorico(id: number) {
        history.push(`/historico/${id}`)
    }

    function handleEntrada(produtoId: number) {
        history.push(`/entrada/${produtoId}`)
    }

    function handleSaida(produtoId: number) {
        history.push(`/saida/${produtoId}`)
    }

    const handleChange = useCallback((event: SelectChangeEvent) => {
        setTipoProduto(event.target.value as string);
        
      },[setTipoProduto]);
    
    return(
        <>
            <HeaderComponent />
            <Container>
                <Menu>
                    <Link to='/produto'>
                        <h1>Produto</h1>
                    </Link>
                    <span>|</span>

                    <h1>Estoque</h1>    
                </Menu>

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

                <TabelaProduto>    
                    <Table className='tabelaProd' striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DESCRIÇÃO</th>
                                <th>TIPO PRODUTO</th>
                                <th>QUANTIDADE TOTAL SAÍDA</th>
                                <th>LUCRO TOTAL</th>
                                <th>AÇÕES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.map(prod => (
                                <tr key={prod.id}>
                                    <td>{prod.id}</td>
                                    <td>{prod.descricao}</td>
                                    <td>{prod.tipoProduto.descricao}</td>
                                    <td>{prod.quantidadeTotalSaidaProduto}</td>
                                    <td>{prod.totalLucro}</td>
                                    <td>
                                        <button onClick={() => {handleHistorico(prod.id)}}>
                                            <FiArrowRight/> 
                                            Histórico
                                        </button>
                                        |
                                        <button onClick={() => {handleEntrada(prod.id)}} >
                                            <FiArrowRight/>
                                            Entrada
                                        </button>
                                        |
                                        <button onClick={() => {handleSaida(prod.id)}} >
                                            <FiArrowRight/>
                                            Saida
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

export default Estoque;