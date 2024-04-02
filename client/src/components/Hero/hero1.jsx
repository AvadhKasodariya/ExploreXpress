import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
  HStack,
  Select,
  Input,
  Box
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-date-range';

import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function () {



  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [location, setLocation] = useState()
  const [person, setPerson] = useState()
  const [date, setDate] = useState()

  const redirect = useNavigate()
  const [hotels, setHotels] = useState([])
  const [open, setOpen] = useState(false)
  const ref = useRef()

  const handleSubmit = (eve) => {
    eve.preventDefault()
    if (!date) {
      ref.current.readOnly = false
      ref.current.setCustomValidity("Date is required")
      ref.current.reportValidity()
      return

    } else {
      ref.current.readOnly = true
    }

    const start = new Date(state[0].startDate)
    const end = new Date(state[0].endDate)

    const year = start.getFullYear();
    const month = (start.getMonth() + 1).toString().padStart(2, '0'); // Zero-pad month
    const day = start.getDate().toString().padStart(2, '0'); // Zero-pad day

    const yearEnd = end.getFullYear();
    const monthEnd = (end.getMonth() + 1).toString().padStart(2, '0'); // Zero-pad month
    const dayEnd = end.getDate().toString().padStart(2, '0'); // Zero-pad day

    const range_start = `${year}-${month}-${day}`;
    const range_end = `${yearEnd}-${monthEnd}-${dayEnd}`;
    const searchParams = `location=${location}&person=${person}&start=${range_start}&end=${range_end}`

    redirect(`/search?${searchParams}`)
  }

  const handleDateRange = (item) => {
    setState([item.selection])
    setDate(new Date(item.selection.startDate).toDateString() + ' - ' + new Date(item.selection.endDate).toDateString())
  }

  const fetchHotels = async () => {
    const response = await axios.get('/hotel/cities')
    setHotels(response.data)
  }

  useEffect(() => {
    fetchHotels()
  }, [])

  return (
    <Flex
      w={'full'}
      h={'100vh'}
      backgroundImage={
        'url(https://c4.wallpaperflare.com/wallpaper/246/582/347/evening-europe-tower-bridge-london-wallpaper-preview.jpg)'
      }
      backgroundSize={'cover'}
      backgroundPosition={'center center'}>
      <VStack
        w={'full'}
        justify={'center'}
        px={useBreakpointValue({
          base: 4,
          md: 8
        })}
        bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
        <Stack maxW={'3xl'} spacing={6}>
          <Text
            color={'white'}
            fontWeight={700}
            lineHeight={1.2}
            textAlign={'center'}
            fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
            Explore, Experience, and Enjoy Memorable Journeys.
          </Text>
          <form onSubmit={handleSubmit}>
            <HStack border={'1px solid white'} rounded={'xl'}>
              <Box flex={1}>
                <Select
                  onChange={(eve) => { setLocation(eve.target.value); }}
                  name='location'
                  placeholder='Select location'
                  focusBorderColor={'transparent'}
                  color={'white'}
                  border={'none'}
                  required>
                  {
                    hotels.map((hotel, index) => <option key={index} value={hotel.city} style={{ color: 'black' }}>{hotel.city}</option>)
                  }
                </Select>
              </Box>
              <Box flex={1}>
                <Select
                  onChange={(eve) => { setPerson(eve.target.value); }}
                  name='person'
                  placeholder='Select person'
                  color={'white'}
                  focusBorderColor={'transparent'}
                  border={'none'}
                  required>
                  <option value='1' style={{ color: 'black' }}>1</option>
                  <option value='2' style={{ color: 'black' }}>2</option>
                  <option value='3' style={{ color: 'black' }}>3</option>
                  <option value='4' style={{ color: 'black' }}>4</option>
                  <option value='5' style={{ color: 'black' }}>5</option>
                </Select>
              </Box>
              <Box flex={1} position={'relative'}>
                <Input type="text"
                  value={date}
                  placeholder='select date'
                  color={'white'}
                  border={'none'}
                  onClick={() => setOpen(!open)}
                  focusBorderColor={'transparent'}
                  _placeholder={{ color: 'white' }}
                  ref={ref}
                  readOnly
                  required
                />
                <Box position={'absolute'} top={50} right={0}>
                  {
                    open &&
                    <DateRange
                      editableDateInputs={false}
                      onChange={handleDateRange}
                      moveRangeOnFirstSelection={true}
                      ranges={state}
                    />
                  }
                </Box>
              </Box>
              <Button
                type='submit'
                bg={'green.400'}
                color={'white'}
                roundedLeft={'none'}
                roundedRight={'xl'}
                px={6}
                _hover={{
                  bg: 'green.600',
                }}
              >
                Find
              </Button>
            </HStack>
          </form>
        </Stack>
      </VStack>
    </Flex>
  )
}