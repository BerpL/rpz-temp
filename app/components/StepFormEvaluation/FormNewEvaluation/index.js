/**
 *
 * FormNewEvaluation
 *
 */

import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

/* components */
import Form from 'components/Form';
import Toggle from 'components/Toggle';
import GroupInput from 'components/Input/GroupInput';
import GroupTextarea from 'components/Input/GroupTextarea';

const Container = styled.div`
  height: 100%;
  width: 500px;
  margin: auto;
`;

const GroupInputs = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  text-align: center;
  margin: 0;
  padding: 24px 0px 23px 0px;
`;

function FormNewEvaluation() {
  const [disabled, setDisabled] = useState(true);
  const handleToggle = e => {
    setDisabled(!e.target.checked);
  };

  const toggle = <Toggle onChange={handleToggle} />;
  return (
    <Container>
      <Title>NEW ASSESSMENT</Title>
      <Form>
        <GroupInput labelText="Assessment Name" />
        <GroupInputs>
          <GroupInput style={{ width: 240 }} labelText="Maximum Score" />
          <GroupInput
            toggle={toggle}
            disabled={disabled}
            style={{ width: 240 }}
            labelText="Minimum Score"
          />
        </GroupInputs>
        <GroupInputs>
          <GroupInput style={{ width: 240 }} labelText="Duration" />
          <GroupInput style={{ width: 240 }} labelText="Attempts" />
        </GroupInputs>
        <GroupTextarea labelText="Description" />
      </Form>
    </Container>
  );
}

FormNewEvaluation.propTypes = {};

export default FormNewEvaluation;
