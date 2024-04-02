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
} from '@chakra-ui/react'
import axios from 'axios';
import { useEffect, useState } from 'react';

import { FiTrash } from 'react-icons/fi'




export default function () {

  const [bookings, setBookings] = useState([])
  const toast = useToast()

  const fetchBookings = async () => {
    const response = await axios.get('/booking')
    setBookings(response.data)
  }

  const deleteBooking = async (bookingID) => {
    const filterBookings = bookings.filter(booking => booking._id !== bookingID)
    setBookings(filterBookings)
    const repsonse = await axios.delete(`/booking/${bookingID}`)
    toast({
      title: 'record deleted',
      status: 'success',
      duration: 1000,
      isClosable: true,
    })
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  return <>
    <TableContainer bg="white" rounded="lg">
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>S#</Th>
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
            bookings.length === 0 ?
              <Tr>
                <Td colSpan="7" textAlign="center">No booking found</Td>
              </Tr>
              :
              bookings.map((booking, index) =>{

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
