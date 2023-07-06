import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { User, usersList } from '../../../utils';
import { Flex } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import '../../../utils/index.css';
import Form from './Form';
import { COLUMNS } from './columns';
import { deleteUser, fetchUsers, getUsers, getUsersTotalCount, useAppDispatch } from 'store';
import { ButtonForm, ModalConfirm, PageLayout, Pagination, Table, theme } from 'ui';
import { darkModePalette } from 'ui/themes/colors';

const Users = () => {
  const take = 10;
  const dispatch = useAppDispatch();
  const users = useSelector(getUsers);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState('');
  const [id, setId] = useState<number | null | undefined>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalConfirmButton, setModalConfirmButton] = useState('');
  const [skip, setSkip] = useState<number>(0);

  const totalRows = useSelector(getUsersTotalCount);
  const totalPages = Math.floor(totalRows / take);

  const handleShow = () => {
    setShow(!show);

    if (user) {
      setUser(null);
    }

    setModalTitle('Aggiungi nuovo utente');
    setModalConfirmButton('Conferma');
  };

  const handleEdit = (item: User) => {
    setUser(item);
    setShow(true);
    setModalTitle('Modifica Utente');
    setModalConfirmButton('Salva');
  };

  const handleDelete = (object: User) => {
    setId(object.id);
    setUserName(object.firstName);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = async () => {
    setId(null);
    setUserName('');
    setOpenConfirm(false);
  };

  const handleDeleteConfirm = async () => {
    await dispatch(deleteUser(id));
    await dispatch(
      fetchUsers({
        search: '',
        skip: skip,
        take: take,
      }),
    );
    return handleCloseConfirm();
  };

  useEffect(() => {
    dispatch(
      fetchUsers({
        search: '',
        skip: skip,
        take: take,
      }),
    );
  }, []);

  return (
    <PageLayout>
      <ButtonForm
        marginTop='4rem'
        marginBottom='1rem'
        display={show ? 'none' : 'block'}
        leftIcon={<AddIcon />}
        width='fit-content'
        onClick={handleShow}
        backgroundColor={darkModePalette.pink100}
        _hover={{ bg: darkModePalette.pink70 }}
        fontSize={theme.fontSizes.xxs}
      >
        Aggiungi nuovo
      </ButtonForm>
      <Flex direction='column'>
        <Table
          data={users}
          columns={COLUMNS}
          display={show ? 'none' : 'block'}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
        <p
          style={{
            display: show ? 'block' : 'none',
            color: `${darkModePalette.pink100}`,
            fontSize: theme.fontSizes.lg,
          }}
        >
          {modalTitle}
        </p>
        <Form
          show={show}
          selectList={usersList}
          skip={skip}
          take={take}
          handleShow={handleShow}
          user={user}
          modalConfirmButton={modalConfirmButton}
        />
        <Pagination
          skip={skip}
          setSkip={setSkip}
          take={take}
          fetch={fetchUsers}
          show={show}
          totalPages={totalPages}
        />
        <ModalConfirm
          handleDelete={handleDeleteConfirm}
          handleClose={handleCloseConfirm}
          open={openConfirm}
          objectName={userName}
        />
      </Flex>
    </PageLayout>
  );
};

export default Users;
