/**
 *
 * StepFormEvaluation
 *
 */

import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* components */
import useWindowSize from 'hooks/useWindowSize';
import Tabs from './Tabs';
import FormNewEvaluation from './FormNewEvaluation';
import AddQuestion from './AddQuestion';
import Assignment from './Assignment';
import SetPeriod from './SetPeriod';

/* hooks */

const tabs = [
  {
    index: 1,
    isFinished: true,
    isOpened: true,
    title: 'Step 1',
    description: 'Create a new evaluation',
  },
  {
    index: 2,
    isFinished: true,
    isOpened: true,
    title: 'Step 2',
    description: 'Add Questions',
  },
  {
    index: 3,
    isFinished: true,
    isOpened: true,
    title: 'Step 3',
    description: 'Assign Evaluation',
  },
  {
    index: 4,
    isFinished: true,
    isOpened: true,
    title: 'Step 4',
    description: 'Evaluation period (optional)',
  },
];


function StepFormEvaluation() {
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
    if (tab > 0 && tab < 4) setTab(tab + 1);
  };

  const getTab = index => {
    switch (index) {
      case 1:
        return <FormNewEvaluation />;
      case 2:
        return <AddQuestion />;
      case 3:
        return <Assignment />;
      case 4:
        return <SetPeriod />;
      default:
        return '';
    }
  };

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
      <Tabs
        items={tabs}
        onChange={handleChange}
        onClickNext={handleClickNext}
        tabSelected={tab}
      >
        {getTab(tab)}
      </Tabs>
    </div>
  );
}

StepFormEvaluation.propTypes = {};

export default StepFormEvaluation;
