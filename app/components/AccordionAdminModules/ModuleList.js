/**
 *
 * ModuleList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Module from './Module';

function ModuleList({ modules, onChange, idGrupo }) {
  return modules.map(module_ => (
    <Module
      key={module_.idModulo}
      module={module_}
      onChange={onChange}
      idGrupo={idGrupo}
    />
  ));
}

ModuleList.propTypes = {
  modules: PropTypes.array,
  onChange: PropTypes.func,
  idGrupo: PropTypes.any,
};

export default ModuleList;
