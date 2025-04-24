import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

/* components */
import ContainerModal from 'components/ContainerModal';
import TitleModuleAdmin from 'components/TitleModuleAdmin';
import Form from 'components/Form';
import Modal from 'components/Modal';
import ButtonAdmin from 'components/ButtonAdmin';
import Input, { ErrorInput } from 'components/Input';

/* Hooks */
import useForm from 'hooks/useForm';

/* servicios */
import { createGroup } from 'services/GroupServices';

// utils
import { showNotification } from 'utils/notification';

const validate = values => {
  const errors = {};

  if (!values.nombre) {
    errors.nombre = 'El Nombre es requerido';
  }

  return errors;
};

const initialGroupState = {
  nombre: '',
  descripcion: '',
};

function ContainerAdminGroupNew({ open = false, onClose, onSave }) {
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
      await createGroup(bodyFormData, '');
      onSave();
      showNotification('success', 'Group created successfully');
    } catch {
      showNotification('danger', 'Error creating group');
    }
  }

  useEffect(
    () => {
      if (open) {
        setValues(initialGroupState);
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
        <TitleModuleAdmin title="New Group" />
        <Form onSubmit={handleSubmit} method="post" autoComplete="off">
          <Input
            value={values.nombre || ''}
            onChange={handleChange}
            name="nombre"
            placeholder="Name"
            type="text"
          />
          <ErrorInput>{errors.nombre && errors.nombre}</ErrorInput>
          <Input
            value={values.descripcion || ''}
            onChange={handleChange}
            name="descripcion"
            type="text"
            placeholder="Description"
          />
          <ButtonAdmin type="submit">Save</ButtonAdmin>
        </Form>
      </ContainerModal>
    </Modal>
  );
}

ContainerAdminGroupNew.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
};

export default ContainerAdminGroupNew;
