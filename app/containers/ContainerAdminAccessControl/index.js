import React, { useState, useEffect } from 'react';

/* components */
import ContainerAdminAccessControlView from 'containers/ContainerAdminAccessControlView';
import Modal from 'components/Modal';
import styled from 'styled-components';

// componentes V2
import ActionsContainer from 'V2/components/AdminActions';
import Search from 'V2/components/AdminSearch';
import Table from 'V2/components/Table';

/* services */
import { getAllIncomes } from 'services/IncomeServices';

const TableContainer = styled.div`
  @media (max-width: 577px) {
    width: 100%;
    overflow: scroll;
  }
`;
function ContainerAdminAccessControl() {
  const [accesses, setAccesses] = useState([]);
  const [openView, setOpenView] = useState(false);
  const [income, setIncome] = useState(null);
  const [filteredAccesses, setFilteredAccesses] = useState([]);

  const getIncomes = async () => {
    try {
      const response = await getAllIncomes();
      setAccesses(response.data.data);
      setFilteredAccesses(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getIncomes();
  }, []);

  const handleView = id => {
    const x = accesses.find(d => d.idUsuario === id);
    setIncome(x);
    setOpenView(true);
  };

  const titles = [
    {
      key: 'nombre',
      value: 'Name',
    },
    {
      key: 'usuario',
      value: 'User',
    },
    {
      key: 'ingresos',
      value: 'Logins',
    },
    {
      key: 'tiempoTotalEntrenamiento',
      value: 'Total Training Time (HH:MM)',
    },
  ];

  const actions = [
    {
      action: 'view',
      value: 'idUsuario',
      onClick: handleView,
    },
  ];

  const handleCloseModalView = () => setOpenView(false);

  const handleChange = value => {
    setFilteredAccesses(
      accesses.filter(group => {
        const nombre = group.nombre.toLowerCase();
        const query = value.toLowerCase();
        return nombre.includes(query);
      }),
    );
  };

  return (
    <>
      <ActionsContainer>
        <Search onChange={handleChange} />
      </ActionsContainer>
      <TableContainer>
        <Table titles={titles} data={filteredAccesses} actions={actions} />
      </TableContainer>
      <Modal
        styles={{ modal: { maxWidth: '80%' } }}
        open={openView}
        onClose={handleCloseModalView}
      >
        <ContainerAdminAccessControlView income={income} />
      </Modal>
    </>
  );
}

ContainerAdminAccessControl.propTypes = {};

export default ContainerAdminAccessControl;
