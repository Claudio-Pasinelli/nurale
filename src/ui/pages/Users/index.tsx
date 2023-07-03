import { useSelector } from 'react-redux';
import { fetchUsers, getUsers, getUsersPagination } from '../../../store';
import { useEffect, useState } from 'react';
import { User, UsersCols, usersList } from '../../../utils';
import { ModalConfirm, PageLayout, Table } from '../../molecules';
import { Flex } from '@chakra-ui/react';
import { ButtonForm } from '../../atoms';
import { darkModePalette } from '../../themes/colors';
import { theme } from '../../themes';
import { AddIcon } from '@chakra-ui/icons';
import '../../../utils/index.css';
import { useAppDispatch } from '../../../store/applicationStore';
import { Pagination } from '../../organisms';
import Form from './Form';
import { deleteUser } from '../../../store/user';
interface Props
{
    name?: string;
}

const Users = ({name}:Props) =>
{
    const take = 10;
    const dispatch = useAppDispatch();
    const users = useSelector(getUsers);
    const [show, setShow] = useState(false);
    const [user, setUser] = useState<User| null>(null);
    const [userName, setUserName] = useState('')
    const [id, setId] = useState<number| null | undefined>(null);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalConfirmButton, setModalConfirmButton] = useState('');
    const [skip, setSkip] = useState<number>(0);

    const totalRows = useSelector(getUsersPagination);
    const totalPages = Math.floor(totalRows/take);

    const handleShow = () =>
    {
        setShow(!show);
        
        if(user)
        {
            setUser(null);
        }

        setModalTitle('Aggiungi nuovo utente');
        setModalConfirmButton('Conferma');
    }

    const handleEdit = (item: User)=>
    {
        setUser(item);
        setShow(true);
        setModalTitle('Modifica Utente');
        setModalConfirmButton('Salva');
    }

    const handleDelete = (object: User)=>
    {
        setId(object.id);
        setUserName(object.firstName)
        setOpenConfirm(true);
    }

    const handleCloseConfirm = async ()=>
    {
        setId(null);
        setUserName('');
        setOpenConfirm(false);
    }

    const handleDeleteConfirm= async ()=>
    {
        await dispatch(deleteUser(id));
        await dispatch(fetchUsers(
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
        dispatch(fetchUsers(
            {
                search: '',
                skip: skip,
                take: take,
            }
        ));
    },[]);

    return (
        <PageLayout name={name}>
            <ButtonForm marginTop='4rem' marginBottom='1rem' display={show ? 'none' : 'block'} leftIcon={<AddIcon />} width='fit-content' onClick={handleShow} backgroundColor={darkModePalette.pink100} _hover={{bg: darkModePalette.pink70}} fontSize={theme.fontSizes.xxs}>Aggiungi nuovo</ButtonForm>
            <Flex direction='column'>
                <Table data={users} columns={UsersCols} display={show ? 'none' : 'block'} handleDelete={handleDelete} handleEdit={handleEdit}/>
                <p style={{display: show ? 'block' : 'none', color: `${darkModePalette.pink100}`, fontSize: theme.fontSizes.lg }}>
                    {modalTitle}
                </p>
                <Form show={show} selectList={usersList} skip={skip} take={take} handleShow={handleShow} user={user} modalConfirmButton={modalConfirmButton}/>
                <Pagination skip={skip} setSkip={setSkip} take={take} fetch={fetchUsers} show={show} totalPages={totalPages}/>
                <ModalConfirm handleDelete={handleDeleteConfirm} handleClose={handleCloseConfirm} open={openConfirm} objectName={userName}/>
            </Flex>
        </PageLayout>
    )
}

export default Users;