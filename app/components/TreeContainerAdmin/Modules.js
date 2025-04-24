import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ModuleContainer from './Module';
import PdfViewer2 from '../PdfViewer2'; // Importa tu componente PdfViewer2
import manualPdf from 'testAssets/manual.pdf'; // Importar el PDF

const ItemsWrapper = styled.div`
  padding: 8px 0;
  height: ${({ theme }) => `calc(100vh - ${theme.admin.headerSize})`};
  overflow: auto;
`;

const ContainerButton = styled.div`
  display: flex;
  padding-left: 1rem;
`;

const Button = styled.button`
  border-radius: 5px;
  display: flex;
  align-items: center;
  user-select: none;
  justify-content: center;
  cursor: pointer;
  padding: 6px;
  outline: none;
  font-size: 16px;
  background: red;
  color: white;
  height: 30px;
  svg {
    font-size: 16px;
  }
`;

// Estilos para el modal (opcional, si decides usar un modal)
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
`;

const ModalContent = styled.div`
  background-color: white;
  width: 60%;
  height: 90%;
  padding: 1rem;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 30px;
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  z-index:999;
`;

function ModulesContainer({ modules, onItem, ...props }) {
  // Estado para controlar si el PDF Viewer está abierto
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);

  // Función para abrir el PDF Viewer
  const openPdfViewer = () => {
    setIsPdfViewerOpen(true);
  };

  // Función para cerrar el PDF Viewer
  const closePdfViewer = () => {
    setIsPdfViewerOpen(false);
  };

  return (
    <ItemsWrapper>
      <ContainerButton>
        <Button onClick={openPdfViewer}>
          <span>Administrator manual</span>
        </Button>
      </ContainerButton>
      {modules.map((module_) => (
        <ModuleContainer
          key={module_.id}
          module={module_}
          onSubModule={onItem}
          {...props}
        />
      ))}

      {/* Renderizar el PDF Viewer si está abierto */}
      {isPdfViewerOpen && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={closePdfViewer}>X</CloseButton>
            {/* Usar PdfViewer2 para mostrar el PDF */}
            <PdfViewer2 url={manualPdf} showToolbar={false} />
          </ModalContent>
        </ModalOverlay>
      )}
    </ItemsWrapper>
  );
}

ModulesContainer.propTypes = {
  modules: PropTypes.array,
  onItem: PropTypes.func,
};

export default ModulesContainer;
