import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { BsPerson } from 'react-icons/bs'
import { FiHome } from 'react-icons/fi'
import { GoLocation, GoPaperAirplane } from 'react-icons/go'

function StatsCard(props) {
  const { title, stat, icon } = props
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}>
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={'medium'} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={'auto'}
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent={'center'}>
          {icon}
        </Box>
      </Flex>
    </Stat>
  )
}

export default function () {

  const [stats, setStats] = useState({})

  const fetchStats = async () => {
    const response = await axios.get('/stats')
    setStats(response.data);
  }

  useEffect(() => {
    fetchStats()
  }, [])
  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard title={'Users'} stat={stats.user} icon={<BsPerson size={'3em'} />} />
        <StatsCard title={'Hotels'} stat={stats.hotel} icon={<FiHome size={'3em'} />} />
        <StatsCard title={'Tours'} stat={stats.tour} icon={<GoPaperAirplane size={'3em'} />} />
        <StatsCard title={'Bookings'} stat={stats.booking} icon={<GoLocation size={'3em'} />} />
      </SimpleGrid>
    </Box>
  )
}