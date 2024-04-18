import { useEffect, useState } from "react";
import { useAuthenticatedUser } from "../hook/auth";
import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Td,
  Th,
  Tr,
  Container
} from '@chakra-ui/react'
import App from "../layout/appLayout";
import axios from "axios";

export default function () {

  const user = useAuthenticatedUser()
  const [bookings, setBookings] = useState([])

  const fetchBookings = async () => {
    const id = user._id
    const response = await axios.get(`/mybooking/${id}`)
    setBookings(response.data);
  }

  useEffect(() => {
    fetchBookings()
  },[])
  return <App>
    <Container maxW={'container.xl'} py={5}>
      <TableContainer bg="white" rounded="lg">
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Hotel</Th>
              <Th>City</Th>
              <Th>Price</Th>
              <Th>Duration</Th>
              <Th>Amount</Th>
              <Th>Booked at</Th>
            </Tr>
          </Thead>
          <Tbody>

            {
              bookings.length === 0 ?
                <Tr>
                  <Td colSpan="7" textAlign="center">No booking found</Td>
                </Tr>
                :
                bookings.map((booking, index) => {

                  const diff = new Date(booking.end) - new Date(booking.start)
                  const duration = Math.ceil(diff / (1000 * 60 * 60 * 24))
                  return <Tr key={booking._id}>
                    <Td>{index + 1}</Td>
                    <Td>{booking.hotel.hotelname}</Td>
                    <Td>{booking.hotel.city}</Td>
                    <Td>{booking.hotel.price}</Td>
                    <Td>{duration} days</Td>
                    <Td>${booking.amount}</Td>
                    <Td>{new Date(booking.createdAt).toDateString()}</Td>
                  </Tr>
                }
                )
            }
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  </App>
}
