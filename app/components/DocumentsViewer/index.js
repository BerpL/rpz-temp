/**
 *
 * DocumentsViewer
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LightBox from 'components/LightBox';
import { C2, S1, Co01 } from 'components/Wrapper';
import PDFViewer from 'components/PdfViewer';
import { FaFile } from 'react-icons/fa/index.esm';

const Item = styled.div`
  color: ${({ theme: { base } }) => base};
  font-size: 13px;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  margin: 10px 0px;
  svg {
    margin-right: 5px;
  }
`;

const Text = styled.div`
  color: ${({ theme: { base } }) => base};
  font-size: 15px;
  width: 100%;
`;

function DocumentsViewer({ name = 'Documentos', documents = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState('');
  const handleClickItem = url => {
    setIsOpen(true);
    setFile(url);
  };

  return (
    <div>
      <Text>{name}</Text>
      <div>
        {documents.map(doc => (
          <Item key={doc.id} onClick={() => handleClickItem(doc.fileUrl)}>
            <FaFile />
            {doc.name}
          </Item>
        ))}
      </div>
      <LightBox open={isOpen} onClose={() => setIsOpen(false)}>
        <C2>
          <S1 noPadding style={{ width: '100%', height: '100%' }}>
            <Co01 noPadding>
              <PDFViewer loadingStyle src={file} idPdf="modal-pdf-viewer" />
            </Co01>
          </S1>
        </C2>
      </LightBox>
    </div>
  );
}

DocumentsViewer.propTypes = {
  name: PropTypes.string,
  documents: PropTypes.array,
};

export default DocumentsViewer;
