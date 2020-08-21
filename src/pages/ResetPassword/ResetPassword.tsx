import React, { useCallback, useRef} from 'react';
import {Form} from '@unform/web'
import { Container, Content, Background, AnimationContainer } from './styles';
import LogoImg from '../../assets/logo.png'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import {FiLogIn, FiLock} from 'react-icons/fi'
import {FormHandles} from '@unform/core'
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors'
import {useToast} from '../../hooks/Toast'
import {Link, useHistory, useLocation} from 'react-router-dom'
import api from '../../services/api';

interface ResetPasswordFormData{
    password: string;
    password_confirmation: string;
}

const ResetPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null)

    const {addToast} = useToast();
    const history = useHistory()
    const location = useLocation()

    const handleSubmit = useCallback(async (data: ResetPasswordFormData) => {
        try{
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                password: Yup.string().required('Senha obrigatória'),
                password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais')
            })

            await schema.validate(data, {
                abortEarly: false,
            })
            
            const token = location.search.replace('?token=', '')

            if(!token){
                throw new Error()
            }

            await api.post('/password/reset', {
                password: data.password,
                password_confirmation: data.password_confirmation,
                token
            })

            addToast({
                type: 'success',
                title: 'Senha resetada com sucesso',
                description: 'Sua senha foi resetada com sucesso!'
            });

            history.push('/')
        
        }catch(err){
            if(err instanceof Yup.ValidationError){
            const errors = getValidationErrors(err)

            formRef.current?.setErrors(errors)
            }
            
            addToast({
                type: 'info',
                title: 'Erro ao resetar a senha',
                description: 'Ocorreu um erro ao resetar sua senha, tente novamente!'
            });
        }
    }, [addToast, history, location.search])
    
    return(
    <>
    <div>
        <Container>
            <Content>
                <AnimationContainer>
                    <img style={{paddingTop: 50}} src={LogoImg} alt="logo"></img>

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1 style={{color: '#2BC4DA'}}>Resetar senha</h1>
                        <Input name="password" icon={FiLock} placeholder="Nova senha" type="password"></Input>
                        <Input name="password_confirmation" icon={FiLock} placeholder="Confirmação da senha" type="password"></Input>
                        <Button type="submit">Alterar senha</Button>

                    </Form>
                    <Link to="/"><FiLogIn/>Voltar para o login</Link>
                </AnimationContainer> 
            </Content>
            <Background></Background>
        </Container>
    </div>
    </>
  
)}

export default ResetPassword
