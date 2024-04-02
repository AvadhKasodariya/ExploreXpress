import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Text,
    Drawer,
    DrawerContent,
    useDisclosure,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Heading,
    Badge
} from '@chakra-ui/react'
import {
    FiHome,
    FiMenu,
    FiBell,
    FiChevronDown,
    FiUsers,
    FiMapPin,
} from 'react-icons/fi'
import { PiAirplaneTiltLight } from 'react-icons/pi'
import { useAuthSession, useLogout } from '../hook/auth'
import { Link, Outlet, useLocation } from 'react-router-dom';
import { getNotification, useNotification } from '../hook/notification';
import axios from 'axios';

const LinkItems = [
    { name: 'Dashboard', icon: FiHome, to: '/dashboard' },
    { name: 'Users', icon: FiUsers, to: '/user' },
    { name: 'Tour', icon: PiAirplaneTiltLight, to: '/tour' },
    { name: 'Hotels', icon: FiHome, to: '/hotel' },
    { name: 'Bookings', icon: FiMapPin, to: '/booking' },
];

const SidebarContent = ({ onClose, ...rest }) => {

    const location = useLocation()

    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Logo
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} href={link.to} isActive={location.pathname === link.to}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    )
}

const NavItem = ({ icon, children, href, isActive }) => {
    return (
        <Box
            as={Link}
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}
            to={href}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                bg={isActive && 'primary'}
                color={isActive && 'white'}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Box>
    )
}

const MobileNav = ({ onOpen, ...rest }) => {

    const session = useAuthSession()
    const logout = useLogout()
    const notifications = getNotification()
    const { readNotification } = useNotification()

    const handleReadNotification = async () => {
        if (notifications.length === 0) return
        await axios.post('/notification') // read notification
        readNotification([])
    }

    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}>
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text
                display={{ base: 'flex', md: 'none' }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold">
                Logo
            </Text>

            <HStack spacing={{ base: '0', md: '6' }}>
                <Menu onClose={handleReadNotification}>
                    <MenuButton position="relative">
                        <IconButton as={Box} size="lg" variant="ghost" icon={<FiBell />} />
                        <NotificationCount notifications={notifications} />
                    </MenuButton>
                    <MenuList maxHeight={500} maxWidth={300} overflow={'auto'}>
                        {
                            notifications.length === 0 ?
                                <MenuItem>No new notification</MenuItem>
                                :
                                notifications.map((entry, index) => <>
                                    <MenuItem key={index} borderBottom="1px solid #eee">
                                        <Box paddingBlock="2">
                                            <Badge variant='subtle' colorScheme='green'>
                                                {entry.type}
                                            </Badge>
                                            <Heading size='xs' textTransform='uppercase'>
                                                {entry.title}
                                            </Heading>
                                            <Text pt='2' fontSize='sm'>
                                                {entry.description}
                                            </Text>
                                        </Box>
                                    </MenuItem>
                                </>
                                )
                        }
                    </MenuList>
                </Menu>
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                            <HStack>
                                <Avatar
                                    size={'sm'}
                                    src={
                                        'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                    }
                                />
                                <VStack
                                    display={{ base: 'none', md: 'flex' }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2">
                                    <Text fontSize="sm">{session.user?.name}</Text>
                                    <Text fontSize="xs" color="gray.600">
                                        Admin
                                    </Text>
                                </VStack>
                                <Box display={{ base: 'none', md: 'flex' }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}>
                            {/* <MenuItem>Profile</MenuItem>
                            <MenuItem>Settings</MenuItem>
                            <MenuItem>Billing</MenuItem>
                            <MenuDivider /> */}
                            <MenuItem onClick={logout}>Sign out</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    )
}

function NotificationCount({ notifications }) {
    const count = notifications.length
    if (count == 0) return <></>
    return <>
        <Box
            bg="red"
            width="5"
            height="5"
            position="absolute"
            top="1"
            right="1"
            rounded="full"
            className='animate-ping'></Box>
        <Box
            bgColor="red"
            position="absolute"
            top="1"
            right="1"
            width="5"
            height="5"
            rounded="full"
            display="grid"
            placeContent="center"
            fontSize="small"
            color='white'
        >
            {count > 9 ? '9+' : notifications.length}
        </Box>
    </>
}

export default function ({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                <Outlet />
            </Box>
        </Box>
    )
}
