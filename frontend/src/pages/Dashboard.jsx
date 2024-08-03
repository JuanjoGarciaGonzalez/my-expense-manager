import React, {useEffect, useRef, useState} from 'react'
import Sidebar from '../modules/Sidebar'
import { useTranslation } from 'react-i18next';
import { useDisclosure } from '@chakra-ui/react';
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import AOS from 'aos';
import 'aos/dist/aos.css';
import DashboardTable from '../modules/DashboardTable';
import DashboardModal from '../modules/DashboardModal';

const Dashboard = () => {
  const [user, setUser] = useState({})
  const { t } = useTranslation("common");
  const [incomes, setIncomes] = useState([])
  const [expenses, setExpenses] = useState([])
  const [modalObject, setModalObject] = useState(null)
  const [modalData, setModalData] = useState(null)

  const {isOpen, onOpen, onClose} = useDisclosure()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      //redirect to login
      window.location.href = '/'
    }

    AOS.init()

    const token = localStorage.getItem('token')

    fetch('http://localhost:3000/user/getUserByToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tokenUser: token
      })
    })
    .then(res => res.json())
    .then(data => {
      setUser(data.user)

      fetch('http://localhost:3000/income/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.user.email
        })
      })
      .then(res => res.json())
      .then(data => {
        setIncomes(data)
        console.log(data)
      })
  
      fetch('http://localhost:3000/expense/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.user.email
        })
      })
      .then(res => res.json())
      .then(data => {
        setExpenses(data)
        console.log(data)
      })
    })

  }, [])
  
  const tablesHeaders = [
    {    header: 'Título',    accessorKey: 'title',    enableSorting: true,    meta: {      align: 'text-left',    },  },  {    header: 'Concepto',    accessorKey: 'description',    enableSorting: false,    meta: {      align: 'text-left',    },  },  {    header: 'Tipo',    accessorKey: 'type',    enableSorting: false,    meta: {      align: 'text-left',    },  },  {    header: 'Categoría',    accessorKey: 'category',    enableSorting: false,    meta: {      align: 'text-left',    },  },  {    header: 'Importe (€)',    accessorKey: 'amount',    enableSorting: true,    meta: {      align: 'text-left',    }, },
  ];

  const tableExpenses = useReactTable({
    data: expenses,
    columns: tablesHeaders,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [
        {
          id: 'amount',
          desc: true,
        },
      ],
    },
  });

  const tableIncomes = useReactTable({
    data: incomes,
    columns: tablesHeaders,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [
        {
          id: 'amount',
          desc: true,
        },
      ],
    },
  });
  
  const handleOpenModal = (e) => {
    if(e === 0) {
      setModalData({
        title: 'Añadir ingreso',
        description: 'Añade un nuevo ingreso a la tabla.',
        type: 'Ingreso',
        button: 'Añadir',
        url: 'http://localhost:3000/income/create'
      })
    } else {
      setModalData({
        title: 'Añadir gasto',
        description: 'Añade un nuevo gasto a la tabla.',
        type: 'Gasto',
        button: 'Añadir',
        url: 'http://localhost:3000/expense/create'
      })
    }
    onOpen()
  }

  return (
    <>
      {user && <main className='flex'>
        <section className='inline-block w-[20dvw] h-[100dvh] bg-[#222831] text-[#EEEEEE] px-8 py-9 ubuntu-bold'><Sidebar user={user}/></section>
        <section className='inline-block w-[80dvw] bg-[#31363F] text-[#EEEEEE] px-8 py-9 ubuntu-regular overflow-y-auto'>

          <div className='grid grid-cols-4 grid-rows-2 gap-5'>

            <div className='bg-[#222831] p-4 rounded-lg col-span-4 min-h-[300px]'>
              <h2 className='text-xl ubuntu-bold mb-3'>Gráfico</h2>
            </div>

            <div className='bg-[#222831] p-4 rounded-lg col-span-4 2xl:col-span-2 min-h-[300px]' data-aos="zoom-out-left">
              <div className='flex justify-between items-center'>
                <h2 className='text-xl ubuntu-bold mb-3'>Ingresos</h2>
                <button className="rounded-full relative w-[35px] h-[35px] text-[#222831] bg-[#EEEEEE] mb-3 text-lg font-semibold inline-flex items-center justify-center gap-1 hover:bg-[#a39e9e] transition-all" onClick={() => handleOpenModal(0)}><i className="fa-solid fa-plus"></i></button>
              </div>

              <DashboardTable tableData={tableIncomes} />
            </div>

            <div className='bg-[#222831] p-4 rounded-lg col-span-4 2xl:col-span-2 min-h-[300px]' data-aos="zoom-out-right">
              <div className='flex justify-between items-center'>
                <h2 className='text-xl ubuntu-bold mb-3'>Gastos</h2>
                <button className="rounded-full relative w-[35px] h-[35px] text-[#222831] bg-[#EEEEEE] mb-3 text-lg font-semibold inline-flex items-center justify-center gap-1 hover:bg-[#a39e9e] transition-all" onClick={() => handleOpenModal(1)}><i className="fa-solid fa-plus"></i></button>
              </div>

              <DashboardTable tableData={tableExpenses} />
            </div>

            <DashboardModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} modalData={modalData} modalObject={modalObject} tableExpenses={tableExpenses} tableIncomes={tableIncomes} user={user}/>
          </div>
        </section>
      </main>}
    </>
  )
}

export default Dashboard