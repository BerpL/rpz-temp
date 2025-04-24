import React, { useEffect, useState } from 'react';
import { Row } from 'components/ContainerFlex';
import PdfViewer from 'components/PdfViewer2';
import GalleryImages from 'components/GalleryImages';
import { GiHamburgerMenu } from 'react-icons/gi/index.esm';
import {
  FaLongArrowAltLeft,
  FaFileSignature,
  FaFileAlt,
  FaVideo,
  FaImage,
  FaCube,
} from 'react-icons/fa/index.esm';
import { hostUrlBase } from 'services/Api';
import { MdClose } from 'react-icons/md/index.esm';
import History from 'utils/history';
import Header from 'components/HeaderHome';
import ModelViewer from 'components/Area/ModelViewer';
import DocumentsViewer from 'components/Area/DocumentsViewer';
import VideoViewer from 'components/Area/VideoViewer';
import Tree from 'components/Area/Tree';
import { ProcedureService } from 'servicesV2';
import {
  ContainerFlex,
  TreeContainer,
  PdfContainer,
  IconMedia,
  MediaContainer,
  ButtonHandlerTree,
  BtnReturn,
  // HeaderDocument,
  // Title,
  // BeforeTitle,
} from './Styles';

function Procedures() {
  const [procedureService] = useState(new ProcedureService());
  const [treeState, setTreeState] = useState({
    data: {
      nodos: [],
    },
    isLoading: false,
    error: false,
  });
  const [openTree, setOpenTree] = useState(false);
  const [openMedia, setOpenMedia] = useState(false);
  const [procedureState, setProcedureState] = useState({
    pdf: null,
    mediaType: [],
    keyPdf: null,
    idProcedure: -1,
    isLoading: false,
    error: false,
  });

  const [mediaState, setMediaState] = useState({
    media: [],
    idMediaType: -1,
  });

  const goBack = () => {
    History.goBack();
  };

  const toggleMenuTree = () => {
    setOpenTree(t => !t);
  };

  const toggleMenuMedia = () => {
    setOpenMedia(t => !t);
  };

  useEffect(() => {
    async function fetchTree() {
      try {
        setTreeState(t => ({ ...t, isLoading: true }));
        const response = await procedureService.getTree();
        setTreeState(t => ({ ...t, data: response.data }));
      } catch (e) {
        setTreeState(t => ({ ...t, error: e }));
      } finally {
        setTreeState(t => ({ ...t, isLoading: false }));
      }
    }
    fetchTree();
  }, []);

  const handleClickBackTree = () => {
    setProcedureState({
      pdf: null,
      mediaType: [],
      keyPdf: null,
      idProcedure: -1,
      isLoading: false,
      error: false,
    });
    setMediaState({
      media: [],
      idMediaType: -1,
    });
    setOpenMedia(false);
  };

  const handleClickItem = async (idx, index, tipo) => {
    try {
      setProcedureState(t => ({ ...t, isLoading: true }));
      const response = await procedureService.getProcedure(idx);
      const responseMedia = await procedureService.getProcedureMediaType(idx);
      const filterData = responseMedia.data.filter((v,i,a)=>a.findIndex(t=>(t.idTipoMedio === v.idTipoMedio))===i);
      setProcedureState(t => ({
        ...t,
        pdf: `${hostUrlBase}/${response.data.pdf.url}`,
        keyPdf: `${tipo}${idx}`,
        mediaType: filterData,
        idProcedure: idx,
      }));
    } catch (e) {
      setProcedureState(t => ({ ...t, error: e }));
    } finally {
      setProcedureState(t => ({ ...t, isLoading: false }));
    }
    setOpenTree(t => !t);
  };

  const generateMedia = () => {
    const { media } = mediaState;

    switch (mediaState.idMediaType) {
      case 4: {
        return <GalleryImages title="Images" images={media} />;
      }
      case 9: {
        const src = `${hostUrlBase}/${media[0].url}`;
        return <ModelViewer src={src} />;
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
  };

  const generateMediaIcons = () =>
    procedureState.mediaType &&
    procedureState.mediaType.map(media => {
      if (media.nombre === 'Imagen') {
        return (
          <IconMedia
            key={media.idTipoMedio}
            onClick={() => handleClickMedia(4, media.idTipoMedio)}
          >
            <FaImage />
          </IconMedia>
        );
      }
      if (media.nombre === 'Video') {
        return (
          <IconMedia
            key={media.idTipoMedio}
            onClick={() => handleClickMedia(5, media.idTipoMedio)}
          >
            <FaVideo />
          </IconMedia>
        );
      }
      if (media.nombre === 'Document') {
        return (
          <IconMedia
            key={media.idTipoMedio}
            onClick={() => handleClickMedia(1, media.idTipoMedio)}
          >
            <FaFileAlt />
          </IconMedia>
        );
      }
      if (media.nombre === 'Drawing') {
        return (
          <IconMedia
            key={media.idTipoMedio}
            onClick={() => handleClickMedia(2, media.idTipoMedio)}
          >
            <FaFileSignature />
          </IconMedia>
        );
      }

      if (media.nombre === '3DObject') {
        return (
          <IconMedia
            key={media.idTipoMedio}
            onClick={() => handleClickMedia(9, media.idTipoMedio)}
          >
            <FaCube />
          </IconMedia>
        );
      }
      return null;
    });

  const handleClickMedia = async (typeMedia, idMediaType) => {
    const response = await procedureService.getProcedureMediaById(
      procedureState.idProcedure,
      idMediaType,
    );
    setOpenMedia(true);
    setMediaState(t => ({
      ...t,
      idMediaType: typeMedia,
      media: response.data,
    }));
  };

  return (
    <ContainerFlex>
      <Header />
      <Row padding="50px 0 0 0">
        <TreeContainer open={openTree}>
          <BtnReturn onClick={goBack}>
            <FaLongArrowAltLeft />
            Retornar a la áreas
          </BtnReturn>
          <div
            style={{
              width: '100%',
              overflow: 'hidden',
              height: '100%',
            }}
          >
            <Tree
              onClickBack={handleClickBackTree}
              items={treeState.data.nodos}
              title="Procedimientos"
              onClickItem={handleClickItem}
            />
          </div>

          <ButtonHandlerTree onClick={toggleMenuTree}>
            <GiHamburgerMenu />
            <span>Open Menú</span>
          </ButtonHandlerTree>
        </TreeContainer>
        {procedureState.pdf && (
          <>
            <PdfContainer key={procedureState.keyPdf}>
              <PdfViewer url={procedureState.pdf} />
            </PdfContainer>

            <MediaContainer key={procedureState.keyPdf + 1} open={openMedia}>
              <div>
                <IconMedia onClick={toggleMenuMedia}>
                  {openMedia && <MdClose />}
                </IconMedia>
                {generateMediaIcons()}
              </div>
              <div className="Visor">{generateMedia()}</div>
            </MediaContainer>
          </>
        )}
      </Row>
    </ContainerFlex>
  );
}

export default Procedures;
