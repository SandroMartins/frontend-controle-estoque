import styled, {css} from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
    isFocus: boolean;
    isFilled: boolean;
    isError: boolean;
}

export const Container = styled.div<ContainerProps>`
    background: #FEFEFE;
    border-radius: 5px;
    padding: 16px;
    width: 100%;

    border: 2px solid #b2b2b2;
    color: #b2b2b2;

    display: flex;
    align-items: center;

    & + div {
        margin-top: 8px;
    }

    ${(props) => props.isError && css`
        border-color: #c53030;
    `}

    ${(props) => props.isFocus && css`
        color: #0067B0;
        border-color: #0067B0;
    `}

    ${(props) => props.isFilled && css`
        color: #0067B0;
    `}
    
    input {
        flex: 1;
        background: transparent;
        border: 0;
        
        color: #0067B0;

        &::placeholder {
            color: #b2b2b2;
        }        
    }

    > svg {
        margin-right: 16px;;
    }
`;

export const Error = styled(Tooltip)`
    height: 20px;
    margin-left: 16px;
    
    svg {
        margin: 0;
    }

    span {
        background: #c53030;
        color: #FEFEFE;

        &&::before {
            content: '';
            border-color: #c53030 transparent;
        }
    }
`;