/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Container, Content, CreateAppointmentButton, ErrorText, CreateAppointmentButtonText, ProviderImage, ProviderName } from './styles'
import { useLocation, useHistory, } from 'react-router-dom';
import Header from '../../components/Header/Header'

export interface Provider {
    id: string;
    name: string;
    avatar_url: string;
}

const AppointmentInfo: React.FC = () => {
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
    let component;

    if (params && params.item) {
        const { name, avatar } = params.item;

        component =
            <Container>
                <Header route="appointments" />
                <Content>
                    <ProviderImage alt='' src={avatar === null ? 'https://www.pngitem.com/pimgs/m/421-4212266_transparent-default-avatar-png-default-avatar-images-png.png' : avatar} />
                    <ProviderName>{name}</ProviderName>

                    <CreateAppointmentButton>
                        <CreateAppointmentButtonText>Confirmar consulta</CreateAppointmentButtonText>
                    </CreateAppointmentButton>
                </Content>
            </Container>
    } else {
        component =
            <Container>
                <Header route="appointments" />
                <Content>
                    <ErrorText>Ocorreu um erro</ErrorText>
                    <CreateAppointmentButton>
                        <CreateAppointmentButtonText onClick={() => {
                            history.push({ pathname: '/appointments', })
                        }}>Voltar</CreateAppointmentButtonText>
                    </CreateAppointmentButton>
                </Content>
            </Container>
    }


    return component

}

export default AppointmentInfo;