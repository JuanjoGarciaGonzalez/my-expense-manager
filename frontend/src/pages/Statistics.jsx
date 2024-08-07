import React from 'react'
import Sidebar from '../modules/Sidebar'

const Statistics = () => {
  return (
    <main className='flex'>
      <section className='inline-block w-[20dvw] h-[100dvh] bg-[#222831] text-[#EEEEEE] px-8 py-9 ubuntu-bold'><Sidebar /></section>
      <section className='inline-block w-[80dvw] h-[100dvh] bg-[#31363F] text-[#EEEEEE] px-8 py-9 ubuntu-regular '>Statistics</section>
    </main>
  )
}

export default Statistics