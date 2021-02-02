import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div``

export const Content = styled.div`
max-width: 1120px;
margin: 64px auto;
display: flex;
`;

export const Schedule = styled.div`
flex: 1;
margin-right: 120px;

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

export const NextAppointment = styled.div`
margin-top: 64px;

strong{
    color: #999591;
    font-size: 20px;
    font-weight: 400;
}

div{
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 16px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;

    &::before{
        position: absolute;
        height: 80px;
        width: 1px;
        left: 0;
        top: 10%;
        content: '';
        background: #51ddef;
    }

    img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }

    strong{
        margin-left: 24px;
        color: #fff;
    }

    span{
        margin-left: auto;
        display: flex;
        align-items: center;
        color: #999591;

        svg{
        color: #51ddef;
        margin-right: 8px;
    }
    }
    
}
`;

export const Appointment = styled.div`
display: flex;
align-items: center;

& + div{
    margin-top: 16px;
}

span{
        margin-left: auto;
        display: flex;
        align-items: center;
        color: #2bc4da;

        svg{
        color: #51ddef;
        margin-right: 8px;
    }
    }

    div{
        flex: 1;

    display: flex;
    align-items: center;
    padding: 16px 16px;
    border-radius: 11px;
    background: #fff;
    box-shadow:  9px 9px 18px #e3e3e3, 
             -9px -9px 18px #ffffff;
    margin-left: 24px;
    }

    img{
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: #fff;
box-shadow:  13px 13px 26px #fff, 
             -13px -13px 26px #ffffff;
    }

    strong{
        margin-left: 24px;
        color: #2bc4da;
    }
`;

export const Calendar = styled.aside`
.DayPicker {
    border-radius: 36px;
    background: #fff;
    box-shadow:  13px 13px 26px #e7e7e7, 
    -13px -13px 26px #ffffff;
}

.DayPicker-wrapper {
  padding-bottom: 0;
  width: 400px;
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
  background: #51ddef !important;
  border-radius: 10px;
  color: #232129 !important;
}
`;

export const Section = styled.section`
margin-top: 48px;

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