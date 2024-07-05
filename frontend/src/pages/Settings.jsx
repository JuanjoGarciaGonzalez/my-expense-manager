import React, {useState} from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text
} from '@chakra-ui/react'

const Settings = ({ isOpen, onOpen, onClose, settings, user }) => {
  const [language, setLanguage] = useState(settings.language);
  const [currency, setCurrency] = useState(settings.currency);

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
          <ModalHeader>Settings</ModalHeader>
          <ModalBody>
            <section className='px-[1rem]'>
              <div className='mb-4'>
                <Text className='font-semibold'>Language</Text>
                <select id='language' value={language} onChange={() => changeSettings()} className='p-2 mt-2 rounded-lg border-none border-gray-300 focus:outline-none focus:ring focus:ring-blue-100 text-[#222831]'>
                  <option value='en'>English</option>
                  <option value='es'>Spanish</option>
                  <option value='fr'>French</option>
                  <option value='eu'>Basque</option>
                </select>
              </div>

              <div>
                <Text className='font-semibold'>Currency</Text>
                <select id='currency' value={currency} onChange={() => changeSettings()} className='p-2 mt-2 rounded-lg border-none border-gray-300 focus:outline-none focus:ring focus:ring-blue-100 text-[#222831]'>
                  <option value='euro'>EURO</option>
                  <option value='usd'>DOLLAR</option>
                  <option value='gbp'>STERLING</option>
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