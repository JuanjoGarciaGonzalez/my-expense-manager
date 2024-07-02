import React from 'react'
import { Button, Avatar } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/icons'
import { FaSquarePollVertical, FaCircleInfo, FaWhmcs, FaHouseChimneyUser, FaBackward } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

const Sidebar = ({user}) => {

    const handleLogout = () => {
        googleLogout()
        localStorage.removeItem('token')
        window.location.href = '/'
    }

  return (
    <div className='h-full flex flex-col justify-between'>
        <div>
            <img src="/logoipsum.svg" alt="Logo placeholder" className="w-[70%]"/>

            <nav className='mt-[4rem] flex flex-col gap-3 items-start'>
               
                <Link to="/" className='w-full'>
                    <Button leftIcon={<Icon as={FaHouseChimneyUser} />} color='#EEEEEE' width='100%' textAlign='left' display='flex' alignItems='center' justifyContent='flex-start' gap='5px' variant='ghost' _hover={{ backgroundColor: '#31363F' }}>Dashboard</Button>
                </Link>
                
                <Link to="/stats" className='w-full'>
                    <Button leftIcon={<Icon as={FaSquarePollVertical} />} color='#EEEEEE' width='100%' textAlign='left' display='flex' alignItems='center' justifyContent='flex-start' gap='5px' variant='ghost' _hover={{ backgroundColor: '#31363F' }}>Statistics</Button>
                </Link>
            </nav>
        </div>
        
        <div>
            <nav className='conf-menu flex flex-col gap-3 items-start'>
                <Link to="/help" className='w-full'>
                    <Button leftIcon={<Icon as={FaCircleInfo} />} color='#EEEEEE' width='100%' textAlign='left' display='flex' alignItems='center' justifyContent='flex-start' gap='5px' variant='ghost' _hover={{ backgroundColor: '#31363F' }}>Help</Button>
                </Link>
                <Link to="/settings" className='w-full'>
                    <Button leftIcon={<Icon as={FaWhmcs} />} color='#EEEEEE' width='100%' textAlign='left' display='flex' alignItems='center' justifyContent='flex-start' gap='5px' variant='ghost' _hover={{ backgroundColor: '#31363F' }}>Settings</Button>
                </Link>
                <Link onClick={() => handleLogout()} className='w-full'>
                    <Button leftIcon={<Icon as={FaBackward} />} color='#EEEEEE' width='100%' textAlign='left' display='flex' alignItems='center' justifyContent='flex-start' gap='5px' variant='ghost' _hover={{ backgroundColor: '#31363F' }}>Log out</Button>
                </Link>
            </nav>

            <div className='profile-menu flex justify-start items-center mt-10'>
                <Avatar size='md' name='Juanjo García' src={`https://eu.ui-avatars.com/api/?name=${user.name}+${user.lastName}&size=250`} />
                <div className='ml-4'>
                    <p className='text-xs text-[#EEEEEE] mb-2'>{user.name} {user.lastName}</p>
                    <p className='text-xs  text-[#EEEEEE]'>{user.email}</p>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Sidebar