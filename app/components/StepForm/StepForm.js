/**
 *
 * StepFormEvaluation
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* components */
import useWindowSize from 'hooks/useWindowSize';
import Tabs from './Tabs';

/* hooks */

function StepFormEvaluation({ tabs, onSave, initialValues }) {
  const WindowSize = useWindowSize({ onResize: () => {} });
  const width = WindowSize.width * 0.9;
  const height = WindowSize.height * 0.7;
  const maxWidth = 1640;
  const minWidth = 1000;
  const minHeight = 600;
  const maxHeight = 848;
  const padding = '0 46px';

  const [tab, setTab] = useState(1);

  const handleChange = index => {
    setTab(index);
  };

  const handleClickNext = () => {
    if (tab > 0 && tab < tabs.length) setTab(tab + 1);
  };

  const { Tab } = tabs[tab - 1];

  return (
    <div
      style={{
        width,
        height,
        maxWidth,
        minWidth,
        minHeight,
        maxHeight,
        padding,
      }}
    >
      <Tabs items={tabs} onChange={handleChange} tabSelected={tab}>
        {Tab && (
          <Tab
            onClickNext={handleClickNext}
            initialValues={initialValues}
            onSave={onSave}
          />
        )}
      </Tabs>
    </div>
  );
}

StepFormEvaluation.propTypes = {
  tabs: PropTypes.array,
  onSave: PropTypes.func,
  initialValues: PropTypes.object,
};

export default StepFormEvaluation;
