import React, { useEffect, useState } from 'react'
import { Button, Avatar } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/icons'
import { FaSquarePollVertical, FaCircleInfo, FaWhmcs, FaHouseChimneyUser, FaBackward, FaArrowsLeftRightToLine} from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import Settings from './Settings';
import Help from './Help';
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
    const { isOpen: isHelpOpen, onOpen: onHelpOpen, onClose: onHelpClose } = useDisclosure()

    const handleCloseMenu = () => {
        const sidebar = document.querySelector('.sidebar')
        sidebar.classList.toggle('close')
    }

  return (
    <div className='h-full flex flex-col justify-between'>
        <div>
            <div className='flex justify-between items-start logo-container'>
                <img src="/logoipsum.svg" alt="Logo placeholder" className="h-[40px] logo"/>
                <button className='w-[48px] h-[40px] flex items-center justify-center cursor-pointer hover:bg-[#31363F] transition-all rounded-md' onClick={() => handleCloseMenu()}><FaArrowsLeftRightToLine /></button>
            </div>

            <nav className='mt-[4rem] flex flex-col gap-3 items-start'>
               
                <Link to="/dashboard" className='w-full'>
                    <Button leftIcon={<Icon as={FaHouseChimneyUser} />} className='menu-button' color='#EEEEEE' width='100%' textAlign='left' display='flex' alignItems='center' justifyContent='flex-start' gap='5px' variant='ghost' _hover={{ backgroundColor: '#31363F' }}><span className='menu-text'>{t("app.menu.dashboard")}</span></Button>
                </Link>
                
                {/* <Link to="/stats" className='w-full'>
                    <Button leftIcon={<Icon as={FaSquarePollVertical} />} color='#EEEEEE' width='100%' textAlign='left' display='flex' alignItems='center' justifyContent='flex-start' gap='5px' variant='ghost' _hover={{ backgroundColor: '#31363F' }}>{t("app.menu.statistics")}</Button>
                </Link> */}
            </nav>
        </div>
        
        <div>
            <nav className='conf-menu flex flex-col gap-3 items-start'>
                <Link onClick={onHelpOpen} className='w-full'>
                    <Button leftIcon={<Icon as={FaCircleInfo} />} className='menu-button' color='#EEEEEE' width='100%' textAlign='left' display='flex' alignItems='center' justifyContent='flex-start' gap='5px' variant='ghost' _hover={{ backgroundColor: '#31363F' }}><span className='menu-text'>{t("app.menu.help")}</span></Button>
                </Link>
                <Link onClick={onOpen} className='w-full'>
                    <Button  leftIcon={<Icon as={FaWhmcs} />} className='menu-button' color='#EEEEEE' width='100%' textAlign='left' display='flex' alignItems='center' justifyContent='flex-start' gap='5px' variant='ghost' _hover={{ backgroundColor: '#31363F' }}><span className='menu-text'>{t("app.menu.settings")}</span></Button>
                </Link>
                <Link onClick={() => handleLogout()} className='w-full'>
                    <Button leftIcon={<Icon as={FaBackward} />} className='menu-button' color='#EEEEEE' width='100%' textAlign='left' display='flex' alignItems='center' justifyContent='flex-start' gap='5px' variant='ghost' _hover={{ backgroundColor: '#31363F' }}><span className='menu-text'>{t("app.menu.logout")}</span></Button>
                </Link>
            </nav>

            <div className='profile-menu flex justify-start items-center mt-10'>
                <Avatar size='md' name='Juanjo García' src={`https://eu.ui-avatars.com/api/?name=${user.name}+${user.lastName}&size=250`} />
                <div className='ml-4 menu-text'>
                    <p className='text-xs text-[#EEEEEE] mb-2 menu-text'>{user.name} {user.lastName}</p>
                    <p className='text-xs  text-[#EEEEEE] menu-text'>{user.email}</p>
                </div>
            </div>
        </div>

        <Settings onClose={onClose} onOpen={onOpen} isOpen={isOpen} settings={settings} user={user}/>
        <Help onHelpClose={onHelpClose} onHelpOpen={onHelpOpen} isHelpOpen={isHelpOpen} user={user}/>
    </div>
  )
}

export default Sidebar