import { useEffect, useState } from "react";
import App from "../layout/appLayout";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Box,
  Stack,
  Heading,
  Image,
  Text,
  Divider,
  Button,
  SimpleGrid
} from '@chakra-ui/react'
import axios from "axios";
import { Link } from "react-router-dom";

export default function () {

  const [hotels, setHotels] = useState([])
  const fetchHotels = async () => {
    const response = await axios.get('/hotel')
    setHotels(response.data)
  }

  useEffect(() => {
    fetchHotels()
  }, [])

  return <App>
    <Box my={5} px={2}>
      <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(250px, 1fr))'>
        {
          hotels.map(hotel => <Card maxW='sm'>
            <CardBody key={hotel._id}>
              <Link to="/details/555">
                <Image
                  src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                  alt='Green double couch with wooden legs'
                  borderRadius='lg'
                />
              </Link>
              <Stack mt='6' spacing='3'>
                <Heading size='md'>{hotel.name}</Heading>
                <Text>{hotel.description.substring(0, 50) + '...'}</Text>
                <Text color='blue.600' fontSize='2xl'>
                  ${hotel.price}
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <Button variant='solid' width={'100%'} colorScheme='green'>
                Book now
              </Button>
            </CardFooter>
          </Card>)
        }
      </SimpleGrid>
    </Box>
  </App>
}
