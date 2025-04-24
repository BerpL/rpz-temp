/**
 *
 * FlowDiagram
 *
 */

import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import History from 'utils/history';
import { hostUrlBase } from 'services/Api';
import {
  FaFileSignature,
  FaFileAlt,
  FaVideo,
  FaImage,
  FaCube,
} from 'react-icons/fa/index.esm';
import { MdClose } from 'react-icons/md/index.esm';
import PdfViewer from 'components/PdfViewer2';
import Modal from 'components/ModalPdf';
import DocumentsViewer from 'components/Area/DocumentsViewer';
import VideoViewer from 'components/Area/VideoViewer';
import ModelIframeViewer from 'components/Area/ModelIframeViewer';
import GalleryImages from 'components/GalleryImages';
import ShowBalance from 'V2/components/AdminShowBalance';
import useWindowSize from 'hooks/useWindowSize';
import { Button, Spacer } from "@nextui-org/react";
import {
  getMachineryById,
  getMachineryMediaById,
  getMachineryTypeMedia,
} from 'services/MachineryService';
import { BalanceService } from 'servicesV2';

// components V2
import InterfaceActions from 'V2/components/InterfaceActions';
import InterfaceContent from 'V2/components/InterfaceContent';

import { getDiagramById } from 'services/DiagramasService';
import PanLayer from './PanLayer';

const balanceData = {
  nombre: 'Overflow from cyclone nest',
  data: [
    {
      id: 1,
      abrev: 'Nm',
      nombre: 'Nominal',
      data: {
        'Solid Flow(t/h)': '1,320',
        'Water Flow(m3/ h)': '3,086',
        'Pulp Flow(m3 / h)': '3,534',
      },
    },
    {
      id: 2,
      abrev: 'Ds',
      nombre: 'Design',
      data: {
        'Solid Flow(t/h)': '1,650',
        'Water Flow(m3/ h)': '3,857',
        'Pulp Flow(m3 / h)': '4,417',
      },
    },
  ],
};

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
} from './Styles';
import HamburgerMenu from '../HamburguerButton';

function FlowDiagram({ match }) {
  const { id } = match.params;
  const [balanceService] = useState(new BalanceService());
  const [open, setOpen] = useState(false);
  const wrapperSize = useWindowSize({ onResize: () => {} });

  // console.log(wrapperSize);
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

  async function loadDiagram() {
    const response = await getDiagramById(id);
    // console.log(response.data);
    setStateFlowDiagram(e => ({
      ...e,
      flowDiagram: response.data.data,
      loading: false,
    }));
  }

  useEffect(() => {
    loadDiagram();
  }, []);

  const { flowDiagram } = stateFlowDiagram;
  const goBack = () => History.goBack();

  const onClickItemIframe = async (type, id) => {
    setStateModalMedia({ open: true });
    setStateMedia(s => ({
      type: type,
      mediaType: [],
      media: [],
      id: -1,
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

  const renderPan = useMemo(
    () => {
      if (!flowDiagram.url) return;
      return (
        <PanLayer
          height={`${wrapperSize.height}px`}
          flowDiagram={flowDiagram}
        />
      );
    },
    [flowDiagram.url, wrapperSize.height],
  );

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
        if (media.nombre === '3DObjects') {
          return (
            <IconMedia
              key={media.idTipoMedio}
              onClick={() => handleClickMedia(9, media.idTipoMedio)}
            >
              <FaCube />
            </IconMedia>
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

  const renderBalanceType = useMemo(
    () => {
      if (stateBalanceType.type < 0) return;
      const balance = balanceData.data.find(
        x => x.id === stateBalanceType.type,
      );

      if (!balance) return;

      return Object.keys(balance.data).map(data => (
        <Fila>
          <div className="balance_title">{data}</div>
          <div className="balance_data">{balance.data[data]}</div>
        </Fila>
      ));
    },
    [stateBalanceType.type],
  );

  const renderMedia = useMemo(
    () => {
      const { media } = stateMedia;

      switch (stateMedia.idMediaType) {
        case 4: {
          return <GalleryImages title="Images" images={media} type={1} />;
        }
        case 9: {
          const src = `${hostUrlBase}/${media[0].url}/index.html`;
          return <ModelIframeViewer src={src} />;
        }
        case 1: {
          return <DocumentsViewer title="Documents" docs={media} type={1} />;
        }
        case 2: {
          return <DocumentsViewer title="Drawing" docs={media} type={1} />;
        }

        case 5: {
          return <VideoViewer title="Videos" docs={media} type={1}/>;
        }
        default: {
          return null;
        }
      }
    },
    [stateMedia.idMediaType],
  );

  const renderPdfComponent = useMemo(
    () => {
      if (!stateMaquinery.pdf) return;

      return <PdfViewer url={stateMaquinery.pdf} />;
    },
    [stateMaquinery.pdf],
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
    <ContainerFlex tyle={{ height: '100vh' }}>
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
      <InterfaceContent maxWidth="100%" width="100%">
        <Wrapper>
          <FlowDiagramContainer>
            <div style={{ color: 'white', position: 'relative' }}>
              {renderPan}
            </div>
          </FlowDiagramContainer>
          <HamburgerMenu isOpen={isMediaContainerOpen} onClick={toggleMediaContainer} />
          { true &&
            <MediaContainer open={stateModalMedia.open}
            style={{
              position: 'absolute',
              right: open ? '0' : '-300px',
            }}>
            {stateModalMedia.open && (
              <CloseIcon onClick={() => setStateModalMedia({ open: false })}>
                <MdClose />
              </CloseIcon>
            )}
            {renderMediaType}
            <MediaContent>{renderByType}</MediaContent>
          </MediaContainer>
          }
          <Modal
            open={stateModalPdf.open}
            onClose={() => setStateModalPdf({ open: false })}
          >
            {renderPdfComponent}
          </Modal>
        </Wrapper>
      </InterfaceContent>
    </ContainerFlex>
  );
}

FlowDiagram.propTypes = {
  match: PropTypes.object.isRequired,
};

export default FlowDiagram;
