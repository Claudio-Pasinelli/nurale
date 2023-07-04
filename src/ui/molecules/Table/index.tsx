import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { theme } from '../../themes';
import './index.css'
import { ButtonForm, Icons } from '../../atoms';

interface Props
{
    data: any
    columns: any
    display?: string;
    handleDelete: (object: any) => void;
    handleEdit: (item: any) => void;
}

const TableComponent = ({data, columns, display = 'block', handleDelete, handleEdit }: Props) =>
{
    const COLUMNHELPER:any = createColumnHelper<any>();

    const columnsHelpers = columns.map((col: any) => {
        return COLUMNHELPER.accessor(col.id, 
        {
            cell: (props: any) => {return col.transform ? col.transform(props.row.original[col.id]) : props.getValue()},
            header: col.name,
        }
    )});

    const tableInstance = useReactTable(
        {
            data: data,
            columns: columnsHelpers,
            getCoreRowModel: getCoreRowModel()
        });

    const ColumnModel = tableInstance.getHeaderGroups();
    const RowModel = tableInstance.getRowModel();

    return (
        <TableContainer width='100%' borderRadius='10px' border='1px solid #857dac' overflow='hidden' display={display}>
            <Table variant='striped' colorScheme='gray'>
            <Thead whiteSpace='normal'>
                {ColumnModel.map((headerGroup) => 
                (
                    <Tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) =>
                        (
                        <Th key={header.index} color='black' fontSize={theme.fontSizes.xxs} textTransform='none'>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                        </Th> 
                        ))}
                        <Th color='black' fontSize={theme.fontSizes.xxs} textTransform='none' textAlign='right'>
                            Azioni
                        </Th> 
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
                                    {
                                        (flexRender(cell.column.columnDef.cell, cell.getContext()) === false)
                                        ?
                                        <Icons name='falseIcon'/>
                                        :
                                        (flexRender(cell.column.columnDef.cell, cell.getContext()) === true)
                                        ? 
                                        <Icons name='trueIcon'/> : flexRender(cell.column.columnDef.cell, cell.getContext())
                                    }
                                </Td>
                            ))}
                            <Td textAlign='right'>
                                <ButtonForm padding='0' onClick={()=> handleEdit(row.original)} backgroundColor='transparent' _hover={{bg: 'transparent'}}><Icons name='edit' size={1.5}/></ButtonForm>
                                <ButtonForm padding='0' onClick={()=> handleDelete(row.original)} backgroundColor='transparent' _hover={{bg: 'transparent'}}><Icons name='deleteIcon' size={1.5}/></ButtonForm>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default TableComponent;