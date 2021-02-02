import React from 'react'
import { Header as MainHeader, HeaderContent, Profile } from './styles'
import logoImg2 from '../../assets/logo4.png';
import avatar from '../../assets/avatar.png';
import { FiPower, FiChevronLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';

const Header = (props: any) => {
    const { signOut, user } = useAuth()
    return (
        <MainHeader>
            <HeaderContent>
                {props.route !== "dashboard" &&
                    <Link aria-label="icon-left" to={props.route}>
                        <FiChevronLeft color="#131313" size={30} />
                    </Link>}

                <Link aria-label="logo" to="/">
                    <img width={150} height={150} style={{ marginLeft: 20 }} src={logoImg2} alt="logo"></img>
                </Link>

                <Profile>
                    <img width={63} height={63} src={user.avatar_url !== undefined && user.avatar_url !== null ? user.avatar_url : avatar} alt=''></img>
                    <div>
                        <span style={{ color: '#131313' }}>Bem-vindo</span>
                        <Link aria-label="profile" to="/profile"><strong style={{ color: '#2BC4DA' }}>{user.name}</strong></Link>
                    </div>
                </Profile>

                <Link aria-label="appointments" style={{textDecoration: 'none', marginLeft: 'auto'}} to="/appointments">
                    <strong>Agendamentos</strong>
                </Link>

                <button aria-label="logout" type="button" onClick={signOut}>
                    <FiPower />
                </button>
            </HeaderContent>
        </MainHeader>
    )
}

export default Header;