import styled from 'styled-components'

export const Container = styled.div``

export const Header = styled.header`
padding: 0;
border: solid 1px #131313;
height: 130px;
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

export const CreateAppointmentButton = styled.button`
height: 46px;
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(24,203,193,1) 0%, rgba(0,212,255,1) 100%);
border-radius: 10px;
align-items: center;
margin: 0 15px;
justify-content: center;
width: 300px;
height: 50px;
margin-top: 25px;
cursor: pointer;
border: none;
outline: none;

&:hover {
                opacity: 0.8;
                transition: 0.5s;
            }
`;

export const CreateAppointmentButtonText = styled.span`
font-size: 16px;
color: #f4ede8;
margin: 0px auto;
`;

export const Content = styled.div`
max-width: 1120px;
margin: 64px auto;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`;
