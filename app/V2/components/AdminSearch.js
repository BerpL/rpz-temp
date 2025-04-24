import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { lighten } from 'polished';
import { MdSearch } from 'react-icons/md/index.esm';
import useOnClickOutside from 'hooks/useOnClickOutside';

const Button = styled.div`
  padding: 4px 8px;
  color: ${({ theme }) => theme.admin.colors.text};
  font-size: ${({ size }) => size || '14px'};
  border-radius: 4px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  user-select: none;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: ${({ theme }) => lighten(0.3, theme.admin.colors.textLight)};
  }
  svg {
    margin-top: 1px;
    margin-right: 2px;
  }
  span {
    width: ${({ open }) => (open ? '0px' : 'auto')};
    overflow: hidden;
    opacity: ${({ open }) => (open ? '0' : '1')};
    transition: opacity 0.3s;
  }

  input {
    transition: width 0.3s;
    width: ${({ open }) => (open ? '130px' : '0px')};
    overflow: hidden;
  }
`;

function Content({ onChange, size }) {
  const [open, setOpen] = useState(false);

  const ref = useRef(null);
  const inputRef = useRef(null);

  useOnClickOutside(ref, () => setOpen(false));

  const handleOnclick = () => {
    setOpen(true);
    inputRef.current.focus();
  };

  const handleOnChange = e => {
    e.preventDefault();
    onChange(e.target.value);
  };
  return (
    <Button ref={ref} open={open} size={size} onClick={handleOnclick}>
      <MdSearch />
      <span>Search</span>
      <input
        ref={inputRef}
        type="text"
        placeholder="Type to search"
        onChange={handleOnChange}
      />
    </Button>
  );
}

Content.propTypes = {
  size: PropTypes.number,
  onChange: PropTypes.func,
};

export default Content;
