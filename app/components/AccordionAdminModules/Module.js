/**
 *
 * Module
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CheckBox from 'components/CheckBox';
// import { MdExpandLess, MdExpandMore } from 'react-icons/md/index.esm';
// import SubModuleList from './SubModuleList';

const Icon = icon => styled(icon)`
  color: ${({ theme: { textSubtitle } }) => textSubtitle};
  font-size: 22px;
  margin-right: 7px;
  font-weight: bold;
`;

const SubModulesContainer = styled.div`
  display: ${({ open }) => (open ? 'block' : 'none')};
`;

const ModuleContainer = styled.div`
  border-bottom: 1px solid #ccc;
  &:last-child {
    border-bottom: none;
  }
`;

const ModuleTitleContainer = styled.div`
  padding: 10px 0px;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleModule = styled.span`
  color: ${({ theme: { textSubtitle } }) => textSubtitle};
  cursor: pointer;
  display: block;
`;

function Module({ module: module_, onChange, idGrupo }) {
  const [openSubModules, setOpenSubModules] = useState(false);
  // const ToggleIcon = Icon(openSubModules ? MdExpandLess : MdExpandMore);
  // const { subModulos } = module_;
  // const hasSubModules = subModulos && subModulos.length > 0;

  const handleChange = params => {
    onChange({
      acceso: params.selected,
      idModulo: params.modulo.idModulo,
      idGrupo,
    });
  };
  return (
    <ModuleContainer key={module_.identificador}>
      <ModuleTitleContainer>
        <TitleModule onClick={() => setOpenSubModules(!openSubModules)}>
          {/* <ToggleIcon /> */}
          {module_.nombre}
        </TitleModule>
        <CheckBox
          withName={false}
          identifier={module_.idModulo}
          name={module_.nombre}
          selected={module_.acceso}
          onChange={(identifier, name, selected) =>
            handleChange({ modulo: module_, identifier, name, selected })
          }
        />
      </ModuleTitleContainer>
      {/* {hasSubModules && (
        <SubModulesContainer open={openSubModules}>
          <SubModuleList
            idModulo={module_.idModulo}
            idGrupo={idGrupo}
            subModules={subModulos}
            onChange={onChange}
          />
        </SubModulesContainer>
      )} */}
    </ModuleContainer>
  );
}

Module.propTypes = {
  module: PropTypes.object,
  onChange: PropTypes.func,
  idGrupo: PropTypes.any,
};

export default Module;
