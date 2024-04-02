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

  const [users, setUsers] = useState([])
  const toast = useToast()

  const fetchUsers = async () => {

    const response = await axios.get('/user')
    setUsers(response.data)
  }

  const deleteUser = async (userID) => {
    const filterusers = users.filter(user => user._id !== userID)
    await axios.delete(`/user/${userID}`)
    setUsers(filterusers)
    toast({
      title: 'User deleted',
      status: 'success',
      duration: 1000,
      isClosable: true,
    })
  }

  useEffect(() => {
    fetchUsers()
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
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>

          {
            users.length === 0 ?
              <Tr>
                <Td colSpan="5" textAlign="center">No user found</Td>
              </Tr>
              :

              users.map((user, index) =>
                <Tr key={user._id}>
                  <Td>{index + 1}</Td>
                  <Td>{user.fname + ' ' + user.lname}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.phone}</Td>
                  <Td>
                    <Button bg="red" color="white" onClick={() => deleteUser(user._id)}><FiTrash /></Button>
                  </Td>
                </Tr>
              )
          }
        </Tbody>
      </Table>
    </TableContainer>
  </>
}
