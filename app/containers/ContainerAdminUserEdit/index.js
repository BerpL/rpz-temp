import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getAllGroups } from 'services/GroupServices';
import { updateUser, getUserById } from 'services/UserServices';

/* component */
import TitleModuleAdmin from 'components/TitleModuleAdmin';
import ContainerModal from 'components/ContainerModal';
import Modal from 'components/Modal';

import Select from 'components/Select';
import Input, { ErrorInput } from 'components/Input';
import Form from 'components/Form';
import ButtonAdmin from 'components/ButtonAdmin';
import useForm from 'hooks/useForm';

// utils
import { showNotification } from 'utils/notification';

async function validate(values) {
  const errors = {};

  if (values.correo && !/\S+@\S+\.\S+/.test(values.correo)) {
    errors.correo = 'The email is invalid';
  }

  if (!values.apellidos) {
    errors.apellidos = 'The surnames are required';
  }

  if (!values.usuario) {
    errors.usuario = 'The username is required';
  }

  if (!values.nombres) {
    errors.nombres = 'The names are required';
  }
  if (!values.idGrupo) {
    errors.idGrupo = 'The group is required';
  }

  return errors;
}

function ContainerAdminUserEdit({ open = false, onClose, onSave, id }) {
  const [groups, setGroups] = useState([]);

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    setValues,
    setErrors,
    setIsSubmitting,
  } = useForm(update, validate);

  async function update() {
    const bodyFormData = new FormData();
    
    if (values.contrasenia) {
      bodyFormData.set('Contrasenia', values.contrasenia);
      bodyFormData.set('ContraseniaConfirmacion', values.contrasenia);
    }
    
    bodyFormData.set('Apellidos', values.apellidos);
    bodyFormData.set('Nombres', values.nombres);
    bodyFormData.set('Correo', values.correo);
    bodyFormData.set('Usuario', values.usuario);
    bodyFormData.set('IdGrupo', values.idGrupo);
    bodyFormData.set('Estado', true);
  
    try {
      onClose();
      await updateUser(id, bodyFormData, '');
      onSave();
      showNotification('success', 'User updated successfully');
    } catch {
      showNotification('danger', 'Error updating user');
    }
  }  

  const getInitialData = async () => {
    try {
      const response = await getUserById(id);

      setValues(response.data.data);

      const responseGroups = await getAllGroups();
      const options = [];
      responseGroups.data.data.forEach(option => {
        options.push({
          key: option.idGrupo,
          value: option.nombre,
        });
      });

      setGroups(options);
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(
    () => {
      if (open) {
        getInitialData();
      } else {
        setIsSubmitting(false);
        setValues({});
        setErrors({});
      }
    },
    [open],
  );

  return (
    <Modal open={open} onClose={onClose}>
      <ContainerModal>
        <TitleModuleAdmin title="Edit User" />
        <Form onSubmit={handleSubmit} method="post" autoComplete="off">
          <Input
            onChange={handleChange}
            placeholder="Names"
            name="nombres"
            value={values.nombres || ''}
            type="text"
          />
          <ErrorInput>{errors.nombres && errors.nombres}</ErrorInput>
          <Input
            onChange={handleChange}
            placeholder="Surnames"
            name="apellidos"
            value={values.apellidos || ''}
            type="text"
          />
          <ErrorInput>{errors.apellidos && errors.apellidos}</ErrorInput>
          <Input
            onChange={handleChange}
            placeholder="Username"
            name="usuario"
            value={values.usuario || ''}
            type="text"
          />
          <ErrorInput>{errors.usuario && errors.usuario}</ErrorInput>
          <Input
            onChange={handleChange}
            placeholder="Email"
            name="correo"
            value={values.correo || ''}
            type="text"
          />
          <ErrorInput>{errors.correo && errors.correo}</ErrorInput>
          <Select
            options={groups}
            value={values.idGrupo || ''}
            message="Select a group"
            onChange={handleChange}
            name="idGrupo"
            style={{ marginBottom: 10, fontSize: 13 }}
          />
          <ErrorInput>{errors.idGrupo && errors.idGrupo}</ErrorInput>
          <Input
            onChange={handleChange}
            name="contrasenia"
            placeholder="Password"
            type="password"
          />
          <ErrorInput>{errors.contrasenia && errors.contrasenia}</ErrorInput>
          <ButtonAdmin type="submit">Save</ButtonAdmin>
        </Form>
      </ContainerModal>
    </Modal>
  );
}

ContainerAdminUserEdit.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  id: PropTypes.any,
};

export default ContainerAdminUserEdit;
