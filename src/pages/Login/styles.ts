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
        margin: 100px 0;
        width: 380px;
        text-align: center;
    }

    h1 {
        margin-bottom: 24px;
    }

    h5 {
        color: #c53030;
        text-align: left;
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
`;