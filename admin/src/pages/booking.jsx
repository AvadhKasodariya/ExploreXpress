import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  useToast,
  HStack,
  Select
} from '@chakra-ui/react'
import axios from 'axios';
import { useEffect, useState } from 'react';

import { FiTrash } from 'react-icons/fi'




export default function () {

  const [hotels, sethotels] = useState([])
  const [month, setMonth] = useState('all')
  const toast = useToast()

  const handleChange = (eve) => {
    const month = eve.target.value
    setMonth(month)
    fetchhotels(month)
  }

  const fetchhotels = async (month='all') => {
    const response = await axios.get(`/booking?month=${month}`)
    sethotels(response.data)
  }

  const deleteBooking = async (hotelID) => {
    const filterhotels = hotels.filter(booking => booking._id !== hotelID)
    sethotels(filterhotels)
    const repsonse = await axios.delete(`/tour/hotel/${hotelID}`)
    toast({
      title: 'record deleted',
      status: 'success',
      duration: 1000,
      isClosable: true,
    })
  }

  useEffect(() => {
    fetchhotels()
  }, [])

  return <>
    <HStack align="end" mb="5" >
      <Select placeholder='All' width="max-content" bg="white" value={month} onChange={handleChange}>
        <option value='1'>January</option>
        <option value='2'>February</option>
        <option value='3'>March</option>
        <option value='4'>April</option>
        <option value='5'>May</option>
        <option value='6'>June</option>
        <option value='7'>July</option>
        <option value='8'>August</option>
        <option value='9'>September</option>
        <option value='10'>October</option>
        <option value='11'>November</option>
        <option value='12'>December</option>
      </Select>
    </HStack>
    <TableContainer bg="white" rounded="lg">
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Full name</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th>Duration</Th>
            <Th>Amount</Th>
            <Th>Booked at</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>

          {
            hotels.length === 0 ?
              <Tr>
                <Td colSpan="7" textAlign="center">No booking found</Td>
              </Tr>
              :
              hotels.map((booking, index) => {

                const diff = new Date(booking.end) - new Date(booking.start)
                const duration = Math.ceil(diff / (1000 * 60 * 60 * 24))
                return <Tr key={booking._id}>
                  <Td>{index + 1}</Td>
                  <Td>{booking.user.fname + ' ' + booking.user.lname}</Td>
                  <Td>{booking.user.email}</Td>
                  <Td>{booking.user.phone}</Td>
                  <Td>{duration} days</Td>
                  <Td>${booking.amount}</Td>
                  <Td>{new Date(booking.createdAt).toDateString()}</Td>
                  <Td>
                    <Button bg="red" color="white" onClick={() => deleteBooking(booking._id)}><FiTrash /></Button>
                  </Td>
                </Tr>
              }
              )
          }
        </Tbody>
      </Table>
    </TableContainer>
  </>
}


function Image({ src }) {
  return <img src={src[0]} alt='booking' width="50" />
}
