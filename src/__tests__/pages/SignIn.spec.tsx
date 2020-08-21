import React from 'react';
import SignIn from '../../pages/SingIn/SignIn';
import { render, fireEvent, wait } from '@testing-library/react';

const mockedHistoryPush = jest.fn()
const mockedSignIn = jest.fn()
const mockedToast = jest.fn()

jest.mock('react-router-dom', () => {
    return {
        useHistory: () => ({
            push: mockedHistoryPush
        }),
        Link: ({ children }: { children: React.ReactNode }) => children
    }
})

jest.mock('../../hooks/AuthContext', () => {
    return {
        useAuth: () => ({
            signIn: mockedSignIn
        })
    }
})

jest.mock('../../hooks/Toast', () => {
    return {
        useToast: () => ({
            addToast: mockedToast
        })
    }
})

describe('SignIn Page', () => {
    beforeEach(() => {
        mockedHistoryPush.mockClear();
    })
    it('should be able to sign in', async () => {

        const { getByPlaceholderText, getByText } = render(<SignIn />)

        const emailField = getByPlaceholderText('Email')
        const passwordField = getByPlaceholderText('Senha')
        const buttonElement = getByText('Entrar')

        fireEvent.change(emailField, { target: { value: 'johndoe@gmail.com' } })
        fireEvent.change(passwordField, { target: { value: '123456' } })

        fireEvent.click(buttonElement)

        await wait(() => {
            expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard')
        })
    })

    it('should not be able to sign in with invalid credentials', async () => {

        const { getByPlaceholderText, getByText } = render(<SignIn />)

        const emailField = getByPlaceholderText('Email')
        const passwordField = getByPlaceholderText('Senha')
        const buttonElement = getByText('Entrar')

        fireEvent.change(emailField, { target: { value: 'not-valid-email' } })
        fireEvent.change(passwordField, { target: { value: '123456' } })

        fireEvent.click(buttonElement)

        await wait(() => {
            expect(mockedHistoryPush).not.toHaveBeenCalled()
        })
    })

    it('should display error if sign in fails', async () => {

        mockedSignIn.mockImplementation(() => {
            throw new Error()
        })

        const { getByPlaceholderText, getByText } = render(<SignIn />)

        const emailField = getByPlaceholderText('Email')
        const passwordField = getByPlaceholderText('Senha')
        const buttonElement = getByText('Entrar')

        fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } })
        fireEvent.change(passwordField, { target: { value: '123456' } })

        fireEvent.click(buttonElement)

        await wait(() => {
            expect(mockedToast).toHaveBeenCalled()
        })
    })
})