import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import { useParams } from 'react-router-dom';
import InterfaceActions from 'V2/components/InterfaceActions';
import { Container } from './styles';
import History from 'utils/history';
import PdfViewer from 'components/PdfViewer2';
import GalleryImages from 'components/GalleryImages';
import DocumentsViewer from 'components/Area/DocumentsViewer';
import { Button, Spacer } from '@nextui-org/react';
import {
  FaFileSignature,
  FaFileAlt,
  FaVideo,
  FaImage,
  FaCube,
} from 'react-icons/fa/index.esm';
import HamburgerMenu from '../HamburguerButton';
import { hostUrlBase } from 'services/Api';
import Modal from 'components/ModalPdf';
import ModelIframeViewer from 'components/Area/ModelIframeViewer';
import {
  getMachineryById,
  getMachineryMediaById,
  getMachineryTypeMedia,
} from 'services/MachineryService';
import { MdClose } from 'react-icons/md/index.esm';
import {
  ContainerFlex,
  IconMedia,
  // BeforeTitle,
  FlowDiagramContainer,
  MediaContainer,
  Wrapper,
  CloseIcon,
  TitleBar,
  IconMediaBar,
  MediaContent,
  Fila,
  GoBack,
} from './styles';
const InteractiveViewer = () => {
  const { tipointeractivo } = useParams();
  const [open, setOpen] = useState(false);
  const [mediaContent, setMediaContent] = useState(false);
  const [stateFlowDiagram, setStateFlowDiagram] = useState({
    flowDiagram: [],
    loading: true,
    error: false,
  });

  const [stateModalPdf, setStateModalPdf] = useState({
    open: false,
  });

  const [stateModalMedia, setStateModalMedia] = useState({
    open: false,
  });

  const [stateMaquinery, setStateMaquinery] = useState({
    id: -1,
  });

  const [stateBalance, setStateBalance] = useState({
    id: -1,
  });

  const [stateBalanceType, setBalanceType] = useState({
    type: -1,
  });

  const [stateMedia, setStateMedia] = useState({
    type: -1,
    mediaType: [],
    media: [],
    id: -1,
  });

  const [isMediaContainerOpen, setIsMediaContainerOpen] = useState(false);

  const toggleMediaContainer = () => {
    setIsMediaContainerOpen(!isMediaContainerOpen);
    setOpen(!open);
  };
  const data = [
    {
      id: 'paseos',
      model: '/public',  // Restauramos la ruta completa
    },
  ];
  const area = data.find(x => x.id === tipointeractivo);

  const goBack = () => History.push('/');
  const [state] = useState({
    model: area.model, 
    // model: area.model,
    // title: "Feed Pump",
    // model: "/3d/Feed_Pump/Feed_Pump.html",
  });
  console.log(state.model)

  const onClickItemIframe = async (type, id) => {
    setMediaContent(true);
    setStateModalMedia({ open: true });
    setStateMedia(s => ({
      ...s,
      type,
    }));

    if (type === 1) {
      const response = await getMachineryById(id);
      const responseMedia = await getMachineryTypeMedia(id);
      setOpen(!open);
      setIsMediaContainerOpen(!isMediaContainerOpen);
      setStateMaquinery({
        id,
        pdf: `${hostUrlBase}/${response.data.data.pdf.url}`,
        name: response.data.data.nombre,
      });
      setStateMedia(s => ({
        ...s,
        mediaType: responseMedia.data.data,
      }));
    } else {
      setStateBalance({
        id,
      });
    }
  };

  const handleClickMedia = useCallback(
    async (typeMedia, idMediaType) => {
      const response = await getMachineryMediaById(
        stateMaquinery.id,
        idMediaType,
      );
      setStateMedia(s => ({
        ...s,
        idMediaType: typeMedia,
        media: response.data.data,
      }));
    },
    [stateMaquinery.id],
  );

  const renderMediaIcons = useMemo(
    () =>
      stateMedia.mediaType.map(media => {
        if (media.nombre === 'Image') {
          return (
            <Button
              color="secondary"
              auto
              ghost
              key={media.idTipoMedio}
              onClick={() => handleClickMedia(4, media.idTipoMedio)}
            >
              <FaImage />
            </Button>
          );
        }
        if (media.nombre === 'Video') {
          return (
            <Button
              color="secondary"
              auto
              ghost
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
              color="secondary"
              auto
              ghost
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
              color="secondary"
              auto
              ghost
              key={media.idTipoMedio}
              onClick={() => handleClickMedia(2, media.idTipoMedio)}
            >
              <FaFileSignature />
            </Button>
          );
        }
        if (media.nombre === '3DObjects') {
          return (
            <Button
              color="secondary"
              auto
              ghost
              key={media.idTipoMedio}
              onClick={() => handleClickMedia(9, media.idTipoMedio)}
            >
              <FaCube />
            </Button>
          );
        }
      }),
    [stateMedia.mediaType],
  );

  const renderMediaType = useMemo(
    () => {
      if (stateMedia.type < 1) return;

      if (stateMedia.type === 1) {
        return (
          <div>
            <TitleBar onClick={() => setStateModalPdf({ open: true })}>
              {stateMaquinery.name}
              <FaFileAlt />
            </TitleBar>
            <IconMediaBar>{renderMediaIcons}</IconMediaBar>
          </div>
        );
      }

      if (stateMedia.type === 2) {
        return <ShowBalance id={stateBalance.id} />;
      }

      return null;
    },
    [stateMedia, stateBalance],
  );

  const renderPdfComponent = useMemo(
    () => {
      if (!stateMaquinery.pdf) return;

      return <PdfViewer url={stateMaquinery.pdf} />;
    },
    [stateMaquinery.pdf],
  );

  useEffect(() => {
    window.addEventListener(
      'message',
      function(e) {
        if (e.data.param1 || e.data.param2) {
          onClickItemIframe(e.data.param1, e.data.param2);
        }
      },
      false,
    );

    return window.removeEventListener('message', function() {}, false);
  }, []);

  const renderMedia = useMemo(
    () => {
      const { media } = stateMedia;

      switch (stateMedia.idMediaType) {
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
    },
    [stateMedia.idMediaType],
  );

  const renderByType = useMemo(
    () => {
      if (stateMedia.type < 0)
        return (
          <p style={{ padding: '10px 12px', color: 'gray' }}>
            Select a machine or mass balance to see more information
          </p>
        );

      if (stateMedia.type === 1) {
        return <>{renderMedia}</>;
      }

      if (stateMedia.type === 2) {
        return <>{renderBalanceType}</>;
      }
    },
    [stateMedia.type, stateBalanceType.type, stateMedia.idMediaType],
  );

  return (
    <Container>
      <GoBack>
        <Button color="secondary" auto onClick={goBack}>
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 447.243 447.243"
          >
            <g fill="#fff">
              <path
                d="M420.361,192.229c-1.83-0.297-3.682-0.434-5.535-0.41H99.305l6.88-3.2c6.725-3.183,12.843-7.515,18.08-12.8l88.48-88.48
			c11.653-11.124,13.611-29.019,4.64-42.4c-10.441-14.259-30.464-17.355-44.724-6.914c-1.152,0.844-2.247,1.764-3.276,2.754
			l-160,160C-3.119,213.269-3.13,233.53,9.36,246.034c0.008,0.008,0.017,0.017,0.025,0.025l160,160
			c12.514,12.479,32.775,12.451,45.255-0.063c0.982-0.985,1.899-2.033,2.745-3.137c8.971-13.381,7.013-31.276-4.64-42.4
			l-88.32-88.64c-4.695-4.7-10.093-8.641-16-11.68l-9.6-4.32h314.24c16.347,0.607,30.689-10.812,33.76-26.88
			C449.654,211.494,437.806,195.059,420.361,192.229z"
              />
            </g>
          </svg>
        </Button>
      </GoBack>
      <main>
        <iframe title="____viewer____" frameBorder={0} src={state.model} />
        {mediaContent && (
          <>
            <HamburgerMenu
              isOpen={isMediaContainerOpen}
              onClick={toggleMediaContainer}
            />
            {true && (
              <MediaContainer
                open={stateModalMedia.open}
                style={{
                  position: 'absolute',
                  right: open ? '0' : '-300px',
                }}
              >
                {stateModalMedia.open && (
                  <CloseIcon
                    onClick={() => setStateModalMedia({ open: false })}
                  >
                    <MdClose />
                  </CloseIcon>
                )}
                {renderMediaType}
                <MediaContent>{renderByType}</MediaContent>
              </MediaContainer>
            )}
            <Modal
              open={stateModalPdf.open}
              onClose={() => setStateModalPdf({ open: false })}
            >
              {renderPdfComponent}
            </Modal>
          </>
        )}
      </main>
    </Container>
  );
};

export default InteractiveViewer;
