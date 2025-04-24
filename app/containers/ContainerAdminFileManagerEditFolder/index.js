/**
 *
 * ContainerAdminFileManagerEditFolder
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

/** components * */
import FormFolderAddOrEdit from 'components/FormFolderAddOrEdit';
import ContainerModal from 'components/ContainerModal';
import TitleModuleAdmin from 'components/TitleModuleAdmin';

function ContainerAdminFileManagerEditFolder({ onEditFolder }) {
  const handleSubmit = event => {
    event.preventDefault();
    return false;
    // onAddFolder(event.target.value);
  };
  return (
    <ContainerModal>
      <TitleModuleAdmin title="Cambiar Nombre" />
      <FormFolderAddOrEdit onSubmit={handleSubmit} />
    </ContainerModal>
  );
}

ContainerAdminFileManagerEditFolder.propTypes = {
  onEditFolder: PropTypes.func,
};

export default ContainerAdminFileManagerEditFolder;
