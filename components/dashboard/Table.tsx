import React, {useMemo, useEffect} from 'react';
import { useTable } from 'react-table';
import fake_data from "fake_data.json";
import {createColumnHelper, getCoreRowModel} from "@tanstack/table-core";
import {flexRender, useReactTable} from "@tanstack/react-table";


type TableData = {
    invoiceNumber: string;
    invoiceDate: string;
    provider: string;
    partner: string;
    address: string;
    status: string;
}
const defaultData: TableData[] = [
    {
        invoiceNumber: "123",
        invoiceDate: "12.12.2020",
        provider: "Janez Novak",
        partner: "Janez Novak",
        address: "Ljubljana",
        status: "Plačano",

    }
    ]
const columnHelper = createColumnHelper<Rows>()

const columns = [
    columnHelper.accessor('invoiceNumber', {
        cell: info => info.getValue(),
        header: () => <span>Številka računa</span>,
    }),
    columnHelper.accessor('invoiceDate', {
        cell: info => info.getValue(),
        header: () => <span>Datum računa</span>,
    }),
    columnHelper.accessor('provider', {
        header: () => 'Izvajalec',
        cell: info => info.getValue(),
      //  footer: info => info.column.id,
    }),
    columnHelper.accessor('partner', {
        header: () => 'Partner',
        cell: info => info.getValue(),
    }),

    columnHelper.accessor('status', {
        header: 'Status',
        cell: info => info.getValue(),

    }),
]

const Table = () => {
    const [data, setData] = React.useState(() => [...defaultData])
    const rerender = React.useReducer(() => ({}), {})[1]
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    return (
        <div className="p-2">
            <table>
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map(row => (

                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (

                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>


                        ))}
                    </tr>
                ))}
                </tbody>
                <tfoot>

                </tfoot>
            </table>
            <div className="h-4" />
            <button onClick={() => rerender()} className="border p-2">
                Rerender
            </button>
        </div>
    );

};

export default Table;