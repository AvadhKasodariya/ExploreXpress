import {
  Grid,
  GridItem,
  VStack,
  Image,
  Text,
  FormControl,
  Input,
  Button,
  Table,
  Tr,
  Th,
  Tbody
} from "@chakra-ui/react";
import { BiSolidMap, BiSolidStar } from "react-icons/bi";
import App from "../layout/appLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthenticatedUser } from "../hook/auth";
import Hotel from "../../../server/model/Hotel";

export default function () {

  const { id } = useParams()
  const redirect = useNavigate()
  const user = useAuthenticatedUser()
  const [hotel, setHotel] = useState()
  const [card, setCard] = useState()
  const [cvv, setCvv] = useState()
  const [expiry, setExpiry] = useState()
  const [totalDays, setTotalDays] = useState(0)
  const [bill, setBill] = useState(0)

  const handleSubmit = async (eve) => {
    eve.preventDefault()
    const amount = bill
    const start = new Date(sessionStorage.getItem('start'))
    const end = new Date(sessionStorage.getItem('end'))
    const hotelID = hotel._id
    const userID = user._id
    const data = { start, end, amount, hotelID, userID }
    const response = await axios.post('/booking', data)
    sessionStorage.setItem('bookingCompleted', true)
    redirect('/thankyou')
  }

  const fetchotel = async (id) => {

    try {
      const response = await axios.get(`/hotel/${id}`)
      setHotel(response.data);
    } catch (error) {
      alert('something went wrong')
    }
  }

  const calculatePrice = () => {
    const start = new Date(sessionStorage.getItem('start'))
    const end = new Date(sessionStorage.getItem('end'))
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    setTotalDays(diff)
    if (hotel) {
      setBill(diff * hotel?.price)
    }

  }
  useEffect(() => {
    fetchotel(id)
  }, [])

  useEffect(() => {
    calculatePrice()
  }, [hotel])

  return <App>
    <Grid px={2} my={5} templateColumns={{ sm: '1fr', md: '500px 1fr' }} gap={6}>
      <GridItem>
        <VStack alignItems={'start'}>
          <Image rounded={'xl'} src={hotel?.photos.length === 0 ? '/placeholder.png' : hotel?.photos[0]} />
          <Text fontWeight={'bold'} fontSize={25}>{hotel?.hotelname}</Text>
          <Text textTransform={'capitalize'} display={'flex'} alignItems={'center'}><BiSolidMap />{hotel?.city + ' - ' + hotel?.address} </Text>
          <Text textTransform={'capitalize'}>{hotel?.description}</Text>
          <Text textTransform={'capitalize'} display={'flex'} alignItems={'center'} color={'gold'}><BiSolidStar />{`${hotel?.rating} (${hotel?.reviews ?? 0})`}</Text>
        </VStack>
      </GridItem>
      <GridItem>
        <form onSubmit={handleSubmit}>
          <VStack spacing={6} alignItems={'stretch'} py={5}>
            <FormControl>
              <Input type="number" placeholder="Car holder number" required value={card} onChange={(eve) => setCard(eve.target.value)} />
            </FormControl>
            <FormControl>
              <Input type="number" min={0} max={999} placeholder="CVV" required value={cvv} onChange={(eve) => setCvv(eve.target.value)} />
            </FormControl>
            <FormControl>
              <Input type="month" required value={expiry} onChange={(eve) => setExpiry(eve.target.value)} />
            </FormControl>
            <Table>
              <Tbody>

                <Tr>
                  <Th>Base price</Th>
                  <Th>${hotel?.price}</Th>
                </Tr>
                <Tr>
                  <Th>Stay</Th>
                  <Th>{totalDays} days</Th>
                </Tr>
                <Tr>
                  <Th>Sub total</Th>
                  <Th>${bill}</Th>
                </Tr>
              </Tbody>
            </Table>
            <Button type="submit" colorScheme="green">Pay now (${bill})</Button>
          </VStack>
        </form>
      </GridItem>
    </Grid>
  </App>
}
