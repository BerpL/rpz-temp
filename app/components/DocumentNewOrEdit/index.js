/**
 *
 * DocumentNewOrEdit
 *
 */

import React from 'react';
import Form from 'components/Form';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import ButtonAdmin from 'components/ButtonAdmin';
import InputAdmin from 'components/InputAdmin';
// import validate from './validate';
import Modal from 'components/Modal';

import TitleModuleAdmin from 'components/TitleModuleAdmin';
import CheckBox from 'components/CheckBox';
import ContainerModal from 'components/ContainerModal';

function DocumentNewOrEdit({ handleSubmit, open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <ContainerModal>
        <TitleModuleAdmin title="New Document" />
        <Form onSubmit={handleSubmit}>
          <InputAdmin label="Name" type="text" name="nombre" required />
          <CheckBox name="Visualizar" />
          <ButtonAdmin type="submit">Save</ButtonAdmin>
        </Form>
      </ContainerModal>
    </Modal>
  );
}

DocumentNewOrEdit.propTypes = {
  handleSubmit: PropTypes.func,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default DocumentNewOrEdit;
