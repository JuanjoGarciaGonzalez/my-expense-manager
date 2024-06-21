import React from 'react'
import Sidebar from '../modules/Sidebar'

const Dashboard = () => {
  return (
    <main className='flex'>
      <section className='inline-block w-[20dvw] h-[100dvh] bg-[#222831] text-[#EEEEEE] px-8 py-9 source-code-pro-bold'><Sidebar /></section>
      <section className='inline-block w-[80dvw] h-[100dvh] bg-[#31363F] text-[#EEEEEE] px-8 py-9 source-code-pro-regular '>Dashboard</section>
    </main>
  )
}

export default Dashboard