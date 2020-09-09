/* eslint-disable jsx-a11y/alt-text */
import React, { useState, } from 'react';
import { Container, Header, HeaderContent, Profile, Content, CreateAppointmentButton, CreateAppointmentButtonText } from './styles'
import logoImg from '../../assets/logo.png'
import logoImg2 from '../../assets/logo4.png'
import { FiPower, FiChevronLeft, } from 'react-icons/fi';
import { useAuth } from '../../hooks/AuthContext';
import { Link, useLocation, useHistory, } from 'react-router-dom';

interface Appointment {
    id: string;
    date: string;
    hourFormatted: string;
    user: {
        name: string;
        avatar_url: string;
    }
}

export interface Provider {
    id: string;
    name: string;
    avatar_url: string;
}

const AppointmentInfo: React.FC = (props) => {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [providers, setProviders] = useState<Provider[]>([])

    const { signOut, user } = useAuth()
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
    console.log(params.selectedDate)

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <Link to="/appointments">
                        <FiChevronLeft color="#131313" size={30} />
                    </Link>

                    <img onClick={() => history.push('/dashboard')} style={{ width: 150, height: 150, marginLeft: 20, cursor: 'pointer' }} src={logoImg2} alt="logo"></img>

                    <Profile>
                        <img src={user.avatar_url !== undefined ? user.avatar_url : logoImg} alt=''></img>
                        <div>
                            <span style={{ color: '#131313' }}>Bem-vindo</span>
                            <Link to="/profile"><strong style={{ color: '#2BC4DA' }}>{user.name}</strong></Link>
                        </div>
                    </Profile>

                    <button type="button" onClick={signOut}>
                        <FiPower />
                    </button>
                </HeaderContent>
            </Header>

            <Content>
                <img alt={params.item.avatar} style={{ marginLeft: 15, width: 120, height: 120, borderRadius: 60 }} src={params.item.avatar !== undefined && params.item.avatar !== null ? params.item.avatar : 'https://www.pngitem.com/pimgs/m/421-4212266_transparent-default-avatar-png-default-avatar-images-png.png'} />
                <strong style={{ marginTop: 15, color: '#131313', fontSize: 35, fontFamily: 'RobotoSlab-Regular' }}>{params.item.name}</strong>

                <CreateAppointmentButton>
                    <CreateAppointmentButtonText>Marcar consulta</CreateAppointmentButtonText>
                </CreateAppointmentButton>
            </Content>
        </Container>
    )
}

export default AppointmentInfo;