import React, {useEffect, useRef, useState} from 'react'
import Sidebar from '../modules/Sidebar'
import { useTranslation } from 'react-i18next';
import { RiArrowDownSLine, RiArrowUpSLine } from '@remixicon/react';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';

const Dashboard = () => {
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

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  
  const tablesHeaders = [
    {    header: 'Título',    accessorKey: 'title',    enableSorting: true,    meta: {      align: 'text-left',    },  },  {    header: 'Concepto',    accessorKey: 'description',    enableSorting: false,    meta: {      align: 'text-left',    },  },  {    header: 'Tipo',    accessorKey: 'type',    enableSorting: false,    meta: {      align: 'text-left',    },  },  {    header: 'Categoría',    accessorKey: 'category',    enableSorting: false,    meta: {      align: 'text-left',    },  },  {    header: 'Importe',    accessorKey: 'amount',    enableSorting: true,    meta: {      align: 'text-left',    }, },
  ];

  const tableExpenses = useReactTable({
    data: expenses,
    columns: tablesHeaders,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [
        {
          id: 'expense',
          desc: false,
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
          id: 'income',
          desc: false,
        },
      ],
    },
  });
  

  return (
    <>
      {user && <main className='flex'>
        <section className='inline-block w-[20dvw] h-[100dvh] bg-[#222831] text-[#EEEEEE] px-8 py-9 ubuntu-bold'><Sidebar user={user}/></section>
        <section className='inline-block w-[80dvw] h-[100dvh] bg-[#31363F] text-[#EEEEEE] px-8 py-9 ubuntu-regular overflow-y-auto'>

          <div className='grid grid-cols-4 grid-rows-2 gap-5'>

            <div className='bg-[#222831] p-4 rounded-lg col-span-4 min-h-[300px]'>
              <h2 className='text-xl ubuntu-bold mb-3'>Gráfico</h2>
            </div>

            <div className='bg-[#222831] p-4 rounded-lg col-span-4 2xl:col-span-2 min-h-[300px]'>
              <h2 className='text-xl ubuntu-bold mb-3'>Ingresos</h2>

              <Table>
                <TableHead>
                  {tableIncomes.getHeaderGroups().map((headerGroup) => (
                    <TableRow
                      key={headerGroup.id}
                      className="border-b border-tremor-border dark:border-dark-tremor-border"
                    >
                      {headerGroup.headers.map((header) => (
                        <TableHeaderCell
                          key={header.id}
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                              header.column.getToggleSortingHandler()(event);
                            }
                          }}
                          className={classNames(
                            header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            'px-0.5 py-1.5',
                          )}
                          tabIndex={header.column.getCanSort() ? 0 : -1}
                          aria-sort={header.column.getIsSorted()}
                        >
                          <div
                            className={classNames(
                              header.column.columnDef.enableSorting === true
                                ? 'flex items-center justify-between gap-2 hover:bg-tremor-background-muted hover:dark:bg-dark-tremor-background-muted'
                                : header.column.columnDef.meta.align,
                              'rounded-tremor-default px-3 py-1.5',
                            )}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                            {header.column.getCanSort() ? (
                              <div className="-space-y-2">
                                <RiArrowUpSLine
                                  className={classNames(
                                    'size-4 text-tremor-content-strong dark:text-dark-tremor-content-strong',
                                    header.column.getIsSorted() === 'desc'
                                      ? 'opacity-30'
                                      : '',
                                  )}
                                  aria-hidden={true}
                                />
                                <RiArrowDownSLine
                                  className={classNames(
                                    'size-4 text-tremor-content-strong dark:text-dark-tremor-content-strong',
                                    header.column.getIsSorted() === 'asc'
                                      ? 'opacity-30'
                                      : '',
                                  )}
                                  aria-hidden={true}
                                />
                              </div>
                            ) : null}
                          </div>
                        </TableHeaderCell>
                      ))}
                    </TableRow>
                  ))}
                </TableHead>
                <TableBody>
                  {tableIncomes.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className={classNames(cell.column.columnDef.meta.align)}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className='bg-[#222831] p-4 rounded-lg col-span-4 2xl:col-span-2 min-h-[300px]'>
              <h2 className='text-xl ubuntu-bold mb-3'>Gastos</h2>

              <Table>
                <TableHead>
                  {tableExpenses.getHeaderGroups().map((headerGroup) => (
                    <TableRow
                      key={headerGroup.id}
                      className="border-b border-tremor-border dark:border-dark-tremor-border"
                    >
                      {headerGroup.headers.map((header) => (
                        <TableHeaderCell
                          key={header.id}
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                              header.column.getToggleSortingHandler()(event);
                            }
                          }}
                          className={classNames(
                            header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            'px-0.5 py-1.5',
                          )}
                          tabIndex={header.column.getCanSort() ? 0 : -1}
                          aria-sort={header.column.getIsSorted()}
                        >
                          <div
                            className={classNames(
                              header.column.columnDef.enableSorting === true
                                ? 'flex items-center justify-between gap-2 hover:bg-tremor-background-muted hover:dark:bg-dark-tremor-background-muted'
                                : header.column.columnDef.meta.align,
                              'rounded-tremor-default px-3 py-1.5',
                            )}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                            {header.column.getCanSort() ? (
                              <div className="-space-y-2">
                                <RiArrowUpSLine
                                  className={classNames(
                                    'size-4 text-tremor-content-strong dark:text-dark-tremor-content-strong',
                                    header.column.getIsSorted() === 'desc'
                                      ? 'opacity-30'
                                      : '',
                                  )}
                                  aria-hidden={true}
                                />
                                <RiArrowDownSLine
                                  className={classNames(
                                    'size-4 text-tremor-content-strong dark:text-dark-tremor-content-strong',
                                    header.column.getIsSorted() === 'asc'
                                      ? 'opacity-30'
                                      : '',
                                  )}
                                  aria-hidden={true}
                                />
                              </div>
                            ) : null}
                          </div>
                        </TableHeaderCell>
                      ))}
                    </TableRow>
                  ))}
                </TableHead>
                <TableBody>
                  {tableExpenses.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className={classNames(cell.column.columnDef.meta.align)}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>
      </main>}
    </>
  )
}

export default Dashboard