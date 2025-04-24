/**
 *
 * ContainerArea
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import Wrapper, { C2, S1, Co01 } from 'components/Wrapper';
import HeaderHome from 'components/HeaderHome';
import FooterHome from 'components/FooterHome';
import TreeView from 'components/TreeView';
import PDFViewer from 'components/PdfViewer';
import SideBarNavAdmin from 'components/SideBarNavAdmin';
import ImageViewer from 'components/ImageViewer';
import DocumentsViewer from 'components/DocumentsViewer';
import VideosViewer from 'components/VideosViewer';
import testPdf from 'testAssets/test.pdf';
import pdfRotate from 'testAssets/1-rotated.pdf';

import { MdInsertDriveFile, MdVideocam, MdImage } from 'react-icons/md/index.esm';

import { lighten } from 'polished';

import FileTypes from 'utils/fileTypes';

import useTree from 'hooks/useTree';

const MEDIA_TYPES = {
  VIDEO: 'VIDEO',
  PLANE: 'PLANE',
  DOCUMENT: 'DOCUMENT',
  FIGURE: 'FIGURE',
  IMAGE: 'IMAGE',
  OBJECT3D: '3DObject',
};

const Container = styled.div`
  height: calc(100% - 160px);
  overflow: auto;
  margin-bottom: 80px;
  margin-top: 80px;
  width: 100%;
  @media only screen and (min-width: 500px) {
    display: flex;
    flex-direction: row-reverse;
    overflow: hidden;
  }
`;

const Title = styled.span`
  color: ${({ theme: { primary } }) => primary};
  letter-spacing: 1px;
  font-weight: bold;
  margin-bottom: 20px;
  display: block;
`;

const ContainerVisualizer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  overflow: hidden;
  z-index: 100;
  margin-top: 100px;
  height: calc(100% - 100px);
  background: ${({ theme: { bgU } }) => lighten('0.25', bgU)};
  @media only screen and (min-width: 500px) {
    width: calc(100% - 602px);
    position: relative;
    border-radius: 10px;
    margin: 0 26px;
    height: 100%;
    color: ${({ theme: { base } }) => base};
  }
`;
const Image = styled.div`
  background-image: url(${({ src }) => src});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  width: 85%;
  margin: 0 auto;
  height: 250px;
  border-radius: 10px;
  @media only screen and (min-width: 500px) {
    flex: 1;
    height: calc(100% - 100px);
    margin: 0px 40px;
  }
`;

const ContainerTree = styled.div`
  padding: 0px 26px 0px 26px;
  @media only screen and (min-width: 500px) {
    width: 300px;
    padding: 0px 0px 0px 26px;
  }
`;
const InnerTree = styled.div`
  @media only screen and (min-width: 500px) {
    width: 100%;
    padding: 20px;
    height: 100%;
    border-radius: 10px;
    background: ${({ theme: { bgU } }) => lighten('0.07', bgU)};
  }
`;

const ContainerMedia = styled.div`
  padding: 0px 20px 0px 0px;
  @media only screen and (min-width: 500px) {
    width: ${({ isOpen }) => (isOpen ? '400px' : '0px')};
    padding: ${({ isOpen }) => (isOpen ? ' 0px 20px 0px 0px' : '0px')};
    transition: width 0.5s;
  }
`;

const InnerMedia = styled.div`
  @media only screen and (min-width: 500px) {
    width: 100%;
    padding: 20px;
    height: 100%;
    border-radius: 10px;
    background: ${({ theme: { bgU } }) => lighten('0.07', bgU)};
  }
`;

const ActionButtons = styled.div`
  top: 10px;
  right: 20px;
  position: absolute;
  z-index: 1000;
  user-select: none;
`;

const MediaButton = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${({ theme: { base } }) => base};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.5);
  color: ${({ theme: { bgU } }) => bgU};
  margin-bottom: 10px;
`;

function ContainerArea({
  theme: { bgU },
  match: {
    params: { id },
  },
}) {
  const [area, setArea] = useState(AreasData[id - 1]);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openVisualizer, setOpenVisualizer] = useState(false);
  const [file, setFile] = useState(testPdf);
  const [activeTypeMedia, setActiveTypeMedia] = useState('');
  const [openMedia, setOpenMedia] = useState(true);

  const [tree, , , onSelectNode, findNode, onOpenNode] = useTree({
    data: DocumentsArea,
  });

  const handleOnClickItem = identifier => {
    onSelectNode(identifier, nodeSelected => {
      if (nodeSelected.type === FileTypes.File) {
        setOpenVisualizer(true);
        setFile(nodeSelected.fileUrl);
      }
    });
  };

  const handleClickMedia = identifier => {
    setActiveTypeMedia(identifier);
    // setOpenMedia(true);
  };

  const isVideo = MEDIA_TYPES.VIDEO === activeTypeMedia;
  const isImage = MEDIA_TYPES.IMAGE === activeTypeMedia;
  const isPlane = MEDIA_TYPES.PLANE === activeTypeMedia;
  const isDocument = MEDIA_TYPES.DOCUMENT === activeTypeMedia;

  return (
    <Wrapper style={{ Co01: { background: bgU } }}>
      <SideBarNavAdmin
        hasCloseButton
        hasLogo={false}
        style={{
          position: 'absolute',
          zIndex: 1000000,
          left: openSideBar ? '0px ' : '-200px',
        }}
        onClose={() => setOpenSideBar(false)}
      />
      <HeaderHome toggleMenu={() => setOpenSideBar(true)} />

      <Container>
        {openVisualizer && (
          <ContainerMedia isOpen={openMedia}>
            <InnerMedia>
              {isImage && <ImageViewer images={FiguresArea} name="Figuras" />}
              {isDocument && (
                <DocumentsViewer documents={MediaDocuments} name="Documentos" />
              )}
              {isPlane && (
                <DocumentsViewer documents={MediaDocuments} name="Planos" />
              )}
              {isVideo && <VideosViewer videos={MediaVideos} />}
            </InnerMedia>
          </ContainerMedia>
        )}
        {openVisualizer && (
          <ContainerVisualizer>
            <C2>
              <S1 noPadding style={{ width: '100%', height: '100%' }}>
                <Co01 noPadding>
                  <ActionButtons>
                    <MediaButton
                      onClick={() => handleClickMedia(MEDIA_TYPES.DOCUMENT)}
                    >
                      <MdInsertDriveFile />
                    </MediaButton>
                    <MediaButton onClick={() => handleClickMedia(MEDIA_TYPES.PLANE)}>
                      <MdInsertDriveFile />
                    </MediaButton>
                    <MediaButton onClick={() => handleClickMedia(MEDIA_TYPES.IMAGE)}>
                      <MdImage />
                    </MediaButton>
                    <MediaButton onClick={() => handleClickMedia(MEDIA_TYPES.OBJECT3D)}>3D</MediaButton>
                    <MediaButton onClick={() => handleClickMedia(MEDIA_TYPES.VIDEO)}>
                      <MdVideocam />
                    </MediaButton>
                  </ActionButtons>
                  <PDFViewer key={file} src={file} idPdf="pdf-viewer-area" />
                </Co01>
              </S1>
            </C2>
          </ContainerVisualizer>
        )}

        {!openVisualizer && <Image src={area.imagen} />}
        <ContainerTree>
          <InnerTree>
            <Title>Molienda</Title>
            <TreeView
              draggable={false}
              key=""
              onToggleItem={onOpenNode}
              items={tree}
              onClickItem={handleOnClickItem}
              moveItem={() => { }}
              findItem={findNode}
            />
          </InnerTree>
        </ContainerTree>
      </Container>
      <FooterHome />
    </Wrapper>
  );
}

ContainerArea.propTypes = {
  theme: PropTypes.object,
  match: PropTypes.object,
};

export default withTheme(ContainerArea);

const FiguresArea = [
  {
    id: 1,
    imageUrl:
      'http://172.16.2.78/Toquepala/Interface/DiagramasInterface/CargarImagen?urlImagen=data%2Fmedios%2F2%2F3%2F7%2F5817.jpg',
  },
  {
    id: 2,
    imageUrl:
      'http://172.16.2.78/Toquepala/Interface/DiagramasInterface/CargarImagen?urlImagen=data%2Fmedios%2F2%2F3%2F7%2F5799.jpg',
  },
  {
    id: 3,
    imageUrl:
      'http://172.16.2.78/Toquepala/Interface/DiagramasInterface/CargarImagen?urlImagen=data%2Fmedios%2F2%2F3%2F7%2F5784.jpg',
  },
  {
    id: 4,
    imageUrl:
      'http://172.16.2.78/Toquepala/Interface/DiagramasInterface/CargarImagen?urlImagen=data%2Fmedios%2F2%2F3%2F7%2F5831.jpg',
  },
  {
    id: 5,
    imageUrl:
      'http://172.16.2.78/Toquepala/Interface/DiagramasInterface/CargarImagen?urlImagen=data%2Fmedios%2F2%2F3%2F7%2F5822.jpg',
  },
  {
    id: 6,
    imageUrl:
      ' http://172.16.2.78/Toquepala/Interface/DiagramasInterface/CargarImagen?urlImagen=data%2Fmedios%2F2%2F3%2F7%2F5787.jpg',
  },
];

const MediaDocuments = [
  {
    id: 1,
    name: 'M001-B_12109236_S-N_Cert',
    fileUrl: testPdf,
  },
  {
    id: 2,
    name: 'M008-002_30125071_B_(CN)',
    fileUrl: pdfRotate,
  },
  {
    id: 3,
    name: 'M008-003_30125072_D_(CN)',
    fileUrl: 'http://172.16.2.78/Toquepala/Data/archivos/6/45/47/49/89.pdf',
  },
];

const MediaVideos = [
  {
    id: 1,
    name: 'Molino',
    poster:
      'http://www.tecsup-aqp.edu.pe/pgc4/public/videos3d/posterMolino.png',
    fileUrl: 'http://www.tecsup-aqp.edu.pe/pgc4/public/videos3d/MOLINO.mp4',
  },
  {
    id: 2,
    name: 'Molino 2',
    poster:
      'https://www.gebr-pfeiffer.com/fileadmin/images/contentimages/Produkte/Illustration/GP-MRD-2.jpg',
    fileUrl: 'http://www.tecsup-aqp.edu.pe/pgc4/public/videos3d/MOLINO.mp4',
  },
];

const DocumentsArea = {
  id: 'Molienda',
  title: 'Molienda',
  type: 'Folder',
  children: [
    {
      id: 'Procesos',
      title: 'Procesos',
      type: 'Folder',
      children: [
        {
          id: '2-300-1-1DescripcionMoliendaRev.0',
          title: '2-300-1-1 Descripcion Molienda Rev.0',
          children: [],
          fileUrl: testPdf,
          type: 'File',
        },
      ],
    },
    {
      id: 'Equipos',
      title: 'Equipos',
      type: 'Folder',
      children: [
        {
          id: '1Molinodebolas',
          title: '1 Molinode bolas',
          type: 'File',
          fileUrl: pdfRotate,
          children: [],
        },
      ],
    },
    {
      id: 'Control',
      title: 'Control',
      type: 'Folder',
      children: [
        {
          id: '3200Molienda',
          title: '3200 Molienda',
          type: 'File',
          fileUrl:
            'http://172.16.2.78/Toquepala/Data/archivos/6/45/47/48/85.pdf',
          children: [],
        },
      ],
    },
  ],
};

const AreasData = [
  {
    id: 1,
    nombre: 'CHANCADO SECUNDARIO Y TERCIARIO',
    imagen:
      'http://www.rumbominero.com/wp-content/uploads/2018/06/chancadora.jpg',
    numero: 3300,
  },
  {
    id: 2,
    nombre: 'MOLIENDA',
    imagen:
      'http://www.rumbominero.com/wp-content/uploads/2018/06/chancadora.jpg',
    numero: 3301,
  },
  {
    id: 3,
    nombre: 'FLOTACIÓN COLECTIVA Y REMOLIENDA',
    imagen:
      'http://www.rumbominero.com/wp-content/uploads/2018/06/chancadora.jpg',
    numero: 3302,
  },
  {
    id: 4,
    nombre: 'ESPESAMIENTO DE RELAVES Y RECUPERACIÓN DE AGUA',
    imagen:
      'http://www.rumbominero.com/wp-content/uploads/2018/06/chancadora.jpg',
    numero: 3303,
  },
  {
    id: 5,
    nombre: 'ESPESAMIENTO Y FILTRADO DE CONCENTRADO DE COBRE',
    imagen:
      'http://www.rumbominero.com/wp-content/uploads/2018/06/chancadora.jpg',
    numero: 3304,
  },
  {
    id: 6,
    nombre: 'PLANTA MOLIBDENO',
    imagen:
      'http://www.rumbominero.com/wp-content/uploads/2018/06/chancadora.jpg',
    numero: 3305,
  },
];
