/* eslint-disable react/prop-types */
/**
 *
 * Area
 *
 */

import React, { useEffect, useMemo, useState } from 'react';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import { Row } from 'components/ContainerFlex';
import { getAreaById } from 'services/ArbolPrincipalService';
import PdfViewer from 'components/PdfViewer2';
import GalleryImages from 'components/GalleryImages';
import { Button } from "@nextui-org/react";
import { FaFileSignature, FaFileAlt, FaVideo, FaImage, FaCube } from 'react-icons/fa';
import { hostUrlBase } from 'services/Api';
import { MdClose } from 'react-icons/md';
import History from 'utils/history';
import Header from 'components/HeaderHome';
import Modal from 'components/ModalDark';
import {
  getMachineryById,
  getMachineryMediaById,
  getMachineryTypeMedia,
} from 'services/MachineryService';
import {
  getDocumentById,
  getDocumentMediaById,
  getDocumentTypeMedia,
} from 'services/DocumentService';
import DocumentsViewer from './DocumentsViewer';
import VideoViewer from './VideoViewer';
import Control from './Control';
import {
  ContainerFlex,
  PdfContainer,
  MediaContainer,
  TreeContainer
} from './Styles';
import Tree from './Tree';
import ModelIframeViewer from './ModelIframeViewer';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

