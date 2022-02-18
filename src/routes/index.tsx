import React from 'react';
import {Switch} from 'react-router-dom';

import Route from './Route';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Produto from '../pages/Produto';
import SalvarProduto from '../pages/SalvarProduto';
import Estoque from '../pages/Estoque';
import Historico from '../pages/Historico';
import EntradaEstoqueProduto from '../pages/EntradaEstoqueProduto';
import SaidaEstoqueProduto from '../pages/SaidaEstoqueProduto';


const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Login}  />
        <Route path="/cadastrar" component={Register} />
        <Route path="/produto" component={Produto} isPrivate />
        <Route path="/salvarProduto"exact component={SalvarProduto} isPrivate />
        <Route path="/salvarProduto/:id" exact component={SalvarProduto} isPrivate />
        <Route path="/estoque/" exact component={Estoque} isPrivate />
        <Route path="/historico/:id" exact component={Historico} isPrivate />
        <Route path="/entrada/:produtoId" exact component={EntradaEstoqueProduto} isPrivate />
        <Route path="/saida/:produtoId" exact component={SaidaEstoqueProduto} isPrivate />
    </Switch>
);

export default Routes;