import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import AccordionAdminModules from 'components/AccordionAdminModules';
import Modal from 'components/Modal';
import TitleModuleAdmin from 'components/TitleModuleAdmin';
import ContainerModal from 'components/ContainerModal';
import LoaderForm from 'components/LoaderForm';
import Form from 'components/Form';
import ButtonAdmin from 'components/ButtonAdmin';

/* servicios */
import { getAllModules } from 'services/ModuleServices';
import { getGroupById, setGroupAccess } from 'services/GroupServices';

/* Hooks */
import useForm from 'hooks/useForm';

const initialState = {
  accesos: [],
};

const getSubModulesWithState = (accesos, subModulos) => {
  if (accesos && subModulos) {
    accesos.forEach(acceso => {
      const subModulo = subModulos.find(sub => sub.idSubModulo === acceso.idSubModulo);
      if (subModulo) {
        subModulo.acceso = acceso.acceso;
      }
    });
  }
  return subModulos;
};

const getModulesWithState = (accesos, modulos) => {
  if (accesos && modulos) {
    accesos.forEach(acceso => {
      const modulo = modulos.find(mod => mod.idModulo === acceso.idModulo);
      if (modulo) {
        modulo.acceso = acceso.acceso;
        modulo.subModulos = getSubModulesWithState(acceso.accesosSubModulos, modulo.subModulos);
      }
    });
  }
  return modulos;
};

function EditAccessModal({ open = false, onClose, id, onSave }) {
  const [modules, setModules] = useState([]);
  const [isLoadingModules, setIsLoadingModules] = useState(true);
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [hasErrorUpdatingModules, setHasErrorUpdatingModules] = useState(false);

  const {
    values,
    handleChange,
    handleSubmit,
    setValues,
    setErrors,
    setIsSubmitting,
  } = useForm(update, () => ({}));

  const getInitialState = async () => {
    try {
      const response = await axios.all([getAllModules(), getGroupById(id)]);
      const {
        data: { data: dataModules },
      } = response[0];
      const {
        data: { data },
      } = response[1];
      // Inicializa los módulos y submódulos con "acceso" correcto
      const modulosConAcceso = getModulesWithState(data.accesosModulos, dataModules);
      setModules(modulosConAcceso); // Setea el estado de los módulos con los datos correctos
      setValues({ accesos: data.accesosModulos }); // Setea los valores iniciales de accesos
      setIsLoadingModules(false);
    } catch {
      setIsLoadingModules(false);
      setHasErrorUpdatingModules(true);
    }
  };

  // Convertir "acceso" a "Estado" antes de enviar al backend
  const preparePayload = () => {
    const preparedValues = values.accesos.map(acceso => ({
      ...acceso,
      Estado: acceso.acceso,  // Convertir "acceso" a "Estado"
      accesosSubModulos: acceso.accesosSubModulos.map(subAcceso => ({
        ...subAcceso,
        Estado: subAcceso.acceso  // Convertir "acceso" a "Estado"
      }))
    }));
    return preparedValues;
  };

  async function update() {
    setIsLoadingSave(true);
    try {
      const payload = preparePayload();  // Preparar el payload antes de enviarlo
      await setGroupAccess(id, payload); // Envía los accesos actualizados con el campo "Estado"
      setIsLoadingSave(false);
      onClose();
      onSave(); // Llama a onSave después de guardar
    } catch (e) {
      setIsLoadingSave(false);
      setHasErrorUpdatingModules(false);
    }
  }

  const handleAccessChange = (moduleId, submoduleId, value) => {
    setValues(prevValues => {
      const newAccess = [...prevValues.accesos];

      if (submoduleId) {
        // Actualizar submódulo
        const moduleIndex = newAccess.findIndex(acc => acc.idModulo === moduleId);
        if (moduleIndex !== -1) {
          const submoduleIndex = newAccess[moduleIndex].accesosSubModulos.findIndex(
            subAcc => subAcc.idSubModulo === submoduleId
          );
          if (submoduleIndex !== -1) {
            newAccess[moduleIndex].accesosSubModulos[submoduleIndex].acceso = value;
          }
        }
      } else {
        // Actualizar módulo
        const moduleIndex = newAccess.findIndex(acc => acc.idModulo === moduleId);
        if (moduleIndex !== -1) {
          newAccess[moduleIndex].acceso = value;
        }
      }

      return { ...prevValues, accesos: newAccess };
    });
  };

  useEffect(
    () => {
      if (open) {
        setValues(initialState);
        getInitialState();
      } else {
        setValues(initialState);
        setErrors({});
        setIsSubmitting(false);
        setIsLoadingModules(true);
        setIsLoadingSave(false);
        setHasErrorUpdatingModules(false);
      }
    },
    [open],
  );

  const isLoading = isLoadingModules || isLoadingSave;

  return (
    <Modal open={open} onClose={onClose}>
      <ContainerModal>
        {!isLoading && (
          <div>
            {hasErrorUpdatingModules && <div>Error</div>}
            <TitleModuleAdmin title="Edit Access" />
            <Form onSubmit={handleSubmit} method="post" autoComplete="off">
              <AccordionAdminModules
                modules={modules}
                name="access"
                onChange={handleAccessChange} // Cambiar el manejador de cambio a la nueva función
              />
              <ButtonAdmin type="submit">Save</ButtonAdmin>
            </Form>
          </div>
        )}
        {isLoading && <LoaderForm />}
      </ContainerModal>
    </Modal>
  );
}

EditAccessModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  id: PropTypes.number,
};

export default EditAccessModal;
