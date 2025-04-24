/**
 *
 * Modals
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

/* containers */
import Modal from 'components/Modal';
import ModifyProcedure from 'components/ContainerModifyProcedure';
import ModifyProcedureFolder from 'components/ContainerModifyProcedureFolder';

/* utils */

function Modals({
  uploadProgress,
  openAddProcedure,
  onEditProcedure,
  openAddFolder,
  openEditFolder,
  idEditFolder,
  onAddFolder,
  onEditFolder,
  onCloseAddProcedure,
  onCloseAddFolder,
  onCloseEditFolder,
  openEditProcedure,
  onCloseEditProcedure,
  idEditProcedure,
  onAddProcedure,
}) {
  return (
    <div>
      <Modal
        padding="0"
        overflow="visible"
        open={openAddProcedure}
        onClose={onCloseAddProcedure}
      >
        <ModifyProcedure
          uploadProgress={uploadProgress}
          onModify={onAddProcedure}
          onClose={onCloseAddProcedure}
        />
      </Modal>
      <Modal
        padding="0"
        overflow="visible"
        open={openEditProcedure}
        onClose={onCloseEditProcedure}
      >
        <ModifyProcedure
          uploadProgress={uploadProgress}
          id={idEditProcedure}
          onModify={onEditProcedure}
          onClose={onCloseEditProcedure}
        />
      </Modal>
      <Modal bg="#ffffff" open={openAddFolder} onClose={onCloseAddFolder}>
        <ModifyProcedureFolder
          onModify={onAddFolder}
          onClose={onCloseAddFolder}
        />
      </Modal>
      <Modal bg="#ffffff" open={openEditFolder} onClose={onCloseEditFolder}>
        <ModifyProcedureFolder
          id={idEditFolder}
          onModify={onEditFolder}
          onClose={onCloseEditFolder}
        />
      </Modal>
    </div>
  );
}

Modals.propTypes = {
  openAddProcedure: PropTypes.bool,
  openAddFolder: PropTypes.bool,
  openEditFolder: PropTypes.bool,
  idEditFolder: PropTypes.any,
  idEditProcedure: PropTypes.any,
  onAddFolder: PropTypes.func,
  onEditFolder: PropTypes.func,
  onCloseAddProcedure: PropTypes.func,
  onCloseAddFolder: PropTypes.func,
  onCloseEditProcedure: PropTypes.func,
  openEditProcedure: PropTypes.bool,
  onCloseEditFolder: PropTypes.func,
  onAddProcedure: PropTypes.func,
  onEditProcedure: PropTypes.func,
};

export default Modals;
