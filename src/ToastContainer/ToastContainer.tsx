import React from 'react';
import {Container} from './styles';
import Toast from './Toast/ToastIndex';
import {ToastMessage} from '../hooks/Toast';
import {useTransition} from 'react-spring'

interface ToastContainerProps{
    messages: ToastMessage[]
}

const ToastContainer: React.FC<ToastContainerProps> = ({messages}) => {
    const messagesWithTransittions = useTransition(messages, message => message.id, 
        {
            from: {right: '-120%'},
            enter: {right: '0%'},
            leave: {right: '-120%'}
        })

    return (
        <Container>
            {messagesWithTransittions.map(({item, key, props}) => (
                <Toast key={key} style={props} message={item}>
             </Toast>
            ))}
        </Container>
    )
}

export default ToastContainer