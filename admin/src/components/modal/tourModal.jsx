import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    FormControl,
    FormLabel,
    useToast,
    FormErrorMessage,
    Select
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import validate from '../../validation'
import axios from 'axios'
export default function ({ tour, disclosure, isEditing, editTour, addTour }) {

    const fields = [
        { name: 'name', type: 'text', required: true },
        // { name: 'price', type: 'number', attributes: { min: 1 }, required: true },
        { name: 'description', type: 'text', required: false },
        // { name: 'duration', type: 'number', attributes: { min: 1 }, required: true },
    ]
    const initialState = {
        name: '',
        price: 1,
        description: '',
        duration: 1,
        hotel: {}
    }
    const [hotels, setHotels] = useState([])
    const [inputs, setInputs] = useState(initialState)
    const [errors, setErrors] = useState(null)
    const { isOpen, onClose } = disclosure
    const toast = useToast()

    const fetchHotels = async () => {
        const response = await axios.get('/hotel')
        setHotels(response.data)
    }
    const handleChange = (eve) => {
        let { name, value } = eve.target
        setInputs(old => ({
            ...old,
            [name]: value
        }))
    }
    const handleSubmit = async (eve) => {

        eve.preventDefault()
        resetErrors()
        let error = false

        for (const field of fields) {

            if (field.required || (field.required === false && inputs[field.name] !== '')) {
                const hasError = validate(inputs[field.name], field.type);
                if (hasError !== true) {
                    setErrors(old => ({ ...old, [field.name]: hasError }));
                    error = true
                }
            }

        }

        if (error) return

        if (isEditing) {
            const form = new FormData(eve.target)
            const response= await axios.post(`/tour/${tour._id}`, urlencoded(form))
            editTour(response.data)
        } else {
            const form = new FormData(eve.target)
            urlencoded(form)
            const response = await axios.post('/tour', urlencoded(form));
            console.log(response.data);
            addTour(response.data)
        }

        toast({
            title: isEditing ? 'record updated' : 'record added',
            status: 'success',
            duration: 1000,
            isClosable: true,
        })

        onClose()

    }
    const resetInputs = () => {
        setInputs(initialState)
    }
    const resetErrors = () => {
        setErrors(null)
    }

    useEffect(() => {
        fetchHotels()
        resetErrors()
        if (tour) {
            setInputs(tour)
        } else {
            resetInputs()
        }
    }, [tour])

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                scrollBehavior={'inside'}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{isEditing ? 'Update record' : 'Create record'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <form id='tour__form' onSubmit={handleSubmit}>
                            {
                                fields.map((field, index) =>
                                    <FormControl key={index} mb="2" isInvalid={errors?.[field.name]}>
                                        <FormLabel textTransform="capitalize">{field.name}</FormLabel>
                                        <Input type={field.type} name={field.name} placeholder={`Enter ${field.name}`} value={inputs[field.name]} onChange={handleChange} {...field.attributes} />
                                        <FormErrorMessage>{errors?.[field.name]}</FormErrorMessage>
                                    </FormControl>
                                )
                            }
                            <FormControl mb="2">
                                <FormLabel textTransform="capitalize">Hotel</FormLabel>
                                <Select multiple height={100} value={inputs.hotel._id} name='hotel' required onChange={handleChange}>
                                    {
                                        hotels.map(hotel => <option key={hotel._id} value={hotel._id}>{hotel.title}</option>)
                                    }
                                </Select>
                            </FormControl>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button form='tour__form' type='submit' colorScheme='blue' mr={3}>Save</Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}


function urlencoded(formData) {
    let encodedString = ""
    for (const entry of formData.entries()) {
        encodedString += encodeURIComponent(entry[0]) + '=' + encodeURIComponent(entry[1]) + '&'
    }

    // removing last &
    return encodedString.slice(0, -1)
}