/**
 *
 * ListQuestions
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ItemGroup from './ItemGroup';

const Container = styled.div``;

function ListQuestions({ groups, ...props }) {
  return (
    <Container>
      {groups.map(group => (
        <ItemGroup key={group.id} group={group} {...props} />
      ))}
    </Container>
  );
}

ListQuestions.propTypes = {
  groups: PropTypes.array,
};

export default ListQuestions;
