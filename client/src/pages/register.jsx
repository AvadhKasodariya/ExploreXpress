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

} from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import validateInput from '../validation'
import axios from 'axios'

export default function () {

    const initialState = {
        fname: '',
        lname: '',
        phone: '',
        email: '',
        password: '',
    }
    const [input, setInputs] = useState(initialState)
    const [error, setError] = useState(initialState)
    const [registerationError, setRegisterationError] = useState()
    const redirect = useNavigate()

    const handleChange = (eve) => {

        const { name, value } = eve.target
        setInputs(old => ({
            ...old,
            [name]: value
        }))
    }

    const handleSubmit = async (eve) => {
        eve.preventDefault()
        resetError()

        const fname = validateInput(input.fname, 'text')
        const lname = validateInput(input.lname, 'text')
        const phone = validateInput(input.phone, 'tel')
        const email = validateInput(input.email, 'email')
        const password = validateInput(input.password, 'password')


        if (fname !== true) {
            setError({ fname })
            return
        }

        if (lname !== true) {
            setError({ lname })
            return
        }

        if (phone !== true) {
            setError({ phone })
            return
        }

        if (email !== true) {
            setError({ email })
            return
        }

        if (password !== true) {
            setError({ password })
            return
        }

        try {
            const response = await axios.post('/auth/register', input)
            alert(response.data)
            redirect('/login')
        } catch (error) {
            setRegisterationError(error.response.data)
        }

    }



    const resetError = () => {
        setError(initialState)
    }


    return <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        <Stack spacing="8">
            {
                registerationError && <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{registerationError}</AlertDescription>
                </Alert>
            }
            <Stack spacing="6" alignItems={'center'}>
                <img src="/logo.png" alt="logo" width="75" />
                <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                    <Heading size={{ base: 'xs', md: 'sm' }}>Log in to your account</Heading>
                    <Text color="fg.muted">
                        Already have an account? <Link to="/login">Sign in</Link>
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

                            <FormControl mb="5" isInvalid={error.fname}>
                                <FormLabel>First name</FormLabel>
                                <Input name="fname" type='text' placeholder='Enter First name' value={input.fname} onChange={handleChange} />
                                <FormErrorMessage>{error.fname}</FormErrorMessage>
                            </FormControl>

                            <FormControl mb="5" isInvalid={error.lname}>
                                <FormLabel>Last name</FormLabel>
                                <Input name="lname" type='text' placeholder='Enter Last name' value={input.lname} onChange={handleChange} />
                                <FormErrorMessage>{error.lname}</FormErrorMessage>
                            </FormControl>

                            <FormControl mb="5" isInvalid={error.phone}>
                                <FormLabel>Phone</FormLabel>
                                <Input name="phone" type='tel' placeholder='Enter phone number' value={input.phone} onChange={handleChange} />
                                <FormErrorMessage>{error.phone}</FormErrorMessage>
                            </FormControl>

                            <FormControl mb="5" isInvalid={error.email}>
                                <FormLabel>Email</FormLabel>
                                <Input name="email" type='email' placeholder='Enter email address' value={input.email} onChange={handleChange} />
                                <FormErrorMessage>{error.email}</FormErrorMessage>
                            </FormControl>

                            <FormControl mb="5" isInvalid={error.password}>
                                <FormLabel>Password</FormLabel>
                                <Input name="password" type='password' placeholder='Enter password' value={input.password} onChange={handleChange} />
                                <FormErrorMessage>{error.password}</FormErrorMessage>
                            </FormControl>

                            <Button type='submit' colorScheme='green'>Register</Button>
                        </Stack>
                    </form>
                </Stack>
            </Box>
        </Stack>
    </Container>
}