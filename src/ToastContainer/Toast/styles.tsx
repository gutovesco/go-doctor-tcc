import styled, {css} from 'styled-components';
import {animated} from 'react-spring'

interface ContainerProps{
    type?: string;
}

export const Container = styled(animated.div)<ContainerProps>`
width: 360px;
position: relative;
padding: 12px 30px 16px 16px;
border-radius: 10px;
box-shadow: 2px 2px 8px rgba(0,0,0, 0.2);
display: flex;
background: #ebf8ff;
color: #3172b7;

& + div{
    margin-top: 8px
}

${props => props.type === "success" && css`
background: #e6fffa;
color: #2e656a;
`}

${props => props.type === "error" && css`
background: #fddede;
color: #c53030;
`}

> svg{
    margin: 4px 12px 0 0;
}

div{
    flex: 1;
}

p{
    margin-top: 4px;
    font-size: 14px;
    opacity: 0.8;
    line-height: 20px;
}

button{
    position: absolute;
    right: 13px;
    top: 19px;
    border: 0;
    background: transparent;
    opacity: 0.6;
    color: inherit 
}
`;