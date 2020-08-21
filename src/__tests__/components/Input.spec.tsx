import React from 'react'

import Input from '../../components/Input/Input'
import { render, fireEvent } from '@testing-library/react'

jest.mock('@unform/core', () => {
    return {
        useField() {
            return {
                fieldName: 'email',
                defaultValue: '',
                error: '',
                registerField: jest.fn()
            }
        }
    }
})

describe('Input Component', () => {
    it('should be able to render an input', () => {
        const {getByPlaceholderText} = render(
            <Input name="email" placeholder="Email"/>
        )

        expect(getByPlaceholderText('Email')).toBeTruthy()
    })

    it('should render highlight on input focus', async () => {
        const {getByPlaceholderText} = render(
            <Input name="email" placeholder="Email"/>
        )

        const inputElement = getByPlaceholderText('Email')

        fireEvent.focus(inputElement);

    })
})