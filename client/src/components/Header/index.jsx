'use client'

import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { useAuthenticatedUser, useLogout } from '../../hook/auth'

const Links = [
  // {link:'Home', to:'/'},
  // {link:'About', to:'/about'},
  // {link:'Contact', to:'/contact'},
]

const NavLink = (props) => {
  const { children } = props

  return (
    <Box
      as={Link}
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      to={props.href}>
      {children}
    </Box>
  )
}

export default function () {

  const user = useAuthenticatedUser()
  const logout = useLogout()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box boxShadow="md" px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'} mx={'auto'} maxWidth={'1200px'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box as={Link} to='/'>
              <img src="/logo.png" alt="logo" />
            </Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link, index) => (
                <NavLink href={link.to} key={index}>{link.link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            {
              user ?
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}>
                    <Avatar
                      size={'sm'}
                      src={
                        'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                      }
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      <Link to='/mybookings'>My bookings</Link>
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
                :
                <Button as={Link} to='/login' colorScheme='green'>Login</Button>
            }
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}