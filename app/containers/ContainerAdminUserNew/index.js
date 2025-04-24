import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getAllGroups } from 'services/GroupServices';
import { createUser, getAvailableUser } from 'services/UserServices';

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

const isAvailableUser = async username => {
  try {
    const response = await getAvailableUser(username);
    return response.data.data.disponible;
  } catch {
    return false;
  }
};

async function validate(values) {
  const errors = {};

  if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'The email is invalid';
  }
  if (!values.password) {
    errors.password = 'The password is required';
  }
  if (!values.surnames) {
    errors.surnames = 'The surnames are required';
  }

  if (!values.username) {
    errors.username = 'The username is required';
  }

  const isAvailableUserFlag = await isAvailableUser(values.username);

  if (values.username && !isAvailableUserFlag) {
    errors.username = `The username ${values.username} is not available`;
  }
  if (!values.names) {
    errors.names = 'The names are required';
  }
  if (!values.groupId) {
    errors.groupId = 'The group is required';
  }

  return errors;
}

const initialUserState = {
  names: '',
  surnames: '',
  status: '',
  username: '',
  email: '',
  groupId: 0,
  photoLocation: '',
  userId: 0,
};

function ContainerAdminUserNew({ open = false, onClose, onSave }) {
  const [groups, setGroups] = useState([]);
  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    setValues,
    setErrors,
    setIsSubmitting,
  } = useForm(create, validate);

  async function create() {
    const bodyFormData = new FormData();
    bodyFormData.set('Contrasenia', values.password);
    bodyFormData.set('ContraseniaConfirmacion', values.password);
    bodyFormData.set('Estado', 'true');
    bodyFormData.set('Apellidos', values.surnames);
    bodyFormData.set('Nombres', values.names);
    bodyFormData.set('Correo', values.email);
    bodyFormData.set('Usuario', values.username);
    bodyFormData.set('IdGrupo', values.groupId);

    try {
      onClose();
      await createUser(bodyFormData, '');
      showNotification('success', 'User created successfully');
      onSave();
    } catch {
      showNotification('danger', 'Error creating user');
    }
  }

  const getInitialData = async () => {
    try {
      const response = await getAllGroups();
      const options = [];
      response.data.data.forEach(option => {
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
        setValues(initialUserState);
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
        <TitleModuleAdmin title="New User" />
        <Form onSubmit={handleSubmit} method="post" autoComplete="off">
          <Input
            onChange={handleChange}
            placeholder="Names"
            name="names"
            value={values.names || ''}
            type="text"
          />
          <ErrorInput>{errors.names && errors.names}</ErrorInput>
          <Input
            onChange={handleChange}
            placeholder="Surnames"
            name="surnames"
            value={values.surnames || ''}
            type="text"
          />
          <ErrorInput>{errors.surnames && errors.surnames}</ErrorInput>
          <Input
            onChange={handleChange}
            placeholder="Username"
            name="username"
            value={values.username || ''}
            type="text"
          />
          <ErrorInput>{errors.username && errors.username}</ErrorInput>
          <Input
            onChange={handleChange}
            placeholder="Email"
            name="email"
            value={values.email || ''}
            type="text"
          />
          <ErrorInput>{errors.email && errors.email}</ErrorInput>
          <Select
            options={groups}
            value={values.groupId || ''}
            message="Select a group"
            onChange={handleChange}
            name="groupId"
            style={{ marginBottom: 10, fontSize: 13 }}
          />
          <ErrorInput>{errors.groupId && errors.groupId}</ErrorInput>
          <Input
            onChange={handleChange}
            name="password"
            placeholder="Password"
            type="password"
          />
          <ErrorInput>{errors.password && errors.password}</ErrorInput>
          <ButtonAdmin type="submit">Save</ButtonAdmin>
        </Form>
      </ContainerModal>
    </Modal>
  );
}

ContainerAdminUserNew.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
};

export default ContainerAdminUserNew;
