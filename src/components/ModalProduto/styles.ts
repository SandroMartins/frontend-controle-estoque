import styled from 'styled-components';
import { shade } from 'polished';

export const Modal = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(0,0,0,0.8);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Container = styled.div`
    background-color: #EEEEEE;
    width: 60%;
    height: 90%;
    border-radius: 20px;

    button {
        background-color: transparent;
        border: none;
        outline: none;
        width: 32px;
        height: 32px;
        right: calc(-100% + 64px);
        top: 16px;
        display: flex;
        position: relative;
        align-items: center;
        

        svg {
            color: #111;
            font-size: 24px;
            transition: color 0.2s;
            &:hover {
                color: ${shade(0.2, '#EEE')};
            }
        }

    }

    h1 {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export const Content = styled.div`
`;