import styled, {keyframes} from 'styled-components'
import {shade} from 'polished'
import signInBackground from '../../assets/background1.svg'

export const Container = styled.div`
height: 100vh;
display: flex;
`;

export const Content = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

width: 100%;
max-width: 700px;
`;

const appearFromLeft = keyframes`
from {
    opacity: 0;
    transform: translateX(-50px);
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

animation: ${appearFromLeft} 1s;

 form{
        width: 340px;
        text-align: center;
        margin-bottom: 20px;
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
        text-decoration: none;
        transition: color 0.2s;

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
background: url(${signInBackground}) no-repeat center;
`;  