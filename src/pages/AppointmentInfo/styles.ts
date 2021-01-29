import styled from 'styled-components'

export const Container = styled.div``

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

export const ProviderImage = styled.img`
margin-left: 15px;
width: 120px;
height: 120px;
border-radius: 60px;
`;

export const ProviderName = styled.strong`
margin-top: 15px;
color: #131313;
font-size: 35px;
font-family: 'RobotoSlab-Regular';
`;

export const ErrorText = styled.strong`
margin-top: 15px;
color: #131313;
font-size: 35px;
font-family: 'RobotoSlab-Regular';
`;