import React, { useCallback, useRef, useState} from 'react';
import {Form} from '@unform/web';
import { Container, Content, Background, AnimationContainer } from './styles';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import {FiLogIn, FiMail} from 'react-icons/fi';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import {useToast} from '../../hooks/Toast';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';
import logo from '../../assets/logo.png';

interface ForgotPasswordFormData{
    email: string;
    password: string;
}

const ForgotPassword: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const formRef = useRef<FormHandles>(null)

    const {addToast} = useToast();
    const history = useHistory()

    const handleSubmit = useCallback(async (data: ForgotPasswordFormData) => {
        try{
            setLoading(true)
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
            })

            await schema.validate(data, {
                abortEarly: false,
            })

           await api.post('/password/forgot', {
               email: data.email
           })

           addToast({
               type: 'success',
               title: 'Email de recuperação enviado',
               description: 'Foi enviado um e-mail para você recuperar sua senha, cheque sua caixa de entrada'
           })

           history.push('/reset-password')
        
        }catch(err){
            if(err instanceof Yup.ValidationError){
            const errors = getValidationErrors(err)

            formRef.current?.setErrors(errors)
            }
            
            addToast({
                type: 'info',
                title: 'Erro na autenticação',
                description: 'Ocorreu um erro ao fazer login, verifique as credenciais'
            });
        } finally {
            setLoading(false)
            }
    }, [addToast, history])
    
    return(
    <>
    <div>
        <Container>
            <Content>
                <AnimationContainer>
                <img style={{paddingTop: 50}} src={logo} alt="logo"></img>

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1 style={{color: '#2BC4DA'}}>Recupere sua senha</h1>
                        <Input name="email" icon={FiMail} placeholder="Email"></Input>
                        <Button loading={loading} type="submit">Recuperar senha</Button>
                    </Form>
                    <Link to="/"><FiLogIn/>Voltar</Link>
                </AnimationContainer> 
            </Content>
            <Background></Background>
        </Container>
    </div>
    </>
  
)}

export default ForgotPassword
