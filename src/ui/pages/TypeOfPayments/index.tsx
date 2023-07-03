import { useSelector } from 'react-redux';
import { ChangeEvent, useEffect, useState } from 'react';
import { ModalConfirm, PageLayout, SelectFilter, Table } from '../../molecules';
import { Flex } from '@chakra-ui/react';
import { ButtonForm, Filter } from '../../atoms';
import { darkModePalette } from '../../themes/colors';
import { theme } from '../../themes';
import { AddIcon } from '@chakra-ui/icons';
import { useAppDispatch } from '../../../store/applicationStore';
import { TypeOfPayment, TypeOfPaymentsCols } from '../../../utils';
import { Pagination } from '../../organisms';
import Form from './Form';
import '../../../utils/index.css';
import { fetchTypeOfPayments, getTypeOfPayments, getTypeOfPaymentsPagination } from '../../../store/typeOfPayments';
import { deleteTypeOfPayment } from '../../../store';

interface Props
{
    name?: string;
}

const Skills = ({name}:Props) =>
{
    const dispatch = useAppDispatch();

    const skills = useSelector(getTypeOfPayments);
    
    const [show, setShow] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    
    const [showFilters, setShowFilters] = useState(false);
    const [isFilterUsed, setIsFilterUsed] = useState(false);
    const [typeOfPaymentTypeSearch, setTypeOfPaymentTypeSearch] = useState('');
    const [typeOfPayment, setTypeOfPayment] = useState<TypeOfPayment| null>(null)
    const [skillName, setTypeOfPaymentName] = useState('')
    const [id, setId] = useState<number| null | undefined>(null);
    const [modalTitle, setModalTitle] = useState('');
    const [modalConfirmButton, setModalConfirmButton] = useState('');

    const [skip, setSkip] = useState<number>(0);
    const take = 5;

    const totalRows = useSelector(getTypeOfPaymentsPagination);
    const totalPages = Math.floor(totalRows/take);

    const handleShow = () =>
    {
        setShow(!show);
        handleFilters;

        if(typeOfPayment)
        {
            setTypeOfPayment(null);
        }

        setModalTitle('Aggiungi nuovo Tipo di Pagamento');
        setModalConfirmButton('Conferma');
    }

    const handleFilters = () =>
    {
        setShowFilters(!showFilters);
    }

    const emptyFilter = () =>
    {
        setTypeOfPaymentTypeSearch('');
        setIsFilterUsed(false);

        dispatch(fetchTypeOfPayments(
            {
                search: '',
                skip: skip,
                take: take,
            }
        ));
    }

    const handleChangeFilter = (event: ChangeEvent<HTMLSelectElement>) =>
    {
        setTypeOfPaymentTypeSearch(event.target.value);
    }

    // const fetchTypeOfPaymentsFiltered = async() =>
    // {
    //     await dispatch(fetchTypeOfPayments(
    //         {
    //             skillType: typeOfPaymentTypeSearch,
    //             skip: skip,
    //             take: take,
    //         }
    //     ));
    // }

    // const fetchTypeOfPaymentsFiltered = ()=>
    // {
    //     fetchTypeOfPaymentsFiltered();

    //     setIsFilterUsed(true);
    // }

    const handleEdit = (item: TypeOfPayment)=>
    {
        setTypeOfPayment(item);
        setShow(true);
        setModalTitle('Modifica Tipo di Pagamento');
        setModalConfirmButton('Salva');
    }

    const handleDelete = (object: TypeOfPayment)=>
    {
        setId(object.id);
        setTypeOfPaymentName(object.name)
        setOpenConfirm(true);
    }

    const handleCloseConfirm = async ()=>
    {
        setId(null);
        setTypeOfPaymentName('');
        setOpenConfirm(false);
    }

    const handleDeleteConfirm= async () =>
    {
        await dispatch(deleteTypeOfPayment(id));
        await dispatch(fetchTypeOfPayments(
            {
                search: '',
                skip: skip,
                take: take,
            }
        ));
        return handleCloseConfirm();
    }

    useEffect(()=>
    {
        dispatch(fetchTypeOfPayments(
            {
                search: '',
                skip: skip,
                take: take,
            }
        ));
        
    },[]);

    return (
        <PageLayout name={name}>
            <Flex placeContent='space-between'>
                <ButtonForm marginTop='4rem' marginBottom='1rem' display={show ? 'none' : 'block'} leftIcon={<AddIcon />} width='fit-content' onClick={handleShow} backgroundColor={darkModePalette.pink100} _hover={{bg: darkModePalette.pink70}} fontSize={theme.fontSizes.xxs}>
                    Aggiungi nuovo
                </ButtonForm>
                {/* <Filter isFilterUsed={isFilterUsed} show={show} showFilters={showFilters} handleFilters={handleFilters}>
                    <Flex width='100%' direction='column' marginTop={'1.7rem'}>
                        <SelectFilter options={skillsList} value={skillTypeSearch} onChange={handleChangeFilter} name='skillTypeSearch' label='Tipo di skill' fontWeight={theme.fontWeights.bold}/>
                        <Flex justifyContent='space-around'>
                            <ButtonForm marginTop='4rem' marginBottom='1rem' display={show ? 'none' : 'block'} width='fit-content' onClick={emptyFilter} backgroundColor={darkModePalette.pink100} _hover={{bg: darkModePalette.pink70}} fontSize={theme.fontSizes.xxs}>
                                Svuota filtri
                            </ButtonForm>
                            <ButtonForm marginTop='4rem' marginBottom='1rem' display={show ? 'none' : 'block'} width='fit-content' onClick={searchSkills} backgroundColor={darkModePalette.pink100} _hover={{bg: darkModePalette.pink70}} fontSize={theme.fontSizes.xxs}>
                                Conferma
                            </ButtonForm>
                        </Flex>
                    </Flex>
                </Filter> */}
            </Flex>
            <Flex direction='column'>
                <Table data={skills} columns={TypeOfPaymentsCols} display={show ? 'none' : 'block'} handleDelete={handleDelete} handleEdit={handleEdit}/>
                <p style={{display: show ? 'block' : 'none', color: `${darkModePalette.pink100}`, fontSize: theme.fontSizes.lg }}>
                    {modalTitle}
                </p>
                <Form show={show} skip={skip} take={take} handleShow={handleShow} typeOfPayment={typeOfPayment} modalConfirmButton={modalConfirmButton}/>
                {/* {
                    isFilterUsed ? <Pagination skip={skip} setSkip={setSkip} take={take} fetch={fetchTypeOfPayments} fetchFiltered={fetchTypeOfPaymentsFiltered} show={show} totalPages={totalPages}/>
                    : <Pagination skip={skip} setSkip={setSkip} take={take} fetch={fetchTypeOfPayments} show={show} totalPages={totalPages}/>
                } */}
                <ModalConfirm handleDelete={handleDeleteConfirm} handleClose={handleCloseConfirm} open={openConfirm} objectName={skillName}/>
            </Flex>
        </PageLayout>
    )
}

export default Skills;