/**
 *
 * ListAdminPid
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Pid from './Pid';

function ListAdminPid({ pids, ...props }) {
  return (
    <div>
      {pids.map(pid => (
        <Pid {...props} key={pid.id} pid={pid} />
      ))}
    </div>
  );
}

ListAdminPid.propTypes = {
  pids: PropTypes.array,
};

export default ListAdminPid;
