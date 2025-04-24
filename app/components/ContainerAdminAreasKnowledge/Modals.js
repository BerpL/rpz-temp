/**
 *
 * Modals
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

/* containers */
import Modal from 'components/Modal';
import { ContainerAddEditQuestion as ContainerModifyQ } from 'components/ContainerAddEditQuestion';
import ContainerModifyFolder from 'components/ContainerModifyAreaKnowledge';

/* utils */

function Modals({
  openAddQuestion,
  openAddFolder,
  openEditFolder,
  idEditFolder,
  onAddFolder,
  onEditFolder,
  onCloseAddQuestion,
  onCloseAddFolder,
  onCloseEditFolder,
  openEditQuestion,
  onCloseEditQuestion,
  idEditQ,
  onSave,
  idArea,
}) {
  return (
    <div>
      <Modal
        padding="0"
        overflow="visible"
        open={openAddQuestion}
        onClose={onCloseAddQuestion}
      >
        <ContainerModifyQ
          idArea={idArea}
          onSave={onSave}
          onClose={onCloseAddQuestion}
        />
      </Modal>
      <Modal
        padding="0"
        overflow="visible"
        open={openEditQuestion}
        onClose={onCloseEditQuestion}
      >
        <ContainerModifyQ
          id={idEditQ}
          idArea={idArea}
          onSave={onSave}
          onClose={onCloseAddQuestion}
        />
      </Modal>
      <Modal bg="#ffffff" open={openAddFolder} onClose={onCloseAddFolder}>
        <ContainerModifyFolder
          onModify={onAddFolder}
          onClose={onCloseAddFolder}
        />
      </Modal>
      <Modal bg="#ffffff" open={openEditFolder} onClose={onCloseEditFolder}>
        <ContainerModifyFolder
          id={idEditFolder}
          onModify={onEditFolder}
          onClose={onCloseEditFolder}
        />
      </Modal>
    </div>
  );
}

Modals.propTypes = {
  openAddQuestion: PropTypes.bool,
  openAddFolder: PropTypes.bool,
  openEditFolder: PropTypes.bool,
  idEditFolder: PropTypes.any,
  idEditQ: PropTypes.any,
  onAddFolder: PropTypes.func,
  onEditFolder: PropTypes.func,
  onCloseAddQuestion: PropTypes.func,
  onCloseAddFolder: PropTypes.func,
  onCloseEditQuestion: PropTypes.func,
  openEditQuestion: PropTypes.bool,
  onCloseEditFolder: PropTypes.func,
  onSave: PropTypes.func,
  idArea: PropTypes.any,
};

export default Modals;
