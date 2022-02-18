import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
    height: 100vh;
    
    display: flex;
`;

export const Content = styled.div`
    margin: 0px auto;
    margin-top: 10vh;

    form {
        margin: 30px 0;
        text-align: center;
    }
    h1 {
        margin-bottom: 24px;
    }

    a {
        color: #0067B0;
        display: block;
        margin-top: 24px;
        text-decoration: none;
        transition: color 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
            margin-right: 8px;      
        }

        &:hover {
            color: ${shade(0.2, '#0067B0')};
        }
    }

    #comboBoxId {
        background: #FEFEFE;
        border-radius: 5px;
        
        width: 500px;
        color: #b2b2b2;

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
            color: #b2b2b2;
        }        
        
    }
`;