const Area = ({ match }) => {
  const {
    params: { id },
  } = match;

  const [controlModal, setControlModal] = useState(false);
  const [splitterState, setSplitterState] = useState({
    percentage: false,
    secondaryMinSize: 50,
    secondaryInitialSize: 50,
    primaryMinSize: 50,
  });

  const [controlState, setControlState] = useState({
    id: -1,
  });

  const [state, setState] = useState({
    area: null,
    pdf: null,
    keyPdf: null,
    openTree: true,
    mediaType: null,
    idMediaType: -1,
    idDocument: -1,
    idMaquinery: -1,
  });

  const [mediaState, setMediaState] = useState({
    open: false,
  });

  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleControlModal = () => {
    setControlModal(t => !t);
  };

  const getArea = async () => {
    const response = await getAreaById(id);
    setState(s => ({
      ...s,
      area: response.data.data,
    }));
  };

  const goBack = () => {
    History.goBack();
  };

  const { location } = History;
  const goTo = pathname => {
    if (location.pathname === pathname) return null;
    return History.push(pathname);
  };

  useEffect(() => {
    getArea();
  }, []);

  useEffect(() => {
    if (mediaState.open) {
      setSplitterState({
        percentage: true,
        secondaryMinSize: 25,
        secondaryInitialSize: 25,
        primaryMinSize: 40,
      });
    } else {
      setSplitterState({
        percentage: false,
        secondaryMinSize: 50,
        secondaryInitialSize: 50,
        primaryMinSize: 50,
      });
    }
  }, [mediaState.open]);

  const handleClickItem = async (item) => {
    const { id: idx } = item;
  
    // Verifica si el ítem es un documento o equipo
    if (item.esDocumento || item.esEquipo || !/^\d+\s/.test(item.nombre)) {
      let response, responseMedia, data, type;
      
      // Lógica para documentos
      if (item.esDocumento) {
        response = await getDocumentById(idx);
        responseMedia = await getDocumentTypeMedia(idx);
        type = 1;
      }
      
      // Lógica para equipos
      else if (item.esEquipo) {
        response = await getMachineryById(idx);
        responseMedia = await getMachineryTypeMedia(idx);
        type = 2;
      }
  
      // Asigna data del response
      data = response.data.data;
      // Actualiza el estado con la información del documento o equipo
      if (data) {
        setState(s => ({
          ...s,
          pdf: `${hostUrlBase}/${data.pdf.url}`,
          keyPdf: `${item.tipo}${idx}`,
          mediaType: responseMedia.data.data,
          idDocument: type === 1 ? idx : undefined,
          idMaquinery: type === 2 ? idx : undefined,
          openTree: false,
          type,
        }));
      }
    } else {
      // Manejando otros tipos de nodos si es necesario
      // Aquí puedes agregar cualquier otra lógica para manejar otros tipos de nodos
    }
  };
  

  const handleClickMedia = async (typeMedia, idMediaType) => {
    const panel5 = document.querySelector("div.layout-pane:last-child");
    panel5.style.minWidth = "inherit";
    panel5.style.maxWidth = "inherit";

    if (state.type === 1) {
      const response = await getDocumentMediaById(
        state.idDocument,
        idMediaType,
      );
      setMediaState(s => ({
        ...s,
        open: true,
        idMediaType: typeMedia,
        media: response.data.data,
      }));
    }
    if (state.type === 2) {
      const response = await getMachineryMediaById(
        state.idMaquinery,
        idMediaType,
      );
      setMediaState(s => ({
        ...s,
        open: true,
        idMediaType: typeMedia,
        media: response.data.data,
      }));
    }
  };

  const closeMediaPanel = () => {
    const panel5 = document.querySelector("div.layout-pane:last-child");
    panel5.style.minWidth = "50px";
    panel5.style.maxWidth = "50px";
    setMediaState(s => ({
      ...s,
      open: false,
    }));
  };

  const generateMediaIcons = useMemo(() => {
    if (!state.mediaType) return null;
    return state.mediaType.map(media => {
      if (media.nombre === 'Imagen') {
        return (
          <Button color="secondary" style={{marginBottom: ".5rem"}} auto ghost key={media.idTipoMedio}
          onClick={() => handleClickMedia(4, media.idTipoMedio)}>
          <FaImage />
          </Button>
        );
      }
      if (media.nombre === 'Video') {
        return (
          <Button
          color="secondary" style={{marginBottom: ".5rem"}} auto ghost
            key={media.idTipoMedio}
            onClick={() => handleClickMedia(5, media.idTipoMedio)}
          >
            <FaVideo />
          </Button>
        );
      }
      if (media.nombre === 'Document') {
        return (
          <Button
          color="secondary" style={{marginBottom: ".5rem"}} auto ghost
            key={media.idTipoMedio}
            onClick={() => handleClickMedia(1, media.idTipoMedio)}
          >
            <FaFileAlt />
          </Button>
        );
      }
      if (media.nombre === 'Drawing') {
        return (
          <Button
          color="secondary" style={{marginBottom: ".5rem"}} auto ghost
            key={media.idTipoMedio}
            onClick={() => handleClickMedia(2, media.idTipoMedio)}
          >
            <FaFileSignature />
          </Button>
        );
      }

      if (media.nombre === '3DObject') {
        return (
          <Button
          color="secondary" style={{marginBottom: ".5rem"}} auto ghost
            key={media.idTipoMedio}
            onClick={() => handleClickMedia(9, media.idTipoMedio)}
          >
            <FaCube />
          </Button>
        );
      }
      return null;
    });
  }, [handleClickMedia, state.mediaType]);

  const generateMedia = useMemo(() => {
    const { media } = mediaState;

    switch (mediaState.idMediaType) {
      case 4: {
        return <GalleryImages title="Images" images={media} />;
      }
      case 9: {
        const src = `${hostUrlBase}/${media[0].url}/index.html`;
        return <ModelIframeViewer src={src} />;
      }
      case 1: {
        return <DocumentsViewer title="Documents" docs={media} />;
      }
      case 2: {
        return <DocumentsViewer title="Drawing" docs={media} />;
      }

      case 5: {
        return <VideoViewer title="Videos" docs={media} />;
      }
      default: {
        return null;
      }
    }
  }, [mediaState]);

  const handleClickBackTree = () => {
    setState(t => ({
      ...t,
      pdf: null,
      keyPdf: null,
      mediaType: null,
      idMediaType: -1,
      idDocument: -1,
      idMaquinery: -1,
    }));
  };

  const handleClickControl = (idControl, grupoName) => {
    toggleControlModal();
    setControlState(t => ({
      ...t,
      id: idControl,
      grupoName: grupoName
    }));
  };

  const toggleSubmenu = (menuKey) => {
    setOpenSubmenus({
      ...openSubmenus,
      [menuKey]: !openSubmenus[menuKey],
    });
  };

  const handleToggleSidebar = (isOpen) => {
    if (isOpen) {
      setState(s => ({
        ...s,
        openTree: true
      }));
    } else {
      if (!isOpen) {
        setState(s => ({
          ...s,
          openTree: false
        }));
      }
    }
  };

  return (
    <ContainerFlex rFlex>
      <Header showComponent={false} />

      <Row
        height="calc(100%)"
        innerPosition="relative"
      >
        <TreeContainer open={state.openTree}>
            {state.area && (
                <Sidebar
                  area={state.area}
                  handleClickItem={handleClickItem}
                  toggleSubmenu={toggleSubmenu}
                  openSubmenus={openSubmenus}
                  onToggle={handleToggleSidebar}
                  closeMediaPanel={closeMediaPanel}
                  onClickControl={handleClickControl}
                />
              )}
        </TreeContainer>
        {state.pdf && (
          <div
          style={{ marginTop: '76px' }}>
            <SplitterLayout
            primaryMinSize={splitterState.primaryMinSize}
            percentage={splitterState.percentage}
            secondaryMinSize={splitterState.secondaryMinSize}
            secondaryInitialSize={splitterState.secondaryInitialSize}
          >
            <PdfContainer key={state.keyPdf}>
              <PdfViewer url={state.pdf} />
            </PdfContainer>

            <MediaContainer key={state.keyPdf + 1} open={mediaState.open}>
              <div style={{ width: mediaState.open ? '50px' : '100%' }}>
                {mediaState.open &&
                  <Button color="primary" style={{margin: ".5rem 0 .5rem 0"}} auto ghost onClick={closeMediaPanel}>
                    <MdClose />
                  </Button>
                }

                {generateMediaIcons}
              </div>
              {mediaState.open && (
                <div className="Visor">{generateMedia}</div>
              )}
            </MediaContainer>
          </SplitterLayout>
          </div>
        )}
      </Row>
      <Modal height="100vh" width="100vw" open={controlModal} onClose={toggleControlModal}>
        <Control id={controlState.id} grupoName={controlState.grupoName}/>
      </Modal>
    </ContainerFlex>
  );
};

export default Area;
