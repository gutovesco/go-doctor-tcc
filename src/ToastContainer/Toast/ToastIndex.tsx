import React, {useEffect} from 'react';
import {Container} from './styles';
import {FiAlertCircle, FiXCircle, FiCheckCircle, FiInfo} from 'react-icons/fi';
import {ToastMessage, useToast} from '../../hooks/Toast';

interface ToastProps{
    message: ToastMessage;
    style: object;
}

const icons = {
    info: <FiInfo size={22}></FiInfo>,
    success: <FiCheckCircle size={22}></FiCheckCircle>,
    error: <FiAlertCircle size={22}></FiAlertCircle>
}

const Toast: React.FC<ToastProps> = ({message, style}) => {
    const {removeToast} = useToast();

    useEffect(() => {
        const timer = setTimeout(() => {
            removeToast(message.id)
        }, 3000)

        return () => {
            clearTimeout(timer)
        }
    }, [removeToast, message.id])

    return (
        <Container style={style} type={message.type}>
                {icons[message.type || 'info']}
                <div>
                     <strong>{message.title}</strong>
                     <p>{message.description}</p>   
                 </div> 
 
                 <button onClick={() => removeToast(message.id)} type="button"><FiXCircle size={18}></FiXCircle></button>
        </Container>
    )
}

export default Toast;