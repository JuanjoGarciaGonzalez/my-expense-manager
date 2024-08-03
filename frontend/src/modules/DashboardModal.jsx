import React, {useState} from 'react'
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

const DashboardModal = ({isOpen, onOpen, onClose, modalObject, modalData, tableExpenses, tableIncomes, user}) => {

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const { t } = useTranslation("common");

    const OverlayOne = () => (
      <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(10px) hue-rotate(90deg)'
      />
    )
    
    const [overlay, setOverlay] = React.useState(<OverlayOne />)

    const handleSubmit = () => {
        setLoading(true)
        const form = document.querySelector('.modal-form')
        const title = form.title.value
        const description = form.description.value
        const category = form.category.value
        const type = form.type.value
        const amount = form.amount.value
        const date = form.date.value
        const email = user.email

        const url = modalData?.url

        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title,
              description,
              category,
              type,
              amount,
              date,
              email
            })
          })
          .then(res => res.json())
          .then(data => {
            if (data.error) {
              setError(true)
              setLoading(false)
            } else {
              setError(false)
              setLoading(false)
              //add data to table
                if(modalData?.type === 'Ingreso') {
                    tableIncomes.data.push(data)
                    console.log(tableIncomes)
                } else {
                    tableExpenses.data.push(data)
                    console.log(tableExpenses)
                }
              onClose()
            }
          })
          .catch(err => {
            setError(true)
            setLoading(false)
          }
        )
    }

  return (
    <Modal isCentered isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      {overlay}
      <ModalContent>
        <div className='modal-wrapper'>
            <ModalHeader className='z-10'>
                {modalData?.title}
                <Tooltip label={modalData?.description} placement='top'>
                <span></span>
                </Tooltip>
            </ModalHeader>
            
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
                    <form className='modal-form mt-[50px]'>
                        <div className='relative px-4 py-4 rounded-2xl bg-[#DCE2EA] flex items-center overflow-hidden'>
                            <input type="text" required name='title' id='title' className='bg-transparent text-sm font-regular w-full'/>
                            <label className='absolute pointer-events-none font-regular transition-all text-xs'  htmlFor="title">Title</label>
                        </div>

                        <div className='relative px-4 py-4 rounded-2xl bg-[#DCE2EA] flex items-center overflow-hidden'>
                            <input type="text" required name='description' id='description' className='bg-transparent text-sm font-regular w-full'/>
                            <label className='absolute pointer-events-none font-regular transition-all text-xs'  htmlFor="description">Concepto</label>
                        </div>

                        <div className='relative px-4 py-4 rounded-2xl bg-[#DCE2EA] flex items-center overflow-hidden'>
                            <input type="text" required name='category' id='category' className='bg-transparent text-sm font-regular w-full'/>
                            <label className='absolute pointer-events-none font-regular transition-all text-xs'  htmlFor="category">Categoría</label>
                        </div>

                        <div className='relative px-4 py-4 rounded-2xl bg-[#DCE2EA] flex items-center overflow-hidden'>
                            <input type="text" required name='type' id='type' className='bg-transparent text-sm font-regular w-full'/>
                            <label className='absolute pointer-events-none font-regular transition-all text-xs'  htmlFor="type">Tipo</label>
                        </div>

                        <div className='relative px-4 py-4 rounded-2xl bg-[#DCE2EA] flex items-center overflow-hidden'>
                            <input type="number" required name='amount' id='amount' className='bg-transparent text-sm font-regular w-full'/>
                            <label className='absolute pointer-events-none font-regular transition-all text-xs'  htmlFor="amount">Amount</label>
                        </div>

                        <div className='relative px-4 py-4 rounded-2xl bg-[#DCE2EA] flex items-center overflow-hidden'>
                            <input type="date" required name='date' id='date' className='bg-transparent text-sm font-regular w-full'/>
                            <label className='absolute pointer-events-none font-regular transition-all text-xs active'  htmlFor="date">Date</label>
                        </div>

                        <button type='submit' className='effect effect-2 relative w-[50%] text-[#222831] bg-[#EEEEEE] mb-3 text-xs font-semibold inline-flex items-center justify-center gap-1' onClick={() => handleSubmit()}>
                            {modalData?.button} {loading && <div className="loader-button"></div>}
                        </button>

                    </form>
                </div>
                
            </ModalBody>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default DashboardModal