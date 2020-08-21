/* eslint-disable no-restricted-globals */
import React, {InputHTMLAttributes, useEffect, useRef, useState, useCallback} from 'react'
import {Container, Error} from './styles'
import {IconBaseProps} from 'react-icons'
import {FiAlertCircle} from 'react-icons/fi'
import {useField} from '@unform/core'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    containerStyle?: object;
    icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({name, containerStyle, icon: Icon, ...rest}) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const {fieldName, error, registerField} = useField(name)
    const [isFocused, setIsFocused] = useState(false)
    const [isFiled, setIsFiled] = useState(false)

    const handleInputBlur = useCallback(() => {
        setIsFocused(false)

        if(inputRef.current?.value){
            setIsFiled(true)
        }else{
            setIsFiled(false)
        }
    }, []);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true)

    }, []);

    useEffect(() => {
        registerField({
            name:fieldName,
            ref: inputRef.current,
            path: 'value'
        })
    }, [fieldName, registerField])

    return (
    <Container style={containerStyle} isErrored={!!error} isFiled={isFiled} isFocused={isFocused} data-testid="input-container">
        { Icon && <Icon size={20}/>}
        <input onFocus={handleInputFocus} onBlur={handleInputBlur} ref={inputRef} {...rest}></input>

        {error && 
        <Error title={error}>
            <FiAlertCircle color="#c53030" size={20}/>
        </Error>}
    </Container>
    )
}

export default Input