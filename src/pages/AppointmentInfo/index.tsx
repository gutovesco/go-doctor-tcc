/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Container, Content, CreateAppointmentButton, CreateAppointmentButtonText } from './styles'
import { useLocation, useHistory, } from 'react-router-dom';
import Header from '../../components/Header/Header'

export interface Provider {
    id: string;
    name: string;
    avatar_url: string;
}

const AppointmentInfo: React.FC = (props) => {
    const location = useLocation();
    const history = useHistory()

    /**
     * const handleCreateAppointment = useCallback(async () => {
        try{
          const date = new Date(selectedDate)
    
          date.setHours(selectedHour)
          date.setMinutes(0)
    
          await api.post('appointments', {
            provider_id: selectedProvider,
            date,
          })
    
          console.log('appointment criado')
    
          navigate('AppointmentCreated', {date: date.getTime()})
        }catch(err){
          Alert.alert('Erro ao criar agendamento', 'Ocorreu um erro ao criar o agendamento, tente novamente.')
        }
      }, [navigate, selectedDate, selectedHour, selectedProvider])
     */

    const params: any = location.state
    const { name, avatar } = params.item;

    return (
        <Container>
           <Header route="appointments"/>
            <Content>
                <img alt='' style={{ marginLeft: 15, width: 120, height: 120, borderRadius: 60 }} src={avatar === null ? 'https://www.pngitem.com/pimgs/m/421-4212266_transparent-default-avatar-png-default-avatar-images-png.png' : avatar} />
                <strong style={{ marginTop: 15, color: '#131313', fontSize: 35, fontFamily: 'RobotoSlab-Regular' }}>{name}</strong>

                <CreateAppointmentButton>
                    <CreateAppointmentButtonText>Confirmar consulta</CreateAppointmentButtonText>
                </CreateAppointmentButton>
            </Content>
        </Container>
    )
}

export default AppointmentInfo;