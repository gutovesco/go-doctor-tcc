import styled from 'styled-components';

export const Header = styled.header`
padding: 0 auto;
border-bottom: solid 1px #131313;
`;

export const HeaderContent = styled.div`
max-width: 1120px;
margin: 0 auto;
display: flex;
align-items: center;

> img{
    height: 80px;
}

button{
    margin-left: auto;
    background: transparent;
    border: 0;
}

svg{
    color: #999591;
    width: 20px;
    height: 20px;

    &:hover{
        color: #51ddef;
        }
}
`;

export const Profile = styled.div`
display: flex;
align-items: center;
margin-left: 80px;

img{
    width: 63px;
    height: 63px;
    border-radius: 50%;
background: #f7f7f7;
box-shadow:  7px 7px 14px #e6e6e6, 
             -7px -7px 14px #ffffff;
}

div{
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span{
        color: #f4ede8;
    }

    a{
        text-decoration: none;
        color: #51ddef;

        &:hover{
            opacity: 0.7;
        }
    }
}
`;