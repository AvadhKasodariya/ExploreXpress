import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Heading,
    Input,
    Stack,
    Text,
    Alert,
    AlertIcon,
    AlertDescription,
    AlertTitle,
    CloseButton

} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useSession } from '../hook/session'
import { useLogin } from '../hook/auth'
import { useEffect, useState } from 'react'
import validateInput from '../validation'

export default function () {

    const { sessionHasMessage, flushSession } = useSession()
    const { login, error: loginError } = useLogin()
    const [warning, showWarning] = useState(true)
    const [input, setInputs] = useState({ email: '', password: '' })
    const [error, setError] = useState({ email: '', password: '' })


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

    const handleClose = () => {
        flushSession()
        showWarning(false)
    }

    const resetError = () => {
        setError({ email: '', password: '' })
    }


    return <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        <Stack spacing="8">
            {
                sessionHasMessage('unauthorized')
                &&
                warning
                &&
                <Alert status='warning'>
                    <AlertIcon />
                    <AlertDescription>Please login to continue</AlertDescription>
                    <CloseButton
                        alignSelf='flex-end'
                        marginStart='auto'
                        onClick={handleClose}
                    />
                </Alert>
            }
            {
                loginError && <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{loginError}</AlertDescription>
                </Alert>
            }
            <Stack spacing="6" alignItems={'center'}>
                <img src="/logo.png" alt="logo" width="75" />
                <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                    <Heading size={{ base: 'xs', md: 'sm' }}>Log in to your account</Heading>
                    <Text color="fg.muted">
                        Don't have an account? <Link to="/register">Sign up</Link>
                    </Text>
                </Stack>
            </Stack>
            <Box
                py={{ base: '0', sm: '8' }}
                px={{ base: '4', sm: '10' }}
                bg={{ base: 'transparent', sm: 'bg.surface' }}
                boxShadow={{ base: 'none', sm: 'md' }}
                borderRadius={{ base: 'none', sm: 'xl' }}
            >
                <Stack spacing="6">

                    <form onSubmit={handleSubmit}>
                        <Stack spacing="5">
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

                            <Button type='submit' colorScheme='green'>Login</Button>
                        </Stack>
                    </form>
                </Stack>
            </Box>
        </Stack>
    </Container>
}