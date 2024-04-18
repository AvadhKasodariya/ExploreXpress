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
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { FiTrash } from 'react-icons/fi'
import axios from 'axios';


export default function () {

  const { id } = useParams()
  const [tour, setTour] = useState({})
  const [hotels, setHotels] = useState([])
  const toast = useToast()

  const fetchHotels = async () => {
    const response = await axios.get(`tour/${id}`)
    setTour(response.data)
    setHotels(response.data.hotel)
  }

  const deleteHotel = async (hotelID) => {
    const filteredHotel = hotels.filter(hotel => hotel._id !== hotelID)
    setHotels(filteredHotel);
    await axios.delete(`/tour/${tour._id}/${hotelID}`)
    toast({
      title: 'record deleted',
      status: 'success',
      duration: 1000,
      isClosable: true,
    })
  }


  useEffect(() => {
    fetchHotels()
  }, [])

  return <>
    <TableContainer bg="white" rounded="lg">
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Image</Th>
            <Th>Title</Th>
            <Th>City</Th>
            <Th>Address</Th>
            <Th>Distance</Th>
            <Th>Description</Th>
            <Th>Price</Th>
            <Th>Max group size</Th>
            <Th>Reviews</Th>
            <Th>Type</Th>
            <Th>Rating</Th>
            <Th>Rooms</Th>
            <Th>Cheapest price</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>

          {
            hotels.length === 0 ?
              <Tr>
                <Td colSpan="12" textAlign="center">No hotel found</Td>
              </Tr>
              :
              hotels.map((hotel, index) =>
                <Tr key={hotel._id}>
                  <Td>{index + 1}</Td>
                  <Td>
                    <img src={hotel.photos[0] ? 'http://localhost:5000/' + hotel.photos[0] : '/placeholder.png'} />
                  </Td>
                  <Td>{hotel.title}</Td>
                  <Td>{hotel.city}</Td>
                  <Td>{hotel.address}</Td>
                  <Td>{hotel.distance}</Td>
                  <Td>{hotel.description || '-'}</Td>
                  <Td>{hotel.price}</Td>
                  <Td>{hotel.maxGroupSize}</Td>
                  <Td>{hotel.reviews || '-'}</Td>
                  <Td>{hotel.type}</Td>
                  <Td>{hotel.rating}</Td>
                  <Td>{hotel.rooms}</Td>
                  <Td>{hotel.cheapestprice}</Td>
                  <Td>
                    <Button bg="red" color="white" onClick={() => deleteHotel(hotel._id)}><FiTrash /></Button>
                  </Td>
                </Tr>
              )
          }
        </Tbody>
      </Table>
    </TableContainer>
  </>
}


