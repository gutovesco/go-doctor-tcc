import React, {useCallback, useRef} from 'react';

import { Container, Content, Background, AnimationContainer } from './styles';
import LogoImg from '../../assets/logo.png'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import {FiArrowLeft, FiMail, FiUser, FiLock} from 'react-icons/fi'
import {Form} from '@unform/web'
import * as Yup from 'yup'
import {FormHandles} from '@unform/core'
import getValidationErrors from '../../utils/getValidationErrors'
import {Link, useHistory} from 'react-router-dom'
import {useToast} from '../../hooks/Toast'
import api from '../../services/api'

interface SignUpData{
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null)

    const {addToast} = useToast();
    const history = useHistory()

    const handleSubmit = useCallback(async (data: SignUpData) => {
        try{
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'No mínimo 6 digitos')
            })

            await schema.validate(data, {
                abortEarly: false,
            })

            await api.post('/users', data)
            history.push('/')

            addToast({
                type: 'success',
                title: 'Sucesso!',
                description: 'O usuário foi cadastrado com sucesso'
            });

        }catch(err){
            const errors = getValidationErrors(err)

            formRef.current?.setErrors(errors)
            
            addToast({
                type: 'info',
                title: 'Erro no cadastro',
                description: 'Ocorreu um erro ao fazer o cadastro, tente novamente'
            })
        }
    }, [addToast, history])
    
    return (
        <Container>
        <Background/>
            <Content>
            <AnimationContainer>
                <img src={LogoImg} alt="logo"></img>

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1 style={{color: '#2BC4DA'}}>Faça seu Cadastro</h1>
                    <Input name="name" icon={FiUser} placeholder="Nome"></Input>
                    <Input name="email" icon={FiMail} placeholder="Email"></Input>
                    <Input name="password" icon={FiLock} placeholder="Senha" type="password"></Input>
                    <Button type="submit">Cadastrar</Button>
                </Form>

                <Link to="/"><FiArrowLeft/>Voltar para logon</Link>
                </AnimationContainer>
            </Content>
        </Container>
    )
}

export default SignUp
