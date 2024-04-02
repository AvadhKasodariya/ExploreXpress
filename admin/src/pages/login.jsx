import {
    Container,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
    VStack,
    HStack,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import validateInput from '../validation'
import { useLogin } from '../hook/auth'


export default function () {

    const [input, setInputs] = useState({ email: '', password: '' })
    const [error, setError] = useState({ email: '', password: '' })

    const { login, error: loginError } = useLogin()

    const handleChange = (eve) => {

        const { name, value } = eve.target
        setInputs(old => ({
            ...old,
            [name]: value
        }))
    }

    const handleSubmit = (eve) => {
        eve.preventDefault()
        resetError()

        const email = validateInput(input.email, 'email')
        const password = validateInput(input.password, 'password')


        if (email !== true) {
            setError({ email })
            return
        }

        if (password !== true) {
            setError({ password })
            return
        }

        login(input.email, input.password)
    }

    const resetError = () => {
        setError({ email: '', password: '' })
    }


    return <>
        <Container>
            <VStack height="100vh" alignItems="stretch" justifyContent="center">
                <HStack justifyContent="center">
                    <img className="logo" src='/logo.png' width="100" />
                </HStack>
                {
                    loginError && <Alert status='error'>
                        <AlertIcon />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{loginError}</AlertDescription>
                    </Alert>
                }
                <form onSubmit={handleSubmit} noValidate>
                    <FormControl mb="5" isInvalid={error.email}>
                        <FormLabel>Email</FormLabel>
                        <Input name="email" type='email' placeholder='Enter email' value={input.email} onChange={handleChange} />
                        <FormErrorMessage>{error.email}</FormErrorMessage>
                    </FormControl>

                    <FormControl mb="5" isInvalid={error.password}>
                        <FormLabel>Password</FormLabel>
                        <Input name="password" type='password' placeholder='Enter password' value={input.password} onChange={handleChange} />
                        <FormErrorMessage>{error.password}</FormErrorMessage>
                    </FormControl>

                    <Button type='submit'>Login</Button>
                </form>
            </VStack>
        </Container>
    </>
}
