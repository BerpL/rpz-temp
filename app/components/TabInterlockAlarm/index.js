/**
 *
 * TabInterlockAlarm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import ListAlarmInterlock from 'components/ListAlarmInterlock';
import GridInterfaceInterlockAlarm from 'components/GridInterfaceInterlockAlarm';
import Tab from 'components/Tab';

function TabInterlockAlarm({ itemsTab, interlocksAlarms, header, interfaces }) {
  return (
    <Tab items={itemsTab} header={header}>
      <ListAlarmInterlock files={interlocksAlarms} />
      <GridInterfaceInterlockAlarm interfaces={interfaces} />
    </Tab>
  );
}

TabInterlockAlarm.propTypes = {
  interlocksAlarms: PropTypes.array,
  interfaces: PropTypes.array,
  itemsTab: PropTypes.array,
  header: PropTypes.any,
};

export default TabInterlockAlarm;
