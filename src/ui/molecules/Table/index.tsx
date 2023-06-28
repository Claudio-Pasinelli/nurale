import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { theme } from '../../themes';
import './index.css'

interface Props
{
    data: any
    columns: any
    display?: string;
}

const TableComponent = ({data, columns, display = 'block'}: Props) =>
{
    const tableInstance = useReactTable(
        {
            data: data,
            columns: columns,
            getCoreRowModel: getCoreRowModel()
        });

    const ColumnModel = tableInstance.getHeaderGroups()
    const RowModel = tableInstance.getRowModel();
    // console.log(ColumnModel)

    return (
        <TableContainer width='100%' borderRadius='10px' border='1px solid #857dac' overflow='hidden' display={display}>
            <Table variant='striped' colorScheme='gray'>
                <Thead>
                    {ColumnModel.map((headerGroup) => 
                    (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) =>
                            (
                            <Th key={header.index} color='black' fontSize={theme.fontSizes.xxs} textTransform='none'>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </Th> 
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody>
                    {RowModel.rows.map((row) =>
                    (
                        <Tr key={row.index}>
                            {row.getVisibleCells().map((cell) =>
                            (
                                <Td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default TableComponent;