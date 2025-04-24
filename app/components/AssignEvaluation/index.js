/**
 *
 * AssignEvaluation
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, InnerContainer, Title } from './Styles';
import Tabs from './Tabs';

function AssignEvaluation({ idEvaluacionParam }) {
  const [tab, setTab] = useState({
    index: 1,
  });

  const changeTabHandler = id => {
    if (id === 1) {
      setTab(t => ({ ...t, index: 1 }));
    }

    if (id === 2) {
      setTab(t => ({ ...t, index: 2 }));
    }
  };

  return (
    <Container>
      <InnerContainer>
        <Title>Assign Evaluations</Title>
        <Tabs
          onChangeTab={changeTabHandler}
          idEvaluacion={idEvaluacionParam}
          selected={tab.index}
        />
      </InnerContainer>
    </Container>
  );
}

AssignEvaluation.propTypes = {
  idEvaluacionParam: PropTypes.any,
};

export default AssignEvaluation;
