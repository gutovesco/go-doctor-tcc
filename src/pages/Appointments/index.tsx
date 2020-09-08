import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Container, Header, HeaderContent, Profile, Content, ProviderContainer, Appointment, Section, Calendar, Schedule, AppointmentsTab } from './styles'
import logoImg from '../../assets/logo.png'
import logoImg2 from '../../assets/logo4.png'
import { FiPower, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useAuth } from '../../hooks/AuthContext';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import api from '../../services/api';
import { isToday, format, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { parseISO } from 'date-fns/esm';
import { Link } from 'react-router-dom';

interface MonthAvailability {
    day: number;
    available: boolean;
}

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

const AppointmentPage: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [monthAvailability, setMonthAvailability] = useState<MonthAvailability[]>([])
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [providers, setProviders] = useState<Provider[]>([])

    const { signOut, user } = useAuth()

    useEffect(() => {
        api.get('providers').then(response => {
            setProviders(response.data)
        })
        console.log(providers)
    }, [providers])

    const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
        if (modifiers.available && !modifiers.disabled) {
            setSelectedDate(day)
        }
    }, [])

    const handleMonthChange = useCallback((month: Date) => {
        setCurrentMonth(month)
    }, [])

    useEffect(() => {
        api.get(`/providers/${user.id}/month-availability`, {
            params: {
                year: currentMonth.getFullYear(),
                month: currentMonth.getMonth() + 1
            },
        })
            .then(response => {
                setMonthAvailability(response.data)
            })
    }, [currentMonth, user.id])

    useEffect(() => {
        api.get<Appointment[]>('/appointments/me', {
            params: {
                year: selectedDate.getFullYear(),
                month: selectedDate.getMonth() + 1,
                day: selectedDate.getDate()
            }
        }).then(response => {
            console.log(response.data)
            const appointmentsFormatted = response.data.map(appointment => {
                return {
                    ...appointment,
                    hourFormatted: format(parseISO(appointment.date), 'HH:mm')
                }
            })
            setAppointments(appointmentsFormatted)
        })
    }, [selectedDate])

    const disabledDays = useMemo(() => {
        const dates = monthAvailability.filter(monthDay => monthDay.available === false)
            .map(monthDay => {
                const year = currentMonth.getFullYear();
                const month = currentMonth.getMonth();
                return new Date(year, month, monthDay.day)
            })
        return dates
    }, [currentMonth, monthAvailability])

    const selectedDateAsText = useMemo(() => {
        return format(selectedDate, "'Dia' dd 'de' MMMM", {
            locale: ptBR
        })
    }, [selectedDate])

    const selectedWeekDay = useMemo(() => {
        return format(selectedDate, 'cccc', {
            locale: ptBR
        })
    }, [selectedDate])

    const morningAppointments = useMemo(() => {
        return appointments.filter(appointment => {
            return parseISO(appointment.date).getHours() < 12
        })
    }, [appointments])

    const afternoonAppointments = useMemo(() => {
        return appointments.filter(appointment => {
            return parseISO(appointment.date).getHours() > 10
        })
    }, [appointments])

    const nextAppointment = useMemo(() => {
        return appointments.find(appointment =>
            isAfter(parseISO(appointment.date), new Date()),
        );
    }, [appointments])

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <Link to="/dashboard">
                        <FiChevronLeft color="#131313" size={30} />
                    </Link>

                    <img style={{ width: 150, height: 150, marginLeft: 20 }} src={logoImg2} alt="logo"></img>

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
                <Schedule>
                    <h1 style={{ color: '#131313' }}>Médicos disponíveis</h1>


                    <Section>
                        {providers.map((item) => {
                            console.log(item)
                            return (
                                <ProviderContainer>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <img style={{ marginLeft: 15, width: 65, height: 65, borderRadius: 30 }} src={item.avatar_url !== undefined && item.avatar_url !== undefined ? item.avatar_url : 'https://www.pngitem.com/pimgs/m/421-4212266_transparent-default-avatar-png-default-avatar-images-png.png'}></img>
                                        <span style={{ marginLeft: 15, color: "#131313" }}>{item.name}</span>
                                    </div>
                                    <div style={{marginLeft: 'auto', marginRight: 20}}>
                                        <FiChevronRight color="#e7e7e7" size={30} />
                                    </div>

                                </ProviderContainer>
                            )
                        })}
                    </Section>

                </Schedule>
                <Calendar>
                    <DayPicker weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                        fromMonth={new Date()}
                        disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
                        modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5] } }}
                        onDayClick={handleDateChange}
                        onMonthChange={handleMonthChange}
                        selectedDays={selectedDate}
                        months={['Janeiro',
                            'Fevereiro',
                            'Março',
                            'Abril',
                            'Maio>',
                            'Junho',
                            'Julho',
                            'Agosto',
                            'Setembro',
                            'Outubro',
                            'Novembro',
                            'Dezembro',
                        ]} />
                </Calendar>
            </Content>
        </Container>
    )
}

export default AppointmentPage;