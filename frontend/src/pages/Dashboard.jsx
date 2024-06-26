import React, {useEffect, useRef} from 'react'
import Sidebar from '../modules/Sidebar'
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const chartRef = useRef(null);

  const DATA_COUNT = 7;
  const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'GASTOS',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'INGRESOS',
        data: [28, 48, 40, 19, 86, 27, 90],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      }
    ]
  }

  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Gráfico de gastos e ingresos mensuales'
        }
      }
    },
  }

  let isMounted = false

  useEffect(() => {
    if(!isMounted) {
      const chart = new Chart(chartRef.current.getContext('2d'), config)
      isMounted = true
    }
  }, [])

  return (
    <main className='flex'>
      <section className='inline-block w-[20dvw] h-[100dvh] bg-[#222831] text-[#EEEEEE] px-8 py-9 source-code-pro-bold'><Sidebar /></section>
      <section className='inline-block w-[80dvw] h-[100dvh] bg-[#31363F] text-[#EEEEEE] px-8 py-9 source-code-pro-regular '>
        <h1 className='text-3xl source-code-pro-bold'>Dashboard</h1>
        <canvas ref={chartRef} id="myChart" width="400" height="400" className='w-[33dvw] h-[50dvh]'></canvas>
      </section>
    </main>
  )
}

export default Dashboard