import {
  Box,
  Heading,
  SimpleGrid,
  Text
} from '@chakra-ui/react'
import App from "../layout/appLayout";
import Hero from '../components/Hero/hero1'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function () {

  const [tours, setTours] = useState([])
  const fetchTours = async () => {
    const response = await axios.get('/tour')
    setTours(response.data)
  }

  useEffect(() => {
    fetchTours()
  }, [])
  return <App>
    <Hero />
    <Box px={2} py={5}>
      <Heading>Tours</Heading>
      <SimpleGrid flexGrow={1} spacing={4} my={5} templateColumns='repeat(auto-fill, minmax(250px, 1fr))'>
        {
          tours.length == 0 ?
            <Text>No tours found</Text>
            :
            tours.map(tour =>
              <Box 
              key={tour._id}
              as={Link}
              to={`/tour/${tour._id}`}
              padding={5}
              shadow={'lg'}
              rounded={'lg'}>
                {tour.name}
              </Box>
            )
        }
      </SimpleGrid>
    </Box>
  </App>
}
