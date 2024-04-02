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
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react';

import { FiPenTool, FiTrash } from 'react-icons/fi'
import SimplePagination from '../components/Pagination/simplePagination';
import FloatingButton from '../components/buttons/floatingButton';
import HotelModal from '../components/modal/hotelModal';
import axios from 'axios';


export default function () {

  const [hotels, setHotels] = useState([])
  const [hotel, setHotel] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const toast = useToast()
  const disclosure = useDisclosure()

  const openModelForAddingRecord = () => {
    disclosure.onOpen()
    setIsEditing(false)
    setHotel(null)

  }

  const openModelForEditingRecord = (hotel) => {
    disclosure.onOpen()
    setIsEditing(true)
    setHotel(hotel)

  }

  const addHotel = (hotel) => {
    setHotels([...hotels, hotel])
  }

  const editHotel = (hotel) => {
    const updatedHotels = hotels.map(old => {
      return hotel._id == old._id ? hotel : old
    })
    setHotels(updatedHotels)
  }

  const fetchHotels = async () => {
    const response =  await axios.get('/hotel')
    setHotels(response.data)
  }

  const deleteHotel = async (hotelID) => {
    console.log(hotelID);
    const filterHotels = hotels.filter(hotel => hotel._id !== hotelID)
    await axios.delete(`/hotel/${hotelID}`)
    setHotels(filterHotels)
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
                    <img src={hotel.photos[0] ? 'http://localhost:5000/'+hotel.photos[0] : 'placeholder.png'} />
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
                    <Button marginRight="1" bg="green" color="white" onClick={() => openModelForEditingRecord(hotel)}><FiPenTool /></Button>
                    <Button bg="red" color="white" onClick={() => deleteHotel(hotel._id)}><FiTrash /></Button>
                  </Td>
                </Tr>
              )
          }
        </Tbody>
      </Table>
    </TableContainer>
    <FloatingButton onClick={openModelForAddingRecord} colorScheme="lll" bg="primary" color="white" />
    <HotelModal
      disclosure={disclosure}
      isEditing={isEditing}
      hotel={hotel}
      addHotel={addHotel}
      editHotel={editHotel} />
    {/* <SimplePagination data={hotels}/> */}
  </>
}


function Image({ src }) {
  return <img src={src[0]} alt='hotel' width="50" />
}
