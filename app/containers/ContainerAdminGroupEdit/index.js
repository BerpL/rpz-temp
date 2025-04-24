/**
 *
 * ContainerAdminGroupEdit
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import ContainerModal from 'components/ContainerModal';
import TitleModuleAdmin from 'components/TitleModuleAdmin';
import Form from 'components/Form';
import Modal from 'components/Modal';
import ButtonAdmin from 'components/ButtonAdmin';
import Input, { ErrorInput } from 'components/Input';

/* Hooks */
import useForm from 'hooks/useForm';

/* servicios */
import { updateGroup, getGroupById } from 'services/GroupServices';

// utils
import { showNotification } from 'utils/notification';

const validate = values => {
  const errors = {};

  if (!values.nombre) {
    errors.nombre = 'El Nombre es requerido';
  }

  return errors;
};

function ContainerAdminGroupEdit({ open = false, onClose, onSave, id }) {
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
    bodyFormData.set('Nombre', values.nombre);
    bodyFormData.set('Descripcion', values.descripcion);

    try {
      onClose();
      await updateGroup(id, bodyFormData, '');
      onSave();
      showNotification('success', 'Group updated successfully');
    } catch {
      showNotification('danger', 'Error updating group');
    }
  }

  const getGroup = async () => {
    try {
      const {
        data: { data },
      } = await getGroupById(id);

      setValues(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(
    () => {
      if (open) {
        getGroup();
      } else {
        setIsSubmitting(false);
        setValues({});
        setErrors({});
      }
    },
    [open],
  );

  // console.log(modules);

  return (
    <Modal open={open} onClose={onClose}>
      <ContainerModal>
        <TitleModuleAdmin title="Edit Group" />
        <Form onSubmit={handleSubmit} method="post" autoComplete="off">
          <Input
            value={values.nombre || ''}
            onChange={handleChange}
            name="nombre"
            placeholder="Nombre"
            type="text"
          />
          <ErrorInput>{errors.nombre && errors.nombre}</ErrorInput>
          <Input
            value={values.descripcion || ''}
            onChange={handleChange}
            name="descripcion"
            type="text"
            placeholder="Descripcion"
          />
          <ButtonAdmin type="submit">Save</ButtonAdmin>
        </Form>
      </ContainerModal>
    </Modal>
  );
}

ContainerAdminGroupEdit.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  id: PropTypes.any,
};

export default ContainerAdminGroupEdit;
