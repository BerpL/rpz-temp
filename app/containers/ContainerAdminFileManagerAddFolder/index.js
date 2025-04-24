/**
 *
 * ContainerAdminFileManagerAddFolder
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

/** components * */
import FormFolderAddOrEdit from 'components/FormFolderAddOrEdit';
import ContainerModal from 'components/ContainerModal';
import TitleModuleAdmin from 'components/TitleModuleAdmin';

function ContainerAdminFileManagerAddFolder({ onAddFolder }) {
  const handleSubmit = event => {
    event.preventDefault();
    return false;
    // onAddFolder(event.target.value);
  };

  return (
    <ContainerModal>
      <TitleModuleAdmin title="New Folder" />
      <FormFolderAddOrEdit onSubmit={handleSubmit} />
    </ContainerModal>
  );
}

ContainerAdminFileManagerAddFolder.propTypes = {
  onAddFolder: PropTypes.func,
};

export default ContainerAdminFileManagerAddFolder;
