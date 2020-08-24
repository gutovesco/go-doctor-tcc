import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Container, Header, HeaderContent, Profile, Content, NextAppointment, Appointment, Section, Calendar, Schedule } from './styles'
import logoImg from '../../assets/logo.png'
import { FiPower, FiClock } from 'react-icons/fi';
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

const Dashboard: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [monthAvailability, setMonthAvailability] = useState<MonthAvailability[]>([])
    const [appointments, setAppointments] = useState<Appointment[]>([])

    const { signOut, user } = useAuth()

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
                    <img style={{width: 100, height: 100}} src={logoImg} alt="logo"></img>

                    <Profile>
                        <img src={user.avatar_url !== undefined ? user.avatar_url : logoImg} alt=''></img>
                        <div>
                            <span style={{color: '#131313'}}>Bem-vindo</span>
                            <Link to="/profile"><strong style={{color:'#2BC4DA'}}>{user.name}</strong></Link>
                        </div>
                    </Profile>
                    <button type="button" onClick={signOut}>
                        <FiPower />
                    </button>
                </HeaderContent>
            </Header>

            <Content>
                <Schedule>
                    <h1 style={{color: '#131313'}}>Horários Agendados</h1>
                    <p>
                        {isToday(selectedDate) && <span>Hoje</span>}
                        <span>{selectedDateAsText}</span>
                        <span>{selectedWeekDay}</span>
                    </p>

                    {isToday(selectedDate) && nextAppointment && (
                        <NextAppointment>
                        <strong>Agendamento a seguir</strong>
                        <div>
                            <img src={nextAppointment.user.avatar_url} alt={nextAppointment.user.name}></img>
                            <strong>{nextAppointment.user.name}</strong>
                            <span>
                                <FiClock />
                                {nextAppointment.hourFormatted}
                            </span>
                        </div>
                    </NextAppointment>
                    )}

                    <Section>
                        <strong>Manhã</strong>

                        {morningAppointments.length === 0 && (
                            <p>Nenhum agendamento neste período</p>
                        )}

                        {morningAppointments.map(appointment => (
                            <Appointment key={appointment.id}>
                            <span>
                                <FiClock />
                                {appointment.hourFormatted}
                            </span>
                            <div>
                                <img src={appointment.user.avatar_url === null ? 'https://i0.wp.com/www.mvhsoracle.com/wp-content/uploads/2018/08/default-avatar.jpg?ssl=1' : appointment.user.avatar_url} alt={appointment.user.name}></img>
                                <strong>{appointment.user.name}</strong>
                            </div>
                        </Appointment>
                        ))}
                    </Section>

                    <Section>
                        <strong>Tarde</strong>

                        {morningAppointments.length === 0 && (
                            <p>Nenhum agendamento neste período</p>
                        )}

                        {afternoonAppointments.map(appointment => (
                            <Appointment key={appointment.id}>
                            <span>
                                <FiClock />
                                {appointment.hourFormatted}
                            </span>
                            <div>
                                <img src={appointment.user.avatar_url === null ? 'https://i0.wp.com/www.mvhsoracle.com/wp-content/uploads/2018/08/default-avatar.jpg?ssl=1' : appointment.user.avatar_url} alt={appointment.user.name}></img>
                                <strong>{appointment.user.name}</strong>
                            </div>
                        </Appointment>
                        ))}
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

export default Dashboard;