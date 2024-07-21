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

const Help = ({ isHelpOpen, onHelpOpen, onHelpClose }) => {
  const { t } = useTranslation("common");

  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )
  
  const [overlay, setOverlay] = React.useState(<OverlayOne />)


  return (
    <Modal isCentered isOpen={isHelpOpen} onClose={onHelpClose}>
      {overlay}
      <ModalContent>
        <div className='modal-wrapper'>
          <ModalHeader className='z-10'>
            Primeros pasos
          </ModalHeader>
          <ModalBody className='flex items-center justify-center'>
            <BgAnimated
                numSquares={17}
                maxOpacity={0.25}
                duration={3}
                repeatDelay={1}
                className={cn(
                "[mask-image:radial-gradient(250px_circle_at_center,white,transparent)]",
                "inset-x-0 inset-y-[-5%] h-[100%] skew-y-12",
                )}
            />
            <section className='px-[1rem] flex items-center justify-around h-full w-full'>
              
            </section>
              
          </ModalBody>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default Help