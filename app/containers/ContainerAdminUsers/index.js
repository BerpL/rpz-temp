import React, { useState, useEffect, memo, useCallback, useMemo } from 'react';
import { MdAdd } from 'react-icons/md/index.esm';

// componentes
import { confirmAlert } from 'react-confirm-alert';
import ContainerAdminUserNew from 'containers/ContainerAdminUserNew';
import ContainerAdminUserEdit from 'containers/ContainerAdminUserEdit';

// componentes V2
import ActionsContainer from 'V2/components/AdminActions';
import Button from 'V2/components/AdminButton';
import Search from 'V2/components/AdminSearch';
import Table from 'V2/components/Table';

// servicios
import { getAllUsers, deleteUser } from 'services/UserServices';

// utils
import { showNotification } from 'utils/notification';

import 'react-confirm-alert/src/react-confirm-alert.css';

const titles = [
  {
    key: 'nombre',
    value: 'Name',
    weight: 2,
  },
  {
    key: 'usuario',
    value: 'User',
    weight: 1,
  },
  {
    key: 'correo',
    value: 'Email',
    weight: 2,
  },
  {
    key: 'nombreGrupo',
    value: 'Group',
    weight: 1,
  },
];

function ContainerAdminUsers() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [openModalNewUser, setOpenModalNewUser] = useState(false);
  const [openModalEditUser, setOpenModalEditUser] = useState(false);
  const [idEdit, setIdEdit] = useState('-1');

  const handleDelete = async id => {
    try {
      await deleteUser(id);
      await getUsers();
      showNotification('success', 'User deleted successfully');
    } catch (e) {
      showNotification('danger', 'Error deleting user');
    }
  };

  const submit = id => {
    confirmAlert({
      title: 'Delete',
      message: 'Do you want to delete this user?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDelete(id),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const handleEdit = id => {
    setIdEdit(id);
    setOpenModalEditUser(true);
  };

  const actions = [
    {
      action: 'edit',
      value: 'idUsuario',
      onClick: handleEdit,
    },
    {
      action: 'delete',
      value: 'idUsuario',
      onClick: submit,
    },
  ];

  async function getUsers() {
    try {
      const { data: userData } = await getAllUsers();
      setUsers(userData.data);
    } catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  const handleCloseModalNewUser = () => setOpenModalNewUser(false);
  const handleCloseModalEditUser = () => setOpenModalEditUser(false);

  const handleChange = useCallback(value => {
    setSearchText(value.toLowerCase());
  }, []);

  const handleSaveUser = () => {
    getUsers();
  };


  const filteredUsers = useMemo(() => users.filter(user => {
    const nombre = user.nombre.toLowerCase();
    const query = searchText;
    return nombre.includes(query);
  }), [searchText, users]);

  return (
    <>
      <ActionsContainer>
        <Search onChange={handleChange} />
        <Button onClick={() => setOpenModalNewUser(true)}>
          <MdAdd />
          New User
        </Button>
      </ActionsContainer>
      <Table titles={titles} data={filteredUsers} actions={actions} />
      <ContainerAdminUserNew
        onSave={handleSaveUser}
        open={openModalNewUser}
        onClose={handleCloseModalNewUser}
      />
      <ContainerAdminUserEdit
        onSave={handleSaveUser}
        open={openModalEditUser}
        id={idEdit}
        onClose={handleCloseModalEditUser}
      />
    </>
  );
}

export default memo(ContainerAdminUsers);
