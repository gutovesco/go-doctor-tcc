/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback } from 'react';
import { Container, Content, CreateAppointmentButton, ErrorText, CreateAppointmentButtonText, ProviderImage, ProviderName } from './styles'
import { useLocation, useHistory, } from 'react-router-dom';
import Header from '../../components/Header/Header'
import api from '../../services/api';
import { useToast } from '../../hooks/Toast'
import avatar from '../../assets/avatar.png';
export interface Provider {
    id: string;
    name: string;
    avatar_url: string;
}

const AppointmentInfo: React.FC = () => {
    const location = useLocation();
    const history = useHistory()
    const { addToast } = useToast();

    const params: any = location.state
    let component;

    const handleCreateAppointment = useCallback(async () => {
        try {
            const date = new Date(params.selectedDate)

            date.setHours(params.selectedHour)
            date.setMinutes(0)

            await api.post('appointments', {
                provider_id: params.providerId,
                date,
            }).then(() => {
                addToast({
                    type: 'success',
                    title: 'Concluído',
                    description: 'O seu agendamento foi criado com sucesso!'
                });

                history.push({
                    pathname: '/',
                    state: {}
                })
            })

        } catch (err) {
            console.log(err.message)
            addToast({
                type: 'error',
                title: 'Erro',
                description: 'Ocorreu um erro ao criar o seu agendamento, é possível que o horário não esteja mais disponíve!'
            });
        }
    }, [addToast, history, params.providerId, params.selectedDate, params.selectedHour])

    if (params && params.item) {
        const { name } = params.item;

        component =
            <Container>
                <Header route="appointments" />
                <Content>
                    <ProviderImage alt='' src={avatar === null ? avatar : params.item.avatar} />
                    <ProviderName>{name}</ProviderName>

                    <CreateAppointmentButton aria-label="confirmAppointment" onClick={() => handleCreateAppointment()}>
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
                    <CreateAppointmentButton aria-label="goBack" onClick={() => {
                        history.push({ pathname: '/appointments', })
                    }}>
                        <CreateAppointmentButtonText>Voltar</CreateAppointmentButtonText>
                    </CreateAppointmentButton>
                </Content>
            </Container>
    }


    return component

}

export default AppointmentInfo;