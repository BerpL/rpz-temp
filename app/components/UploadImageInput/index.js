/**
 *
 * UploadFilesInput
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rgba, lighten } from 'polished';
import { MdImage } from 'react-icons/md/index.esm';
const Box = styled.div`
  border-radius: 5px;
  background: ${({ theme }) => lighten('0.42', theme.colors.primary)};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(41, 42, 58, 0.24);
`;

const Input = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;

  & + label {
    width: 100%;
    padding: 12px 16px;
    font-size: 13px;
    cursor: pointer;
    display: flex;
    color: ${({ theme }) => rgba(theme.colors.text, 0.38)};
    overflow: hidden;
    flex-direction: column;
    align-items: center;
  }

  & + label svg {
    vertical-align: middle;
    width: 50px;
    height: 50px;
    margin: 0 auto;
  }

  & + label span {
    width: 100%;
    min-height: 11px;
    display: -block;
    font-size: 11px;
    text-overflow: ellipsis;
    transition: all 0.2s ease;
    color: ${({ theme }) => rgba(theme.colors.text, 0.58)};
    white-space: nowrap;
    text-align: center;
    overflow: hidden;
    vertical-align: top;
    margin-top: 10px;
  }
`;

const ContSec = styled.div`
  height: ${({ hasValue }) => (hasValue ? '100%' : '0px')};

  overflow: hidden;
  display: ${({ hasValue }) => (hasValue ? 'block' : 'none')};
}`;

const ContImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
}`;

const Img = styled.img`
    max-width: 100%;
    max-height: 104px;

}`;

function UploadFilesInput({
  onChange,
  name,
  message = 'Select image',
  value = null,
}) {
  const hasValue = !!value;

  return (
    <Box>
      <Input
        type="file"
        name={name}
        id={name}
        onChange={onChange}
        accept="image/x-png,image/gif,image/jpeg"
      />
      <label htmlFor={name}>
        <ContSec hasValue={!hasValue}>
          <ContImg>
            <MdImage />
          </ContImg>

          <span>{message}</span>
        </ContSec>
        <ContSec hasValue={hasValue}>
          <Img src={value} alt="" />
        </ContSec>
      </label>
    </Box>
  );
}

UploadFilesInput.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  message: PropTypes.string,
  value: PropTypes.any,
};

export default UploadFilesInput;
