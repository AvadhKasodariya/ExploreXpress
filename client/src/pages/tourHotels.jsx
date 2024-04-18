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
import { Link, useParams } from "react-router-dom";

export default function () {

  const { id } = useParams()
  const [hotels, setHotels] = useState([])
  const fetchHotels = async () => {
    const response = await axios.get(`/tour/${id}`)
    setHotels(response.data.hotel)
  }

  useEffect(() => {
    fetchHotels()
  }, [])

  return <App>
    <Box my={5} px={2}>
      <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(250px, 1fr))'>
        {
          hotels.length === 0 ?
            <Text>No hotels found...</Text>
            :
            hotels.map(hotel => <Card maxW='sm'>
              <CardBody key={hotel._id}>
                <Link to={`/details/${hotel._id}`}>
                  <Image
                    src={hotel.photos.length === 0 ? '/placeholder.png' : hotel.photos[0]}
                    alt='hotel'
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
              {/* <CardFooter>
                <Button variant='solid' width={'100%'} colorScheme='green'>
                  Book now
                </Button>
              </CardFooter> */}
            </Card>)
        }
      </SimpleGrid>
    </Box>
  </App>
}
