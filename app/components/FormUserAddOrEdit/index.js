/**
 *
 * FormUserOrEdit
 *
 */

import React from 'react';
import Form from 'components/Form';

import PropTypes from 'prop-types';
// import styled from 'styled-components';
import ButtonAdmin from 'components/ButtonAdmin';
import InputAdmin from 'components/InputAdmin';

import validate from './validate';

function FormUserAddOrEdit({ handleSubmit }) {
  return (
    <Form onSubmit={handleSubmit}>
      <InputAdmin label="Nombre" type="text" name="nombre" required />
      <InputAdmin label="Usuario" type="text" name="usuario" required />
      <InputAdmin label="Grupo" type="text" name="grupo" required />
      <InputAdmin
        label="Contraseña"
        type="password"
        name="contrasenia"
        required
      />
      <InputAdmin
        type="password"
        label="Confirmar Contraseña"
        name="contrasenia_confirmacion"
        required
      />
      <ButtonAdmin type="submit" onClick={handleSubmit}>
        Save
      </ButtonAdmin>
    </Form>
  );
}

FormUserAddOrEdit.propTypes = {
  handleSubmit: PropTypes.func,
};

export default FormUserAddOrEdit;
