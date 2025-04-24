import React, { useState } from 'react';
import Modal from 'components/ModalPdf';
import { hostUrlBase } from 'services/Api';
import PdfViewer from 'components/PdfViewer2';
import DocItem from './DocItem';
import { Container, Title, ContainerDoc, Title2 } from './Styles';

const DocumentsViewer = ({ docs, title, type }) => {
  const [state, setState] = useState({
    open: false,
    pdf: null,
  });

  const handleClickDocument = url => {
    const fileExtension = url.split('.').pop().toLowerCase();
    if (fileExtension === 'pdf') {
      setState({
        open: true,
        pdf: `${hostUrlBase}/${url}`,
      });
    } else {
      const downloadUrl = `${hostUrlBase}/${url}`;
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = url.split('/').pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Container>
      {type === 1 ? <Title>{title}</Title> : <Title2>{title}</Title2>}
      <ContainerDoc>
        {docs.map(doc => (
          <DocItem
            key={doc.idMedio}
            doc={doc}
            onClickDocument={handleClickDocument}
          />
        ))}
      </ContainerDoc>
      <Modal open={state.open} onClose={() => setState({ open: false, pdf: null })}>
        {state.pdf && <PdfViewer url={state.pdf} />}
      </Modal>
    </Container>
  );
};

export default DocumentsViewer;
