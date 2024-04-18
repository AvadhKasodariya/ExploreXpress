import { Box, Heading, Text } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import App from "../layout/appLayout";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function () {

  const redirect = useNavigate()
  useEffect(() => {
    const bookingCompleted = sessionStorage.getItem('bookingCompleted')
    if (bookingCompleted) {
      sessionStorage.removeItem('bookingCompleted')
    } else {
      redirect('/')
    }
  })

  return <App>
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Thank you for your booking
      </Heading>
      <Text color={'gray.500'}>
        Your booking is confirmed. Hope you have an unforgettable stay.
      </Text>
    </Box>
  </App>
}



