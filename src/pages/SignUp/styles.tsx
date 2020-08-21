import styled, {keyframes} from 'styled-components'
import {shade} from 'polished'
import signUpBackground from '../../assets/background1.svg'

export const Container = styled.div`
height: 100vh;
display: flex;
`;

export const Content = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

width: 90%;
max-width: 850px;
`;

const appearFromRight = keyframes`
from {
    opacity: 0;
    transform: translateX(50px);
}
to {
    opacity: 1;
    transform: translateX(0);
}
`;

export const AnimationContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

animation: ${appearFromRight} 1s;

form{
        width: 390px;
        text-align: center;

        h1 {
            margin-bottom: 24px;
        }

        a{
            color: #f4ede8;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.2s;

            &:hover{
                color: ${shade(0.2, '#ff9000')}
            }
        }
    }

    > a{
        color: #2BC4DA;
        display: block;
        margin-top: 24px;
        text-decoration: none;
        transition: color 0.2s;
        display: flex;
        align-items: center;

        &:hover{
            color: ${shade(0.2, '#2BC4DA')}
            }

        svg{
            margin-right: 16px;

            &:hover{
                color: ${shade(0.2, '#2BC4DA')}
            }
        }
    }
`;

export const Background = styled.div`
flex: 1;
background: url(${signUpBackground}) no-repeat center;
`;  