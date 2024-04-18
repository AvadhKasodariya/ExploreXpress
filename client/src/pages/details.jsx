'use client'

import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
} from '@chakra-ui/react'
import {useParams} from 'react-router-dom'
import { MdLocalShipping } from 'react-icons/md'
import { useEffect, useState } from 'react'
import App from '../layout/appLayout'
import axios from 'axios'

export default function() {
  const {id} = useParams()
  const [hotel, setHotel] = useState({})

  const fetchHotel = async () =>{
    const response = await axios.get(`/hotel/${id}`)
    setHotel(response.data)
  }

  useEffect(()=>{
    fetchHotel()
  },[])
  return (
    <App>
      <Container maxW={'7xl'}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}>
          <Flex>
            <Image
              rounded={'md'}
              alt={'product image'}
              src={hotel.photos?.length > 0 ? hotel.photos[0] : '/placeholder.png'}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={{ base: '100%', sm: '400px', lg: '500px' }}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                {hotel.title}
              </Heading>
              <Text
                color={useColorModeValue('gray.900', 'gray.400')}
                fontWeight={300}
                fontSize={'2xl'}>
                ${hotel.price} CAD
              </Text>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={'column'}
              divider={
                <StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />
              }>
              <VStack spacing={{ base: 4, sm: 6 }}>
                
                <Text fontSize={'lg'}>{hotel.description}</Text>
              </VStack>
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={useColorModeValue('yellow.500', 'yellow.300')}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}>
                  Features
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    <ListItem>Group size</ListItem>
                    <ListItem>Rooms</ListItem>
                    <ListItem>Distance</ListItem>
                    <ListItem>Address</ListItem>
                    <ListItem>Rating</ListItem>
                  </List>
                  <List spacing={2}>
                    <ListItem>{hotel.maxGroupSize}</ListItem>
                    <ListItem>{hotel.rooms}</ListItem>
                    <ListItem>{hotel.distance}</ListItem>
                    <ListItem>{hotel.address}</ListItem>
                    <ListItem>{hotel.rating}</ListItem>
                  </List>
                </SimpleGrid>
              </Box>
            </Stack>

            {/* <Button
              rounded={'none'}
              w={'full'}
              mt={8}
              size={'lg'}
              py={'7'}
              bg={useColorModeValue('gray.900', 'gray.50')}
              color={useColorModeValue('white', 'gray.900')}
              textTransform={'uppercase'}
              _hover={{
                transform: 'translateY(2px)',
                boxShadow: 'lg',
              }}>
              Add to cart
            </Button> */}

          </Stack>
        </SimpleGrid>
      </Container>
    </App>
  )
}