import styled, {css} from 'styled-components'
import Tooltip from '../Tooltip/Tooltip'

interface ContainerProps{
    isFocused: boolean
    isFiled: boolean;
    isErrored: boolean;
}

export const Error = styled(Tooltip)`
height: 20px;
margin-left: 16px;

svg{
    margin: 0;
}

span{
    background: #18CBC1;
    color: #fff;

    &::before{
        border-color: #18CBC1 transparent;
    }
}
`;


export const Container = styled.div<ContainerProps>`
    background: #fff;
    border-radius: 10px;
    border: 2px solid #18CBC1;
    padding: 16px;
    width: 100%;
    color: #131313;
    display: flex;
    align-items: center;

    & + div {
    margin-top: 10px;
    }

    ${props => props.isErrored && css`
    border-color: #c53030;
    `}

    ${props => props.isFocused && css`
    color: #2BC4DA;
    border-color: #2BC4DA
    `}

    ${props => props.isFiled && css`
    color: #2BC4DA;
    `}

    input{
        flex: 1;
        border: 0;
        background: transparent;
        color: #131313;

        &::placeholder{
            color: #666360;
        }
    }

    svg{
        margin-right: 16px;
    }
`;

