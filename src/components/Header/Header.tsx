import React from 'react'
import { Header as MainHeader, HeaderContent, Profile } from './styles'
import logoImg from '../../assets/logo.png';
import logoImg2 from '../../assets/logo4.png';
import { FiPower, FiChevronLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';

const Header = (props: any) => {
    const { signOut, user } = useAuth()
    return (
        <MainHeader>
                <HeaderContent>
                    <Link to={props.route}>
                        <FiChevronLeft color="#131313" size={30} />
                    </Link>

                    <Link to="/">
                        <img style={{ width: 150, height: 150, marginLeft: 20 }} src={logoImg2} alt="logo"></img>
                    </Link>

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
            </MainHeader>
    )
}

export default Header;