/**
 *
 * UploadFilesInputInlineInline
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { lighten, darken, rgba } from 'polished';
import { MdClose, MdCloudUpload } from 'react-icons/md/index.esm';

const Box = styled.div`
  border-radius: 5px;
  background: ${({ theme }) => lighten('0.42', theme.colors.primary)};
  display: flex;
  justify-content: ${({ multiple }) => multiple !== 'multiple' && 'center'};
  height: ${({ multiple }) => (multiple === 'multiple' ? '250px' : 'inherit')};
  align-items: center;
  flex-direction: column;
  border: 1px solid rgba(41, 42, 58, 0.24);
  padding: 6px 12px;
  max-height: 400px;
  overflow-y: auto;
`;

const displayLabel = ({ canShowSelect }) => (canShowSelect ? 'flex' : 'none');
const viewAllLabel = ({ canUpload }) => !canUpload && 'flex-grow: 1';

const Label = styled.label`
  display: ${displayLabel};
  ${viewAllLabel};
  flex-shrink: 0;
  transition: all 0.5s ease;
`;

const Input = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;

  & + label {
    font-size: 13px;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    flex-direction: column;
    padding: 10px 0;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  & + label svg {
    color: ${({ theme }) => rgba(theme.colors.text, 0.58)};
  }

  & + label span {
    color: ${({ theme }) => rgba(theme.colors.text, 0.58)};
    min-height: 11px;
    display: inline-block;
    text-overflow: ellipsis;
    transition: all 0.2s ease;
    white-space: nowrap;
    overflow: hidden;
    vertical-align: top;
  }
`;

const Item = styled.div`
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.primary};
  padding: 6px 12px;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 52px;
  flex-shrink: 0;
  display: flex;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.colors.base};
`;

const ItemName = styled.p`
  color: ${({ theme }) => theme.colors.base};
  margin: 0;
  font-size: 11px;
`;

const ItemSize = styled.span`
  font-size: 10px;
  color: #cccccc;
`;

const State = styled.span`
  font-size: 11px;
  font-style: italic;
`;

const Circle = styled.span`
  background: ${({ theme }) => darken('0.2', theme.colors.primary)};
  width: 25px;
  height: 25px;
  flex-shrink: 0;
  font-size: 20px;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  justify-content: center;
  border-radius: 50%;
`;

const Info = styled.span`
  flex-grow: 1;
  padding: 0 16px;
`;

const formatFileSize = (bytes, decimalPoint) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1000;

  const dm = decimalPoint || 2;

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

function UploadFilesInputInline({
  onChange = () => { },
  name,
  message = 'Cargar archivos',
  value = [],
  onCloseItem,
  multiple,
  onStateUpload = () => { },
  ...props
}) {
  const canUpload = value && value.length > 0;

  const canShowSelect = multiple === 'multiple' || !canUpload;

  return (
    <Box multiple={multiple}>
      <Input
        type="file"
        name={name}
        id={name}
        onChange={onChange}
        {...props}
        multiple={multiple}
      />

      <Label canShowSelect={canShowSelect} canUpload={canUpload} htmlFor={name}>
        {multiple && <MdCloudUpload size={25} />}
        <span>{message}</span>
      </Label>

      {Array.isArray(value) &&
        value.map((file, idx) => (
          <Item key={`${file.name}-${file.size}`}>
            <Circle>
              <MdClose onClick={() => onCloseItem(idx)} />
            </Circle>
            <Info>
              <ItemName>{file.name}</ItemName>
              {file.size && <ItemSize>{formatFileSize(file.size)}</ItemSize>}
            </Info>
            <State>{onStateUpload(`${idx}file`)}</State>
          </Item>
        ))}
    </Box>
  );
}

UploadFilesInputInline.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  message: PropTypes.string,
  value: PropTypes.any,
  onCloseItem: PropTypes.func,
};

export default UploadFilesInputInline;
