import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div`
>header{
    height: 144px;

    display: flex;
    align-items: center;

    div{
        width: 100%;
        margin: 0 auto;
        margin-left: 50px;
    }

    svg{
        color: #999591;
        width: 50px;
        height: 30px;
    }
}
`;

export const Content = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin: -136px auto 0;

max-width: 100%;

form{
        margin-top: 40px;
        margin-bottom: 20px;
        width: 340px;
        text-align: center;
        display: flex;
        flex-direction: column;

        h1 {
            margin-bottom: 24px;
            font-size: 20px;
            text-align: left;
        }

        a{
            color: #f4ede8;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.2s;

            &:hover{
                color: ${shade(0.2, '#2bc4da')}
            }
        }
        
    }

width: 100%;
max-width: 700px;
`;

export const AvatarInput = styled.div`
margin-bottom: 32px;
position: relative;
width: 186px;
align-self: center;

img{
width: 186px;
height: 186px;
border-radius: 50%;
}

label{
    position: absolute;
    width: 48px;
    height: 48px;
    background: #2bc4da;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    input{
        display: none;
    }

svg{
    width: 20px;
    height: 20px;
    color: #28262e;

    &:hover{
        color: ${shade(0.2, '#2bc4da')}
    }
}
}
`;
