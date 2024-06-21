import React from 'react'
import { Button } from '@chakra-ui/react'
import { SettingsIcon, StarIcon, InfoIcon } from '@chakra-ui/icons'

const Sidebar = () => {
  return (
    <div className='h-full flex flex-col justify-between'>
        <div>
            <img src="/logoipsum.svg" alt="Logo placeholder" className="w-[70%]"/>

            <nav className='mt-10 flex flex-col gap-3 items-start'>
                <Button leftIcon={<StarIcon />} color='#EEEEEE' width='100%' textAlign='left' display='flex' alignItems='center' justifyContent='flex-start' gap='5px' variant='ghost' _hover={{ backgroundColor: '#31363F' }}>
                    Dashboard
                </Button>
            </nav>
        </div>
        
        <div>
            <nav className='flex flex-col gap-3 items-start'>
                <Button leftIcon={<InfoIcon />} color='#EEEEEE' width='100%' textAlign='left' display='flex' alignItems='center' justifyContent='flex-start' gap='5px' variant='ghost' _hover={{ backgroundColor: '#31363F' }}>
                    Help
                </Button>
                <Button leftIcon={<SettingsIcon />} color='#EEEEEE' width='100%' textAlign='left' display='flex' alignItems='center' justifyContent='flex-start' gap='5px' variant='ghost' _hover={{ backgroundColor: '#31363F' }}>
                    Settings
                </Button>
            </nav>
        </div>
        
    </div>
  )
}

export default Sidebar