/**
 *
 * Modals
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

/* containers */
import Modal from 'components/Modal';
import ModifyPid from 'components/ContainerModifyPid';
import ModifyPidFolder from 'components/ContainerModifyPidFolder';

/* utils */

function Modals({
  uploadProgress,
  openAddPid,
  onEditPid,
  openAddFolder,
  openEditFolder,
  idEditFolder,
  onAddFolder,
  onEditFolder,
  onCloseAddPid,
  onCloseAddFolder,
  onCloseEditFolder,
  openEditPid,
  onCloseEditPid,
  idEditPid,
  onAddPid,
}) {
  return (
    <div>
      <Modal
        padding="0"
        overflow="visible"
        open={openAddPid}
        onClose={onCloseAddPid}
      >
        <ModifyPid onModify={onAddPid} onClose={onCloseAddPid} uploadProgress={uploadProgress} />
      </Modal>
      <Modal
        padding="0"
        overflow="visible"
        open={openEditPid}
        onClose={onCloseEditPid}
      >
        <ModifyPid
          id={idEditPid}
          onModify={onEditPid}
          onClose={onCloseEditPid}
          uploadProgress={uploadProgress}
        />
      </Modal>
      <Modal bg="#ffffff" open={openAddFolder} onClose={onCloseAddFolder}>
        <ModifyPidFolder onModify={onAddFolder} onClose={onCloseAddFolder} />
      </Modal>
      <Modal bg="#ffffff" open={openEditFolder} onClose={onCloseEditFolder}>
        <ModifyPidFolder
          id={idEditFolder}
          onModify={onEditFolder}
          onClose={onCloseEditFolder}
        />
      </Modal>
    </div>
  );
}

Modals.propTypes = {
  openAddPid: PropTypes.bool,
  openAddFolder: PropTypes.bool,
  openEditFolder: PropTypes.bool,
  idEditFolder: PropTypes.any,
  idEditPid: PropTypes.any,
  onAddFolder: PropTypes.func,
  onEditFolder: PropTypes.func,
  onCloseAddPid: PropTypes.func,
  onCloseAddFolder: PropTypes.func,
  onCloseEditPid: PropTypes.func,
  openEditPid: PropTypes.bool,
  onCloseEditFolder: PropTypes.func,
  onAddPid: PropTypes.func,
  onEditPid: PropTypes.func,
};

export default Modals;
