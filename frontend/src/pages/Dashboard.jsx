import React, {useEffect, useRef, useState} from 'react'
import Sidebar from '../modules/Sidebar'
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const chartRef = useRef(null)
  const [user, setUser] = useState({})
  const { t } = useTranslation("common");
  const [incomes, setIncomes] = useState([])
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      //redirect to login
      window.location.href = '/'
    }

    const token = localStorage.getItem('token')

    fetch('http://localhost:3000/user/getUserByToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tokenUser: localStorage.getItem('token')
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

  return (
    <>
      {user && <main className='flex'>
        <section className='inline-block w-[20dvw] h-[100dvh] bg-[#222831] text-[#EEEEEE] px-8 py-9 source-code-pro-bold'><Sidebar user={user}/></section>
        <section className='inline-block w-[80dvw] h-[100dvh] bg-[#31363F] text-[#EEEEEE] px-8 py-9 source-code-pro-regular '>

          <div className='grid grid-cols-4 grid-rows-2 gap-10'>

            <div className='bg-[#222831] p-4 rounded-lg col-span-4 min-h-[300px]'>
              <h2 className='text-xl source-code-pro-bold'>Gráfico</h2>
            </div>

            <div className='bg-[#222831] p-4 rounded-lg col-span-2 min-h-[300px]'>
              <h2 className='text-xl source-code-pro-bold'>Ingresos</h2>
              <p className='text-sm pb-2 border-b border-solid border-[#eeeeee]'>Explora el listado de tus ingresos</p>

              <table className='w-full mt-4 text-xs'>
                <thead>
                  <tr>
                    <th className='text-left'>Título</th>
                    <th className='text-left'>Concepto</th>
                    <th className='text-left'>Tipo</th>
                    <th className='text-left'>Categoría</th>
                    <th className='text-left'>Importe</th>
                  </tr>
                </thead>
                <tbody>
                  {incomes.map(income => (
                    <tr key={income._id}>
                      <td>{income.title}</td>
                      <td>{income.description}</td>
                      <td>{income.type}</td>
                      <td>{income.category}</td>
                      <td>{income.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className='bg-[#222831] p-4 rounded-lg col-span-2 min-h-[300px]'>
              <h2 className='text-xl source-code-pro-bold'>Gastos</h2>
              <p className='text-sm pb-2 border-b border-solid border-[#eeeeee]'>Explora el listado de tus gastos</p>

              <table className='w-full mt-4 text-xs'>
                <thead>
                  <tr>
                    <th className='text-left'>Título</th>
                    <th className='text-left'>Concepto</th>
                    <th className='text-left'>Tipo</th>
                    <th className='text-left'>Categoría</th>
                    <th className='text-left'>Importe</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map(expense => (
                    <tr key={expense._id}>
                      <td>{expense.title}</td>
                      <td>{expense.description}</td>
                      <td>{expense.type}</td>
                      <td>{expense.category}</td>
                      <td>{expense.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>}
    </>
  )
}

export default Dashboard