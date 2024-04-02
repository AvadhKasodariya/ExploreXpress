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
    FormErrorMessage
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import validate from '../../validation'
import axios from 'axios'
export default function ({ hotel, disclosure, isEditing, editHotel, addHotel }) {

    const fields = [
        { name: 'title', type: 'text', required: true },
        { name: 'photos', type: 'file', attributes: { multiple: true }, required: false },
        { name: 'address', type: 'text', required: true },
        { name: 'city', type: 'text', required: true },
        { name: 'distance', type: 'text', required: true },
        { name: 'description', type: 'text', required: false },
        { name: 'price', type: 'number', attributes: { min: 0 }, required: true },
        { name: 'maxGroupSize', type: 'number', attributes: { min: 0 }, required: true },
        { name: 'hotelname', type: 'text', required: true },
        { name: 'type', type: 'text', required: true },
        { name: 'rooms', type: 'number', required: true, attributes: { min: 1 } },
        { name: 'cheapestprice', type: 'number', attributes: { min: 0 }, required: true },
        { name: 'rating', type: 'number', attributes: { min: 0, max: 5, step: 0.1 }, required: false },
    ]
    const initialState = {
        title: '',
        photos: '',
        address: '',
        city: '',
        distance: '',
        hotelname: '',
        description: '',
        price: 0,
        maxGroupSize: 1,
        type: 'basic',
        rating: 0,
        rooms: 1,
        cheapestprice: 1
    }
    const [inputs, setInputs] = useState(initialState)
    const [errors, setErrors] = useState(null)
    const { isOpen, onClose } = disclosure
    const toast = useToast()

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
            const {data} = await axios.post(`/hotel/${hotel._id}`, form)
            data.photos.map(v=>`http://localhost:5000/${v}`)
            editHotel(data)
        } else {
            const form = new FormData(eve.target)
            const response = await axios.post('/hotel', form)
            addHotel(response.data)
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
        resetErrors()
        if (hotel) {
            setInputs({ ...hotel, photos: '' })
        } else {
            resetInputs()
        }
    }, [hotel])

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

                        <form id='hotel__form' onSubmit={handleSubmit}>
                            {
                                fields.map((field, index) =>
                                    <FormControl key={index} mb="2" isInvalid={errors?.[field.name]}>
                                        <FormLabel textTransform="capitalize">{field.name}</FormLabel>
                                        <Input type={field.type} name={field.name} placeholder={`Enter ${field.name}`} value={inputs[field.name]} onChange={handleChange} {...field.attributes} />
                                        <FormErrorMessage>{errors?.[field.name]}</FormErrorMessage>
                                    </FormControl>
                                )
                            }
                        </form>

                    </ModalBody>

                    <ModalFooter>
                        <Button form='hotel__form' type='submit' colorScheme='blue' mr={3}>Save</Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}