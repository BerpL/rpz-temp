import React, { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { MdAdd } from 'react-icons/md/index.esm';

/* components */
import EditAccessModal from 'components/EditAccessModal';
import ContainerAdminGroupNew from 'containers/ContainerAdminGroupNew';
import ContainerAdminGroupEdit from 'containers/ContainerAdminGroupEdit';

// components V2
import ActionsContainer from 'V2/components/AdminActions';
import Button from 'V2/components/AdminButton';
import Search from 'V2/components/AdminSearch';
import Table from 'V2/components/Table';

// services
import { getAllGroups, deleteGroup } from 'services/GroupServices';

// utils
import { showNotification } from 'utils/notification';

import 'react-confirm-alert/src/react-confirm-alert.css';

function ContainerAdminGroups() {
  const [idEdit, setIdEdit] = useState('-1');
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [openModalNewGroup, setOpenModalNewGroup] = useState(false);
  const [openModalEditAccess, setOpenModalEditAccess] = useState(false);
  const [openModalEditGroup, setOpenModalEditGroup] = useState(false);

  const getGroups = async () => {
    try {
      const response = await getAllGroups();
      const { data } = response.data;
      setGroups(data);
      setFilteredGroups(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

  const handleDelete = async id => {
    try {
      await deleteGroup(id);
      await getGroups();
      showNotification('success', 'Group successfully deleted');
    } catch (err) {
      if (!err.response)
        return showNotification('danger', `Error deleting group`);
      const { message } = err.response.data;
      return showNotification('danger', message);
    }
  };

  const submit = id => {
    confirmAlert({
      title: 'Delete',
      message: 'Do you want to delete this group?',
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
    setOpenModalEditGroup(true);
  };

  const handleEditAccess = id => {
    setIdEdit(id);
    setOpenModalEditAccess(true);
  };

  const titles = [
    {
      key: 'nombre',
      value: 'Name',
    },
    {
      key: 'descripcion',
      value: 'Description',
      weight: 2,
    },
  ];

  const actions = [
    {
      action: 'view',
      value: 'idGrupo',
      name: 'Access',
      onClick: handleEditAccess,
    },
    {
      action: 'edit',
      value: 'idGrupo',
      onClick: handleEdit,
    },
    {
      action: 'delete',
      value: 'idGrupo',
      onClick: submit,
    },
  ];

  const handleChange = value => {
    setFilteredGroups(
      groups.filter(group => {
        const nombre = group.nombre.toLowerCase();
        const query = value.toLowerCase();
        return nombre.includes(query);
      }),
    );
  };

  const handleCloseModalEditAccessGroup = () => setOpenModalEditAccess(false);
  const handleCloseModalNewGroup = () => setOpenModalNewGroup(false);
  const handleCloseModalEditGroup = () => setOpenModalEditGroup(false);

  const handleSaveGroup = () => {
    getGroups(); // Recarga los grupos después de guardar
  };

  return (
    <>
      <ActionsContainer>
        <Search onChange={handleChange} />
        <Button onClick={() => setOpenModalNewGroup(true)}>
          <MdAdd />
          New Group
        </Button>
      </ActionsContainer>

      <Table titles={titles} data={filteredGroups} actions={actions} />

      <ContainerAdminGroupNew
        open={openModalNewGroup}
        onSave={handleSaveGroup}
        onClose={handleCloseModalNewGroup}
      />

      <EditAccessModal
        open={openModalEditAccess}
        onClose={handleCloseModalEditAccessGroup}
        id={idEdit}
        onSave={handleSaveGroup} // Asegura que los grupos se recarguen después de guardar
      />

      <ContainerAdminGroupEdit
        open={openModalEditGroup}
        onClose={handleCloseModalEditGroup}
        onSave={handleSaveGroup}
        id={idEdit}
      />
    </>
  );
}

ContainerAdminGroups.propTypes = {};

export default ContainerAdminGroups;
