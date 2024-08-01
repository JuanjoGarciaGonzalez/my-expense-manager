import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Text,
  Heading,
  Tooltip
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import BgAnimated from './BgAnimated'
import { cn } from '../lib/utils'
import SliderWelcome from './SliderWelcome'

const Help = ({ isHelpOpen, onHelpOpen, onHelpClose, user }) => {
  const { t } = useTranslation("common");

  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )
  
  const [overlay, setOverlay] = React.useState(<OverlayOne />)


  return (
    <Modal isCentered isOpen={isHelpOpen} onOpen={onHelpOpen} onClose={onHelpClose}>
      {overlay}
      <ModalContent>
        <div className='modal-wrapper'>
          <ModalBody className='flex flex-col items-start justify-center'>
            <BgAnimated
                numSquares={20}
                maxOpacity={0.15}
                duration={3}
                repeatDelay={1}
                className={cn(
                "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
                "inset-x-[15%] inset-y-[-12%] h-[80%] skew-y-12 opacity-50",
                )}
            />
            <div className='px-5 py-[35px]'>
                <Heading as='h2' size='xl' textAlign='left'>Hola, {user.name} {user.lastName}</Heading>
                <Text textAlign='center'>¿Quieres saber como empezar a manejar tus finanzas?</Text>
            </div>
            <SliderWelcome onClose={onHelpClose}/>
              
          </ModalBody>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default Help