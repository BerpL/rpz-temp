/**
 *
 * FormFolderAddOrEdit
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Form from 'components/Form';
import InputAdmin from 'components/InputAdmin';
import ButtonAdmin from 'components/ButtonAdmin';

// import styled from 'styled-components';

function FormFolderAddOrEdit({ handleSubmit }) {
  return (
    <Form onSubmit={handleSubmit}>
      <InputAdmin label="Nombre" type="text" name="nombre" required />
      <ButtonAdmin type="submit" onClick={handleSubmit}>
        Save
      </ButtonAdmin>
    </Form>
  );
}

FormFolderAddOrEdit.propTypes = {
  handleSubmit: PropTypes.func,
};

export default FormFolderAddOrEdit;
