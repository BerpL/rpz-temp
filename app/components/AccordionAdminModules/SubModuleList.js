/**
 *
 * SubModules
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SubModule from './SubModule';

SubModuleList.propTypes = {
  SubModule: PropTypes.object,
};

function SubModuleList({ subModules, onChange, idGrupo, idModulo }) {
  return subModules.map(subModule => (
    <SubModule
      key={subModule.idSubModulo}
      subModule={subModule}
      onChange={onChange}
      idGrupo={idGrupo}
      idModulo={idModulo}
    />
  ));
}

SubModuleList.propTypes = {
  subModules: PropTypes.array,
  onChange: PropTypes.func,
  idGrupo: PropTypes.any,
  idModulo: PropTypes.any,
};

export default SubModuleList;
