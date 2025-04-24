/**
 *
 * ListAdminQuizes
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ContainerFlex, Row, Col } from 'components/ContainerFlex';
import ItemQuiz from './ItemQuiz';

const Container = styled.div`
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1);
`;

function ListAdminQuizes({ quizes, onClick, ...props }) {
  return (
    <Container>
      {quizes.map((item, idx) => (
        <ItemQuiz
          {...props}
          key={item.id}
          quiz={item}
          idx={idx + 1}
          onClick={onClick}
        />
      ))}
    </Container>
  );
}

ListAdminQuizes.propTypes = {
  quizes: PropTypes.array,
  onClick: PropTypes.func,
};

export default ListAdminQuizes;
