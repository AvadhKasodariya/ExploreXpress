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

import FloatingButton from '../components/buttons/floatingButton';
import TourModel from '../components/modal/tourModal';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function () {

  const [tours, setTours] = useState([])
  const [tour, setTour] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const toast = useToast()
  const disclosure = useDisclosure()

  const openModelForAddingRecord = () => {
    disclosure.onOpen()
    setIsEditing(false)
    setTour(null)

  }

  const openModelForEditingRecord = (tour) => {
    disclosure.onOpen()
    setIsEditing(true)
    setTour(tour)

  }

  const addTour = (tour) => {
    setTours([...tours, tour])
  }

  const editTour = (tour) => {
    const updatedTours = tours.map(old => {
      return tour._id == old._id ? tour : old
    })
    setTours(updatedTours)
  }

  const fetchTours = async () => {
    const response =  await axios.get('/tour')
    setTours(response.data)
  }

  const deleteTour = async (tourID) => {
    const filterTours = tours.filter(tour => tour._id !== tourID)
    console.log(filterTours);
    await axios.delete(`/tour/${tourID}`)
    setTours(filterTours)
    toast({
      title: 'record deleted',
      status: 'success',
      duration: 1000,
      isClosable: true,
    })
  }


  useEffect(() => {
    fetchTours()
  }, [])

  return <>
    <TableContainer bg="white" rounded="lg">
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Name</Th>
            {/* <Th>Price</Th> */}
            <Th>Description</Th>
            {/* <Th>Duration</Th> */}
            <Th>Hotels</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>

          {
            tours.length === 0 ?
              <Tr>
                <Td colSpan="12" textAlign="center">No hotel found</Td>
              </Tr>
              :
              tours.map((tour, index) =>
                <Tr key={tour._id}>
                  <Td>{index + 1}</Td>
                  <Td>{tour.name}</Td>
                  {/* <Td>{tour.price}</Td> */}
                  <Td>{tour.description || '-'}</Td>
                  {/* <Td>{tour.duration} day</Td> */}
                  <Td>
                    <Button as={Link} to={tour._id} colorScheme='yellow'>View</Button>
                  </Td>
                  <Td>
                    <Button marginRight="1" bg="green" color="white" onClick={() => openModelForEditingRecord(tour)}><FiPenTool /></Button>
                    <Button bg="red" color="white" onClick={() => deleteTour(tour._id)}><FiTrash /></Button>
                  </Td>
                </Tr>
              )
          }
        </Tbody>
      </Table>
    </TableContainer>
    <FloatingButton onClick={openModelForAddingRecord} colorScheme="lll" bg="primary" color="white" />
    <TourModel
      disclosure={disclosure}
      isEditing={isEditing}
      tour={tour}
      addTour={addTour}
      editTour={editTour} />
  </>
}

