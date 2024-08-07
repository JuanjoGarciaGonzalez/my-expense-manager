import React, {useEffect, useState} from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Heading,
  Tooltip
} from '@chakra-ui/react'
import BgAnimated from './BgAnimated'
import { cn } from '../lib/utils'
import { changeLanguage } from '../services/LanguageService'
import { useTranslation } from 'react-i18next'

const Settings = ({ isOpen, onOpen, onClose, settings, user }) => {
  const [language, setLanguage] = useState(settings.language);
  const [currency, setCurrency] = useState(settings.currency);
  const { t } = useTranslation("common");

  useEffect(() => {
      setLanguage(settings.language)
      setCurrency(settings.currency)
  }, [settings])

  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )
  
  const [overlay, setOverlay] = React.useState(<OverlayOne />)

  const changeSettings = () => {
    const language = document.getElementById('language').value
    const currency = document.getElementById('currency').value

    setLanguage(language)
    setCurrency(currency)

    changeLanguage(language)

    fetch('http://localhost:3000/setting/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        user: user._id,
        currency,
        language
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.error(err)
    })

  }


  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      {overlay}
      <ModalContent>
        <div className='modal-wrapper'>
          <ModalHeader className='z-10'>
            {t("app.settings.title")} 
            <Tooltip label={t("app.settings.info")} placement='top'>
              <span></span>
            </Tooltip>
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
              <div>
                <Text className='font-semibold mx-1'>{t("app.settings.language")}</Text>
                <select id='language' value={language} onChange={() => changeSettings()} className='min-w-[140px] p-2 mt-2 rounded-2xl border-none bg-[#EEEEEE] text-[#222831] font-semibold outline-none focus:outline-none'>
                  <option value='en'>{t("app.settings.english")}</option>
                  <option value='es'>{t("app.settings.spanish")}</option>
                  <option value='fr'>{t("app.settings.french")}</option>
                  <option value='eu'>{t("app.settings.basque")}</option>
                </select>
              </div>

              <div>
                <Text className='font-semibold mx-1'>{t("app.settings.currency")}</Text>
                <select id='currency' value={currency} onChange={() => changeSettings()} className='min-w-[140px] p-2 mt-2 rounded-2xl border-none bg-[#EEEEEE] text-[#222831] font-semibold outline-none focus:outline-none'>
                  <option value='euro'>{t("app.settings.euro")}/€</option>
                  <option value='usd'>{t("app.settings.dollar")}/$</option>
                  <option value='gbp'>{t("app.settings.sterling")}/£</option>
                </select>
              </div>
            </section>
              
          </ModalBody>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default Settings