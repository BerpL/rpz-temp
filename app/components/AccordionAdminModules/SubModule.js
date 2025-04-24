/**
 *
 * AccordionAdminModules
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CheckBox from 'components/CheckBox';

const ModuleTitleSubContainer = styled.div`
  padding: 10px 0px;
  font-size: 12px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:last-child {
    border-bottom: none;
  }

  &:first-child {
    border-top: 1px solid #ddd;
  }
`;

const TitleSubModule = styled.span`
  color: ${({ theme: { text } }) => text};
  margin-left: 29px;
`;

function SubModule({ subModule, onChange, idGrupo, idModulo }) {
  const handleChange = params => {
    onChange({
      acceso: params.selected,
      idSubModulo: params.subModule.idSubModulo,
      idGrupo,
      idModulo,
    });
  };
  return (
    <ModuleTitleSubContainer>
      <TitleSubModule>{subModule.nombre}</TitleSubModule>
      <CheckBox
        withName={false}
        identifier={subModule.idSubModulo}
        name={subModule.nombre}
        selected={subModule.acceso}
        onChange={(identifier, name, selected) =>
          handleChange({ subModule, identifier, name, selected })
        }
      />
    </ModuleTitleSubContainer>
  );
}

SubModule.propTypes = {
  subModule: PropTypes.object,
  onChange: PropTypes.func,
  idGrupo: PropTypes.any,
  idModulo: PropTypes.any,
};

export default SubModule;
