import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { User } from '../../../utils';
import { Flex } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import '../../../utils/index.css';
import Form from './Form';
import { handleColumns } from './columns';
import {
  deleteUser,
  fetchUsers,
  getResources,
  getUsers,
  getUsersTotalCount,
  useAppDispatch,
} from 'store';
import { ButtonForm, ModalConfirm, PageLayout, Pagination, Table, theme } from 'ui';
import { darkModePalette } from 'ui/themes/colors';
import { useTranslation } from 'react-i18next';

const Users = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const users = useSelector(getUsers);
  const resources = useSelector(getResources);

  const [show, setShow] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const [id, setId] = useState<number | null | undefined>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [skip, setSkip] = useState<number>(0);
  const take = 10;

  const totalRows = useSelector(getUsersTotalCount);
  const totalPages = Math.floor(totalRows / take);

  const [resourcesList, setResourcesList] = useState<any[]>([{}]);

  const handleShow = () => {
    setShow(!show);

    if (user) {
      setUser(null);
    }
  };

  const handleEdit = (item: User) => {
    setUser(item);
    setShow(true);
  };

  const handleDelete = (object: User) => {
    setId(object.id);
    setUser(object);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = async () => {
    setId(null);
    setUser(null);
    setOpenConfirm(false);
  };

  const handleDeleteConfirm = async () => {
    await dispatch(deleteUser(id));
    await dispatch(fetchUsers());
    return handleCloseConfirm();
  };

  const removeDuplicates = () => {
    setResourcesList(
      resourcesList.filter(
        (ele, ind) =>
          ind === resourcesList.findIndex((elem) => elem.id === ele.id && elem.value === ele.value),
      ),
    );
  };

  useEffect(() => {
    resourcesList.pop();
    for (const resource of resources) {
      resource.firstName != undefined && resource.lastName != undefined
        ? resourcesList.push({ value: `${resource.firstName} ${resource.lastName}` })
        : null;
    }
    removeDuplicates();
  }, [resources]);

  useEffect(() => {
    dispatch(fetchUsers({ dispatch: dispatch }));
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
        {t('pagina.aggiungi-nuovo')}
      </ButtonForm>
      <Flex direction='column'>
        <Table
          data={users}
          columns={handleColumns()}
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
          {user ? t('users.modifica-utente') : t('users.aggiungi-nuovo-utente')}
        </p>
        <Form
          show={show}
          selectList={resourcesList}
          skip={skip}
          take={take}
          handleShow={handleShow}
          user={user}
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
          objectName={user?.firstName}
        />
      </Flex>
    </PageLayout>
  );
};

export default Users;
