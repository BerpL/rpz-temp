/**
 *
 * Modals
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

/* containers */
import Modal from 'components/Modal';
import ContainerModifyFlujoFolder from 'components/ContainerModifyFlujoFolder';
/* utils */

function Modals({
  openAddFolder,
  openEditFolder,
  idEditFolder,
  onAddFolder,
  onEditFolder,
  onCloseAddFolder,
  onCloseEditFolder,
}) {
  return (
    <div>
      <Modal bg="#ffffff" open={openAddFolder} onClose={onCloseAddFolder}>
        <ContainerModifyFlujoFolder
          onModify={onAddFolder}
          onClose={onCloseAddFolder}
        />
      </Modal>
      <Modal bg="#ffffff" open={openEditFolder} onClose={onCloseEditFolder}>
        <ContainerModifyFlujoFolder
          id={idEditFolder}
          onModify={onEditFolder}
          onClose={onCloseEditFolder}
        />
      </Modal>
    </div>
  );
}

Modals.propTypes = {
  openAddFolder: PropTypes.bool,
  openEditFolder: PropTypes.bool,
  idEditFolder: PropTypes.any,
  onAddFolder: PropTypes.func,
  onEditFolder: PropTypes.func,
  onCloseAddFolder: PropTypes.func,
  onCloseEditFolder: PropTypes.func,
};

export default Modals;
