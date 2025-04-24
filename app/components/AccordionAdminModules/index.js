import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ModuleList from './ModuleList';

const AccordionAdminModulesContainer = styled.div`
  margin-bottom: 10px;
  text-align: left;
`;

const Title = styled.span`
  margin-bottom: 7px;
  color: ${({ theme: { textMenu } }) => textMenu};
  font-size: 13px;
  text-align: left;
  display: block;
`;

function AccordionAdminModules({ modules, onChange, idGrupo, name }) {
  const [formattedModules, setFormattedModules] = useState([]);

  function formatSubModules(subModulos) {
    return subModulos.map(subModulo => ({
      idGrupo,
      idSubModulo: subModulo.idSubModulo,
      acceso: subModulo.acceso || false,
      nombre: subModulo.nombre,
    }));
  }

  function formatModules() {
    return modules.map(modulee => ({
      idGrupo,
      idModulo: modulee.idModulo,
      acceso: modulee.acceso || false,
      nombre: modulee.nombre,
      subModulos: formatSubModules(modulee.subModulos),
    }));
  }

  useEffect(() => {
    if (modules.length) {
      setFormattedModules(formatModules());
    }
  }, [modules]);

  const handleChange = params => {
    setFormattedModules(prevModules => {
      // Crear una copia de los módulos
      const updatedModules = prevModules.map(module => {
        if (module.idModulo === params.idModulo) {
          if (!params.idSubModulo) {
            // Actualizar todos los submódulos y el módulo principal
            const updatedSubModules = module.subModulos.map(subMod => ({
              ...subMod,
              acceso: params.acceso, // Usar "acceso" para actualizar el estado
            }));
            return { ...module, acceso: params.acceso, subModulos: updatedSubModules };
          }

          // Actualizar el estado de un submódulo específico
          const updatedSubModules = module.subModulos.map(subMod => {
            if (subMod.idSubModulo === params.idSubModulo) {
              return { ...subMod, acceso: params.acceso }; // Usar "acceso"
            }
            return subMod;
          });

          // Actualizar el estado del módulo si cualquier submódulo está activado
          const isModuleActive = updatedSubModules.some(subMod => subMod.acceso);
          return { ...module, acceso: isModuleActive, subModulos: updatedSubModules };
        }
        return module;
      });

      // Llamada a la función onChange con los parámetros correctos usando "acceso"
      updatedModules.forEach(module => {
        onChange(module.idModulo, null, module.acceso);
        module.subModulos.forEach(submodule => {
          onChange(module.idModulo, submodule.idSubModulo, submodule.acceso);
        });
      });

      return updatedModules;
    });
  };

  return (
    <AccordionAdminModulesContainer>
      <ModuleList
        idGrupo={idGrupo}
        modules={formattedModules}
        onChange={handleChange}
      />
    </AccordionAdminModulesContainer>
  );
}

AccordionAdminModules.propTypes = {
  modules: PropTypes.array,
  onChange: PropTypes.func,
  idGrupo: PropTypes.any,
  name: PropTypes.string,
};

AccordionAdminModules.defaultProps = {
  idGrupo: 1,
};

export default AccordionAdminModules;
