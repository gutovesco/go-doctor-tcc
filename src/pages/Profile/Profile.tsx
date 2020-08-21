import React, { useCallback, useRef, ChangeEvent } from 'react';

import { Container, Content, AvatarInput } from './styles';
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { FiMail, FiUser, FiLock, FiCamera, FiArrowLeft } from 'react-icons/fi'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { FormHandles } from '@unform/core'
import getValidationErrors from '../../utils/getValidationErrors'
import { useHistory, Link } from 'react-router-dom'
import { useToast } from '../../hooks/Toast'
import api from '../../services/api'
import { useAuth } from '../../hooks/AuthContext';

interface ProfileData {
    name: string;
    email: string;
    password: string;
    old_password: string;
    password_confirmation: string;
}

const Profile: React.FC = () => {
    const formRef = useRef<FormHandles>(null)

    const { addToast } = useToast();
    const history = useHistory()
    const { user, updateUser } = useAuth()

    const handleSubmit = useCallback(async (data: ProfileData) => {
        try {
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                old_password: Yup.string(),
                password: Yup.string().when('old_password', {
                    is: val => !!val.length,
                    then: Yup.string().required('Campo obrigatório'),
                    otherwise: Yup.string()
                }),
                password_confirmation: Yup.string().when('old_password', {
                    is: val => !!val.length,
                    then: Yup.string().required('Campo obrigatório'),
                    otherwise: Yup.string()
                }).oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais')
            })

            await schema.validate(data, {
                abortEarly: false,
            })

            const formData = Object.assign({
                name: data.name,
                email: data.email,
            }, data.old_password ? {
                old_password: data.old_password,
                password: data.password,
                password_confirmation: data.password_confirmation,
            }: {})

            const response = await api.put('/profile', formData)
            updateUser(response.data)
            history.push('/dashboard')

            addToast({
                type: 'success',
                title: 'Perfil atualizado!',
                description: 'O seu perfil foi atualizado com sucesso!'
            });

        } catch (err) {
            const errors = getValidationErrors(err)

            formRef.current?.setErrors(errors)

            addToast({
                type: 'info',
                title: 'Erro na atualização',
                description: 'Ocorreu um erro ao atualizar o seu perfil, tente novamente!'
            })
        }
    }, [addToast, history, updateUser])

    const handleAvatarChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const data = new FormData()

            data.append('avatar', e.target.files[0])

            api.patch('/users/avatar', data).then((response) => {
                updateUser(response.data)

                addToast({
                    type: 'success',
                    title: 'Avatar atualizado',
                    description: 'Seu avatar foi atualizado com sucesso!'
                })
            })
        }

    }, [addToast, updateUser])

    return (
        <Container>
            <header>
                <div>
                    <Link to="/dashboard"><FiArrowLeft></FiArrowLeft></Link>
                </div>
            </header>
            <Content>

                <Form ref={formRef} initialData={{
                    name: user.name,
                    email: user.email,
                }} onSubmit={handleSubmit} >

                    <AvatarInput>
                        <img src={user.avatar_url} alt={user.name}></img>
                        <label htmlFor="avatar">
                            <FiCamera />
                            <input type="file" id="avatar" onChange={handleAvatarChange}></input>
                        </label>

                    </AvatarInput>

                    <h1>Meu perfil</h1>

                    <Input name="name" icon={FiUser} placeholder="Nome"></Input>
                    <Input name="email" icon={FiMail} placeholder="Email"></Input>
                    <Input containerStyle={{ marginTop: 24 }} name="old_password" icon={FiLock} placeholder="Senha atual" type="password"></Input>
                    <Input name="password" icon={FiLock} placeholder="Nova senha" type="password"></Input>
                    <Input name="password_confirmation" icon={FiLock} placeholder="Confirmar senha" type="password"></Input>
                    <Button type="submit">Confirmar mudanças</Button>
                </Form>
            </Content>
        </Container>
    )
}

export default Profile
