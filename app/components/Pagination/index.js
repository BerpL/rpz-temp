/**
 *
 * Pagination
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md/index.esm';
import { rgba } from 'polished';

const Button = styled.div`
  font-size: 16px;
  use-select: none;
  width: 30px;
  height: 30px;
  background: ${({ disabled, theme: { primaryLight } }) =>
    disabled ? '#cccccc' : primaryLight};
  color: ${({ theme: { base } }) => base};
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 5px 0px
    ${({ disabled, theme: { primaryLight } }) =>
    disabled ? 'transparent' : rgba(primaryLight, 0.4)};
`;

const Container = styled.div`
  display: flex;
  font-size: 13px;
  user-select: none;
  align-items: center;
  margin-top: 20px;
  justify-content: flex-end;
  span {
    margin: 0 10px;
  }
`;

function Pagination({ next, prev, max, current, hasNextPage, hasPrevPage }) {
  return (
    <Container>
      <Button disabled={!hasPrevPage} onClick={() => hasPrevPage && prev()}>
        <MdChevronLeft />
      </Button>

      <span>
        {current} of {max}
      </span>
      <Button disabled={!hasNextPage} onClick={() => hasNextPage && next()}>
        <MdChevronRight />
      </Button>
    </Container>
  );
}

Pagination.propTypes = {};

export default Pagination;
