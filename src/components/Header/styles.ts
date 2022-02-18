import styled from 'styled-components';

export const Container = styled.div`

`;

export const Header = styled.header`
    padding: 32px 0;
    background: #0067B0;
`;

export const HederContent = styled.div`
    max-width: 1120px;
    margin: 0 auto;
    display: flex;
    align-items: center;

    button {
        margin-left: 40px;
        background: transparent;
        border: 0;

        svg {
            color: #EEEEEE;
            width: 20px;
            height: 20px;
        }
    }
`;

export const Menu = styled.div`
    display: flex;
    align-items: center;
`;

export const Titulo = styled.div`
    color: #EEEEEE;
`;

export const Usuario = styled.div`
    margin-left: auto;
    display: flex;

    div {
        display: flex;
        flex-direction: column;
        margin-left: 16px;
        line-height: 24px;

        span {
            color: #EEEEEE;
        }

        strong {
            color: #111;
        }
    }
`;