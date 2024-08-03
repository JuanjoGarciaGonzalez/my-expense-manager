import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
  } from '@tremor/react';
import { RiArrowDownSLine, RiArrowUpSLine } from '@remixicon/react';
import {
  flexRender
} from '@tanstack/react-table';

const DashboardTable = ({tableData}) => {
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }
    
  return (
    <Table>
        <TableHead>
            {tableData.getHeaderGroups().map((headerGroup) => (
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
            {tableData.getRowModel().rows.map((row) => (
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
  )
}

export default DashboardTable