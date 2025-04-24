/**
 *
 * SearchBoxAdmin
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md/index.esm';
import { rgba } from 'polished';

const Container = styled.div`
  position: relative;
  min-width: 400px;
  margin-left: 5px;
  display: inline-block;
  border-radius: 23px;
  background: ${({ theme: { base } }) => base};
  margin-bottom: 26px;
`;

const IconBuilder = icon => styled(icon)`
  font-size: 23px;
  color: ${({ theme: { base } }) => base};
`;

const Circle = styled.div`
  background: ${({ theme: { primaryLight } }) => primaryLight};
  position: absolute;
  width: 43px;
  height: 43px;
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  left: 0px;
  top: 0px;
  box-shadow: 0 0px 20px 0px ${({ theme: { primary } }) => rgba(primary, 0.5)};
`;

const Search = IconBuilder(MdSearch);

const Input = styled.input`
  outline: none;
  padding: 14px 14px 14px 70px;
  font-size: 13px;
  color: ${({ theme: { text } }) => text};
  width: 100%;
`;

function SearchBoxAdmin({ onChange, ph }) {
  const handleChange = e => {
    e.preventDefault();
    e.stopPropagation();
    onChange(e.target.value);
  };
  return (
    <Container>
      <Circle>
        <Search />
      </Circle>

      <Input onChange={handleChange} placeholder={ph} />
    </Container>
  );
}

SearchBoxAdmin.propTypes = {
  onChange: PropTypes.func,
  ph: PropTypes.string,
};

export default SearchBoxAdmin;
