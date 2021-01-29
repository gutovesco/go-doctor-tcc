import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div``

export const ProviderContainer = styled.div<any>`
background: ${(props) => props.background};
box-shadow:  7px 7px 14px #e6e6e6, 
             -7px -7px 14px #ffffff;
display: flex;
align-items: center;
width: 550px;
height: 100px;
margin-bottom: 20px;
border-radius: 20px;

cursor: pointer;

&:hover{
        transform: translateY(-10px);
        transform: translateX(10px);
        transition: 0.2s;
        }
`;

export const Content = styled.div`
max-width: 1120px;
margin: 64px auto;
display: flex;
`;

export const HourContainer = styled.button<any>`
border-radius: 8px;
background: ${(props) => props.background};
box-shadow:  -9px 9px 15px #e5e5e5, 
             9px -9px 15px #fff;
display: flex;
align-items: center;
width: 90px;
height: 45px;
border-radius: 6px;
cursor: pointer;
margin-top: 20px;
margin-left: 10px;
outline: none;
border: none;

&:hover{
        transform: translateX(5px);
        transition: 0.2s;
        }
`; 

export const Schedule = styled.div`
flex: 1;
margin-right: 40px;

h1{
    font-size: 36px;
}

p{
    margin-top: 8px;
    color: #2BC4DA;
    display: flex;
    font-weight: bold;

    span + span {
        margin-left: 8px;
        padding-left: 8px;
        border-left: 1px solid #51ddef;
    }
}
`;

export const CreateAppointmentButton = styled.button`
height: 46px;
background: linear-gradient(90deg, rgba(86,213,245,1) 0%, rgba(89,216,242,1) 100%);
border-radius: 10px;
align-items: center;
margin: 0 auto;
justify-content: center;
width: 300px;
height: 50px;
cursor: pointer;
border: none;
outline: none;

    &:hover{
        background: ${shade(0.1, '#59d8f2')};
}
`;

export const CreateAppointmentButtonText = styled.span`
font-size: 16px;
color: #fff;
margin: 0px auto;
`;


export const Calendar = styled.aside`
margin-bottom: 15px;
.DayPicker {
    border-radius: 36px;
    background: #fff;
    box-shadow:  13px 13px 26px #e7e7e7, 
    -13px -13px 26px #ffffff;
}

.DayPicker-wrapper {
  padding-bottom: 0;
  width: 450px;
  padding-right: 10px;
}

.DayPicker,
.DayPicker-Month {
  width: 100%;
}

.DayPicker-Month {
  border-collapse: separate;
  border-spacing: 8px;
  margin: 16px;
}

.DayPicker-Day {
  width: 40px;
  height: 40px;
}

.DayPicker-Caption{
    color: #2bc4da;
}

.DayPicker-Day--available:not(.DayPicker-Day--outside) {
  background: #fff;
  border-radius: 10px;
  color: #131313;
}

.DayPicker:not(.DayPicker--interactionDisabled)
  .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
  background: ${shade(0.1, '#fff')};
  color: #131313;
}

.DayPicker-Day--today {
  font-weight: normal;
}

.DayPicker-Day--disabled {
  color: #131313 !important;
  background: transparent !important;
}

.DayPicker-Day--selected {
    background: #00d4ff!important;
  border-radius: 10px;
  color: #232129 !important;
}
`;

export const Section = styled.section`
margin-top: 48px;
width: 500px;

>strong{
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
}
`;

export const Title = styled.h1`
color: #131313;
`;

export const ProviderContainerContent = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

export const ProviderImage = styled.img`
margin-left: 15px;
width: 65px;
height: 65px;
border-radius: 30px;
`;

export const ProviderName = styled.span`
margin-left: 15px;
color: ${(props) => props.color};
`;

export const ProviderIconContainer = styled.div`
margin-left: auto;
margin-right: 20px;
`;

export const TimeOfDayTitle = styled.span`
margin-top: 10px;
margin-bottom: 10px;
color: #00d4ff;
font-size: 22px;
margin-left: 10px;
`;

export const HoursWrapper = styled.div`
display: flex;
flex-direction: row;
margin-bottom: 20px;
`;

export const HourText = styled.span`
margin: auto;
color: ${(props) => props.color};
`;

export const CreateAppointmentWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 50px;
`;