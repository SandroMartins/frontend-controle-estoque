import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
    margin-left: 40px;
    margin-right: 40px;
    
    #comboBoxId {
        background: #FEFEFE;
        border-radius: 5px;
        
        
        width: 300px;
        color: #EEE;

        display: flex;
        align-items: center;
        
        & + div {
            margin-top: 8px;
        }
        
        flex: 1;
        background: transparent;
        border: 0;
        
        color: #0067B0;

        &::placeholder {
            color: #EEE;
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
        margin-left: 15px;
        text-decoration: underline;
    }

    > a {
        color: #0067B0;
        text-decoration: none;
        transition: color 0.2s;
        display: flex;

        > h1 {
            font-size: 20px;
            &:hover {
                color: ${shade(0.2, '#0067B0')};
                text-decoration: underline;
            }
        }
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
        margin-right: 10px;
        background-color: transparent;
        flex: auto;
        transition: color 0.2s;

        &:hover {
                color: ${shade(0.2, '#0067B0')};
                text-decoration: underline;
            }
    }
`;