import React, { useEffect, useState } from 'react'
import { Button, Avatar } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/icons'
import { FaSquarePollVertical, FaCircleInfo, FaWhmcs, FaHouseChimneyUser, FaBackward } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import Settings from './Settings';
import { useDisclosure } from '@chakra-ui/react';
import {useTranslation} from "react-i18next";
import { changeLanguage } from '../services/LanguageService';

const Sidebar = ({user}) => {

    const [settings, setSettings] = useState({})
    const {t} = useTranslation("common");

    useEffect(() => {
        if(user && user._id) {
            const getSettings = async () => {
                const response = await fetch('http://localhost:3000/setting/get', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        user: user._id
                    })
                })
    
                const data = await response.json()
                setSettings(data.setting)
                changeLanguage(data.setting.language)
            }
    
            getSettings()
        }
        
    }, [user])

    const handleLogout = () => {
        googleLogout()
        localStorage.removeItem('token')
        window.location.href = '/'
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div className='h-full flex flex-col justify-between'>
        <div>
            <img src="/logoipsum.svg" alt="Logo placeholder" className="w-[70%]"/>

            <nav className='mt-[4rem] flex flex-col gap-3 items-start'>
               
                <Link to="/" className='w-full'>
                    <Button leftIcon={<Icon as={FaHouseChimneyUser} />} color='#EEEEEE' width='100%' textAlign='left' display='flex' alignItems='center' justifyContent='flex-start' gap='5px' variant='ghost' _hover={{ backgroundColor: '#31363F' }}>{t("app.menu.dashboard")}</Button>
                </Link>
                
                <Link to="/stats" className='w-full'>
                    <Button leftIcon={<Icon as={FaSquarePollVertical} />} color='#EEEEEE' width='100%' textAlign='left' display='flex' alignItems='center' justifyContent='flex-start' gap='5px' variant='ghost' _hover={{ backgroundColor: '#31363F' }}>{t("app.menu.statistics")}</Button>
                </Link>
            </nav>
        </div>
        
        <div>
            <nav className='conf-menu flex flex-col gap-3 items-start'>
                <Link to="/help" className='w-full'>
                    <Button leftIcon={<Icon as={FaCircleInfo} />} color='#EEEEEE' width='100%' textAlign='left' display='flex' alignItems='center' justifyContent='flex-start' gap='5px' variant='ghost' _hover={{ backgroundColor: '#31363F' }}>{t("app.menu.help")}</Button>
                </Link>
                <Link onClick={onOpen} className='w-full'>
                    <Button  leftIcon={<Icon as={FaWhmcs} />} color='#EEEEEE' width='100%' textAlign='left' display='flex' alignItems='center' justifyContent='flex-start' gap='5px' variant='ghost' _hover={{ backgroundColor: '#31363F' }}>{t("app.menu.settings")}</Button>
                </Link>
                <Link onClick={() => handleLogout()} className='w-full'>
                    <Button leftIcon={<Icon as={FaBackward} />} color='#EEEEEE' width='100%' textAlign='left' display='flex' alignItems='center' justifyContent='flex-start' gap='5px' variant='ghost' _hover={{ backgroundColor: '#31363F' }}>{t("app.menu.logout")}</Button>
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

        <Settings onClose={onClose} onOpen={onOpen} isOpen={isOpen} settings={settings} user={user}/>
        
    </div>
  )
}

export default Sidebar