import { useEffect, useState } from "react";
import App from "../layout/appLayout";
import {
  Card,
  CardBody,
  CardFooter,
  Box,
  Stack,
  Heading,
  Image,
  Text,
  Divider,
  Button,
  SimpleGrid,
  HStack,
  InputGroup,
  Input,
  FormLabel,
  FormControl
} from '@chakra-ui/react'
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthSession, useAuthenticatedUser } from "../hook/auth";
import { useSession } from "../hook/session";

export default function () {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const destination = searchParams.get('location');
  const person = searchParams.get('person');
  const start = searchParams.get('start');
  const end = searchParams.get('end');
  const [hotels, setHotels] = useState([])

  const [fields, setFields] = useState({
    destination,
    person,
    start,
    end,
    price: '',

  })

  const user = useAuthenticatedUser()
  const redirect = useNavigate()
  const { sessionFlash } = useSession()


  const handleChange = (eve) => {
    const { name, value } = eve.target
    setFields(old => ({
      ...old,
      [name]: value
    }))
  }

  const handleSubmit = async (eve) => {
    eve.preventDefault()
    const start = new Date(fields.start)
    const end = new Date(fields.end)

    if (end - start < 0) {
      alert('invalid range selected')
      return
    }
    fetchHotels()
  }

  const handleBooking = (hotelID) => {
    if (!user) {
      sessionFlash('unauthorized', 'please login to continue')
    } else {
      sessionStorage.setItem('start', start)
      sessionStorage.setItem('end', end)
    }
    redirect(`/checkout/${hotelID}`)
  }

  const fetchHotels = async () => {
    const data = fields
    const response = await axios.post('/search', data)
    setHotels(response.data)
  }

  useEffect(() => {
    fetchHotels()
  }, [])


  return <App>
    <Box my={5} px={2}>

      <HStack alignItems={'start'} wrap={'wrap'}>
        <Box flexBasis={{ sm: '100%', md: '300px' }}>
          <form onSubmit={handleSubmit}>
            <FormControl mb='3'>
              <Input type="number" name="price" placeholder="price" min='1' value={fields.price} onChange={handleChange} />
            </FormControl>
            <FormControl mb='3'>
              <Input type="text" name="destination" placeholder="destination" value={fields.destination} onChange={handleChange} />
            </FormControl>
            <FormControl mb='3'>
              <Input type="number" name="person" placeholder="persons" min='1' required value={fields.person} onChange={handleChange} />
            </FormControl>
            <FormControl mb='3'>
              <HStack>
                <Input type="date" name="start" min={new Date().toISOString().split("T")[0]} required value={fields.start} onChange={handleChange} />
                <span>-</span>
                <Input type="date" name="end" min={new Date().toISOString().split("T")[0]} required value={fields.end} onChange={handleChange} />
              </HStack>
            </FormControl>
            <Button type={'submit'} colorScheme={'green'}>Search</Button>
          </form>
        </Box>
        <SimpleGrid flexGrow={1} spacing={4} templateColumns='repeat(auto-fill, minmax(250px, 1fr))'>
          {
            hotels.length == 0 ?
              <Text>No tours found</Text>
              :
              hotels.map(hotel => <Card maxW='sm' key={hotel._id}>
                <CardBody >
                  <Link to="/details/555">
                    <Image
                      src={hotel.photos.length === 0? '/placeholder.png' : hotel.photos[0]}
                      alt='hotel'
                      borderRadius='lg'
                    />
                  </Link>
                  <Stack mt='6' spacing='3'>
                    <Heading size='md'>{hotel.title}</Heading>
                    <Text>{hotel.description && hotel.description.substring(0, 50) + '...'}</Text>
                    <Text color='blue.600' fontSize='2xl'>
                      ${hotel.price}
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  {
                    hotel.booked ?
                      <Button disabled variant='solid' width={'100%'} colorScheme='red'>
                        Booked
                      </Button>
                      :
                      <Button variant='solid' width={'100%'} colorScheme='green' onClick={() => handleBooking(hotel._id)}>
                        Book now
                      </Button>
                  }
                </CardFooter>
              </Card>)
          }
        </SimpleGrid>
      </HStack>
    </Box>
  </App>
}
