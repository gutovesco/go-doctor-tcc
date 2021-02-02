import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
    Container,
    Content,
    ProviderContainer,
    Section,
    Calendar,
    Schedule,
    HourContainer,
    CreateAppointmentButton,
    CreateAppointmentButtonText,
    Title,
    ProviderContainerContent,
    ProviderImage,
    ProviderName,
    ProviderIconContainer,
    TimeOfDayTitle,
    HoursWrapper,
    HourText,
    CreateAppointmentWrapper
} from './styles'
import { FiChevronRight } from 'react-icons/fi';
import { useAuth } from '../../hooks/AuthContext';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import api from '../../services/api';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header/Header'
import avatar from '../../assets/avatar.png';

interface MonthAvailability {
    day: number;
    available: boolean;
}

interface AvailabilityItem {
    hour: number;
    available: boolean
}

export interface Provider {
    id: string;
    name: string;
    avatar_url: string;
    avatar: string;
}

const AppointmentPage: React.FC = () => {
    const { user } = useAuth()

    const [selectedDate, setSelectedDate] = useState(new Date())
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [monthAvailability, setMonthAvailability] = useState<MonthAvailability[]>([])
    const [providers, setProviders] = useState<Provider[]>([])
    const [availability, setAvailability] = useState<AvailabilityItem[]>([])
    const [selectedProvider, setSelectedProvider] = useState(user.id)
    const [selectedHour, setSelectedHour] = useState(0)
    const [selectedProviderInfo, setSelectedProviderInfo] = useState({})

    const history = useHistory()

    useEffect(() => {
        api.get('providers').then(response => {
            setProviders(response.data)
        })
    }, [])

    useEffect(() => {
        api.get(`providers/${selectedProvider}/day-availability`, {
            params: {
                year: selectedDate.getFullYear(),
                month: selectedDate.getMonth() + 1,
                day: selectedDate.getDate(),
            }
        }).then(response => {
            setAvailability(response.data)
        })
    }, [selectedDate, selectedProvider])

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

    const disabledDays = useMemo(() => {
        const dates = monthAvailability.filter(monthDay => monthDay.available === false)
            .map(monthDay => {
                const year = currentMonth.getFullYear();
                const month = currentMonth.getMonth();
                return new Date(year, month, monthDay.day)
            })
        return dates
    }, [currentMonth, monthAvailability])

    const morningAvailability = useMemo(() => {
        return availability.filter(({ hour }) => hour < 12).map(({ hour, available }) => {
            return {
                hour,
                available,
                hourFormatted: format(new Date().setHours(hour), 'HH:00')
            }
        })
    }, [availability])

    const afternoonAvailability = useMemo(() => {
        return availability.filter(({ hour }) => hour >= 12).map(({ hour, available }) => {
            return {
                hour,
                available,
                hourFormatted: format(new Date().setHours(hour), 'HH:00')
            }
        })
    }, [availability])

    return (
        <Container>
            <Header route="/" />
            <Content>
                <Schedule>
                    <Title>Médicos disponíveis</Title>
                    <Section>
                        {providers.map((item) => {
                            return (
                                <ProviderContainer
                                key={item.id}
                                    background={selectedProvider === item.id ? "#00d4ff" : "#fff"}
                                    onClick={() => {
                                        setSelectedProvider(item.id)
                                        setSelectedProviderInfo(item)
                                    }}>
                                    <ProviderContainerContent>
                                        <ProviderImage alt='' src={item.avatar === null ? avatar : item.avatar} />
                                        <ProviderName color={selectedProvider === item.id ? "#fff" : "#131313"}>{item.name}</ProviderName>
                                    </ProviderContainerContent>
                                    <ProviderIconContainer>
                                        <FiChevronRight color="#e7e7e7" size={30} />
                                    </ProviderIconContainer>

                                </ProviderContainer>
                            )
                        })}
                    </Section>
                </Schedule>

                <Section>
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
                                'Maio',
                                'Junho',
                                'Julho',
                                'Agosto',
                                'Setembro',
                                'Outubro',
                                'Novembro',
                                'Dezembro',
                            ]} />
                    </Calendar>
                    <TimeOfDayTitle>Manhã</TimeOfDayTitle>
                    <HoursWrapper>
                        {morningAvailability.map(({ hour, hourFormatted, available }) => (
                            <HourContainer background={selectedHour === hour && available ? "#00d4ff" : "#fff"} key={hourFormatted} onClick={() => available ? setSelectedHour(hour) : console.log('hora invalida')}>
                                <HourText color={selectedHour === hour && available ? "#fff" : "#131313"}>{hourFormatted}</HourText>
                            </HourContainer>
                        ))}
                    </HoursWrapper>

                    <TimeOfDayTitle>Tarde</TimeOfDayTitle>
                    <HoursWrapper>
                        {afternoonAvailability.map(({ hour, hourFormatted, available }) => (
                            <HourContainer background={selectedHour === hour && available ? "#00d4ff" : "#fff"} key={hourFormatted} onClick={() => available ? setSelectedHour(hour) : console.log('hora invalida')}>
                                <HourText color={selectedHour === hour && available ? "#fff" : "#131313"}>{hourFormatted}</HourText>
                            </HourContainer>
                        ))}
                    </HoursWrapper>

                    <CreateAppointmentWrapper>
                        <CreateAppointmentButton aria-label="confirmAppointment" onClick={() => {
                                history.push({
                                    pathname: '/appointment-info',
                                    state: { providerId: selectedProvider, selectedDate: selectedDate, selectedHour: selectedHour, item: selectedProviderInfo }
                                })
                            }}>
                            <CreateAppointmentButtonText>Marcar consulta</CreateAppointmentButtonText>
                        </CreateAppointmentButton>
                    </CreateAppointmentWrapper>
                </Section>
            </Content>
        </Container>
    )
}

export default AppointmentPage;