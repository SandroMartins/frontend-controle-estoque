import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
    margin-left: 40px;
    margin-right: 40px;
    
    > a {
        color: #0067B0;
        display: block;
        margin-bottom: 50px;
        text-decoration: none;
        transition: color 0.2s;
        align-items: center;
        justify-content: center;

        svg {
            margin-right: 8px;      
        }

        &:hover {
            color: ${shade(0.2, '#0067B0')};
        }
    }

    h6 {
        margin-left: 15px;
        color: #111;
        
        span {
            color: #a50a0a;
            margin-left: 10px;
        }
    }
`;

export const Menu = styled.div`
    display: flex;
    margin: 0px auto;
    margin-top: 5vh;
    align-items: center;
    justify-content: center;    
    
    span {
        margin-left: 15px;
        font-size: 20px;
    }

    > h1 {
        font-size: 20px;
        
    }
`;

export const TabelaProduto = styled.div`
    
    .tabelaProd {
        margin: 30px 0;
        text-align: center;
    }
        margin: 30px 0;
        text-align: center;
    th {
        color: #0067B0;
    }

    td {
        color: #111;
        font-size: 20px;
    }

    button {
        font-size: 20px;
        border: 0;
        background-color: transparent;
    }
`;