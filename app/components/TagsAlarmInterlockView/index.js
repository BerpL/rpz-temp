import React, { useRef, useState, useEffect, useCallback, memo } from 'react';
import usePanZoom from 'hooks/usePanZoom';
import uuidv4 from 'uuid/v4';
import { ContainerFlex, Col, Row } from 'components/ContainerFlex';
import Button from 'components/Button';
import { MdCropFree, MdPanTool } from 'react-icons/md/index.esm';
import Marker from 'components/MarkerTags';
import styled from 'styled-components';
import { rgba } from 'polished';
import {
  getInterfaceTags,
  getDetailInterfaceTags,
} from 'services/InterfacesTagsService';

import { hostUrlBase } from 'services/Api';
import { getAllAlarmsInterlocksNoTagged } from 'services/ControlGroupService';
import { deleteTag, createTag, updateTag } from 'services/TagsService';

import ListTags from './ListTags';
import ListTagsTagged from './ListTagsTagged';

// import PropTypes from 'prop-types';

const bgButtonTab = ({ selected, theme }) =>
  selected ? theme.colors.primary : 'transparent';

const colorButtonTab = ({ selected, theme }) =>
  selected ? theme.colors.base : theme.colors.primary;

const ButtonToggle = styled(Button)`
  background: ${bgButtonTab};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${colorButtonTab};
  transition: all 0.2s;
  width: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:first-child {
    margin-right: 10px;
  }

  &:hover {
    background: ${bgButtonTab};
  }
`;

const ContainerButtonAdd = styled.div`
  margin: 30px 16px 10px 16px;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  position: relative;
  cursor: ${({ cursor }) => cursor};
`;

const PanZoom = styled.div`
  position: relative;
  flex: 1;
  user-select: none;
  overflow: hidden;
  width: 700px;
  height: 700px;
`;

const TagsContainer = styled.div`
  background: #efefef;
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  padding: 30px 16px 10px 16px;
  font-weight: 500;
  font-size: 25px;
`;

const Line = styled.div`
  flex-grow: 1;
  margin: 10px 16px;
  background: ${({ theme }) => rgba(theme.colors.text, 0.3)};
  height: 1px;
`;

const PanZoomInner = styled.div.attrs(({ transform, styleInnerContainer }) => ({
  style: {
    transform,
    ...styleInnerContainer,
  },
}))`
  position: relative;
  transform-origin: left top;
`;

const Img = styled.img`
  width: auto !important;
  max-width: inherit !important;
  height: auto !important;
`;

function ListMarkers({ markers, isMoveMarker, onMouseDown, zoom }) {
  return markers.map(marker => (
    <Marker
      key={marker.idDetalleEtiquetaModulo}
      isMoveMarker={isMoveMarker}
      onMouseDown={onMouseDown}
      marker={marker}
      zoom={zoom}
    />
  ));
}

function TagsAlarmInterlockView({ id, idGrupoControl }) {
  const panZoomContainer = useRef(null);
  const imgRef = useRef(null);
  const containerRef = useRef(null);
  const [state, setState] = useState({
    isEnablePan: true,
    isEnableZoom: true,
    isEnableTagging: false,
    cursor: 'default',
    isMoveMarker: false,
    keyMarkerMove: -1,
    image: '',
    markers: [],
    listaEtiquetadas: [],
    listaNoEtiquetadas: [],
    selected: -1,
    // Add these properties to state
    taggedList: [],
    untaggedList: []
  });

  // Update getTags to populate taggedList
  const getTags = async () => {
    try {
      const response = await getDetailInterfaceTags(id);
      setState(t => ({ 
        ...t, 
        listaEtiquetadas: response.data.data,
        taggedList: response.data.data // Add this line
      }));
    } catch { }
  };

  // Update getListNoTagged to populate untaggedList
  const getListNoTagged = async () => {
    try {
      const response = await getAllAlarmsInterlocksNoTagged(idGrupoControl, id);
      setState(t => ({ 
        ...t, 
        listaNoEtiquetadas: response.data.data,
        untaggedList: response.data.data // Add this line
      }));
    } catch { }
  };

  useEffect(
    () => {
      if (state.listaNoEtiquetadas.length >= 1) {
        setState(prevState => ({
          ...prevState,
          selected: state.listaNoEtiquetadas[0].idEnclavamientoAlarma,
        }));
      }
    },
    [state.listaNoEtiquetadas.length],
  );

  const {
    transform,
    zoom,
    onDragStart,
    styleInnerContainer,
    onLoadImage,
    panZoomHandlers,
  } = usePanZoom({
    container: panZoomContainer,
    imageContainer: imgRef,
    enablePan: state.isEnablePan,
    enableZoom: state.isEnableZoom,
    initialZoom: 3,
    // onPan: () => closeAllMarkers(),
  });

  const getImageState = async () => {
    try {
      const response = await getInterfaceTags(id);

      const imagen = response.data.data.urlImagen;

      setState(t => ({
        ...t,
        image: imagen.replace(/\\/g, '/').trim(),
      }));
    } catch { }
  };

  const getImagePath = () => {
    if (state.image) {
      return `${hostUrlBase}/${state.image}`;
    }

    return null;
  };

  const enableMove = () => {
    setState(prevState => ({
      ...prevState,
      isEnablePan: true,
      isEnableTagging: false,
      cursor: 'move',
    }));
  };

  const enableTagging = () => {
    setState(prevState => ({
      ...prevState,
      isEnablePan: false,
      isEnableTagging: true,
      cursor: 'default',
    }));
  };

  const lockMoveAndTagging = () => {
    setState(prevState => ({
      ...prevState,
      isEnablePan: false,
      isEnableTagging: false,
      cursor: 'pointer',
    }));
  };

  useEffect(() => {
    enableMove();
    getImageState();
    getListNoTagged();
    getTags();
    return () => { };
  }, []);

  const handleClick = async e => {
    if (!state.isEnableTagging) return false;
    if (state.listaNoEtiquetadas.length <= 0) return false;

    const rect = e.target.getBoundingClientRect();
    const xCoord = e.clientX - rect.left;
    const yCoord = e.clientY - rect.top;
    const widthM = 50;
    const heightM = 50;
    const makr = {
      key: uuidv4(),
      idEtiquetaModulo: id,
      idEnclavamientoAlarma: state.listaNoEtiquetadas[0].idEnclavamientoAlarma,
      top: yCoord * (1 / zoom) - heightM / 2,
      left: xCoord * (1 / zoom) - widthM / 2,
      width: widthM,
      height: heightM,
    };

    const bodyFormData = new FormData();
    bodyFormData.set('idEtiquetaModulo', makr.idEtiquetaModulo);
    bodyFormData.set('idEnclavamientoAlarma', makr.idEnclavamientoAlarma);
    bodyFormData.set('arriba', makr.top.toString());
    bodyFormData.set('izquierda', makr.left.toString());
    bodyFormData.set('etiqueta', '-----');

    try {
      await createTag(bodyFormData);
      getListNoTagged();
      getTags();
    } catch (ex) {
      // console.log(ex);
    }

    // setState(prevState => ({
    //   ...prevState,
    //   markers: [...prevState.markers, makr],
    // }));

    // state.listaNoEtiquetadas.push(state.listaEtiquetadas[0]);
    // state.listaEtiquetadas.shift();
  };

  useEffect(
    () => {
      if (state.isMoveMarker) {
        setState(prevState => ({
          ...prevState,
          isEnablePan: false,
          isEnableTagging: false,
          isEnableZoom: false,
        }));
      } else {
        setState(prevState => ({
          ...prevState,
          isEnablePan: true,
          isEnableTagging: false,
          isEnableZoom: true,
        }));
      }
    },
    [state.isMoveMarker],
  );

  const handleOnKeyDownMarker = (e, idDetalleEtiquetaModulo) => {
    lockMoveAndTagging();
    setState(prevState => ({
      ...prevState,
      keyMarkerMove: idDetalleEtiquetaModulo,
      isMoveMarker: true,
    }));
    e.preventDefault();
    e.stopPropagation();
  };

  const handleOnMoveMarker = useCallback(
    e => {
      if (!state.isMoveMarker) return;
      const elm = state.listaEtiquetadas.find(
        mrkr => mrkr.idDetalleEtiquetaModulo === state.keyMarkerMove,
      );
      const rect = imgRef.current.getBoundingClientRect();
      const xCoord = e.clientX - rect.left;
      const yCoord = e.clientY - rect.top;
      const widthM = 50;
      const heightM = 50;

      elm.arriba = yCoord * (1 / zoom) - heightM / 2;
      elm.izquierda = xCoord * (1 / zoom) - widthM / 2;

      setState(prevState => ({
        ...prevState,
        listaEtiquetadas: [...state.listaEtiquetadas],
      }));

      e.preventDefault();
      e.stopPropagation();
    },
    [state.isMoveMarker],
  );

  const handleOnKeyUpMarker = async e => {
    if (!state.isMoveMarker) return;
    // console.log('handleOnKeyUpMarker', e);
    const elm = state.listaEtiquetadas.find(
      mrkr => mrkr.idDetalleEtiquetaModulo === state.keyMarkerMove,
    );
    const rect = imgRef.current.getBoundingClientRect();
    const xCoord = e.clientX - rect.left;
    const yCoord = e.clientY - rect.top;
    const widthM = 50;
    const heightM = 50;

    elm.arriba = yCoord * (1 / zoom) - heightM / 2;
    elm.izquierda = xCoord * (1 / zoom) - widthM / 2;

    const makr = {
      top: yCoord * (1 / zoom) - heightM / 2,
      left: xCoord * (1 / zoom) - widthM / 2,
    };
    const bodyFormData = new FormData();
    bodyFormData.set('idDetalleEtiquetaModulo', elm.idDetalleEtiquetaModulo);
    bodyFormData.set('idEtiquetaModulo', elm.idEtiquetaModulo);
    bodyFormData.set('idEnclavamientoAlarma', elm.idEnclavamientoAlarma);
    bodyFormData.set('arriba', makr.top.toString());
    bodyFormData.set('izquierda', makr.left.toString());
    bodyFormData.set('etiqueta', '-----');
    setState(prevState => ({
      ...prevState,
      isMoveMarker: false,
    }));
    try {
      await updateTag(state.keyMarkerMove, bodyFormData);
      getListNoTagged();
      getTags();
    } catch (ex) {
      // console.log(ex);
    }
  };

  const handleOnMouseLeaveMarker = e => {
    setState(prevState => ({
      ...prevState,
      isMoveMarker: false,
    }));
  };

  const handleOnKeyDown = e => {
    if (e.shiftKey) {
      enableTagging();
    }
  };

  const handleOnKeyUp = () => {
    enableMove();
  };

  const handleOnMouseOver = () => {
    containerRef.current.focus();
  };

  const handleOnMouseLeave = () => {
    containerRef.current.blur();
  };

  const onSelected = (id) => {
    setState((s) => ({
      ...s,
      selected: id
    }));
  }

  const handleOnRemove = async key => {
    try {
      await deleteTag(key);
      getListNoTagged();
      getTags();
    } catch (ex) {
      // console.log(ex);
    }
  };

  return (
    <ContainerFlex margin="-32px 0px">
      <Row>
        <Col flex-basis="700px" padding="0" style={{ background: '#fff' }}>
          <ContainerButtonAdd>
            <ButtonToggle
              selected={state.isEnableTagging}
              onClick={enableTagging}
            >
              <MdCropFree />
              Add Tags
            </ButtonToggle>
            <ButtonToggle selected={state.isEnablePan} onClick={enableMove}>
              <MdPanTool />
              Move
            </ButtonToggle>
          </ContainerButtonAdd>

          <Container
            ref={containerRef}
            onMouseOver={handleOnMouseOver}
            onFocus={() => {}}
            onMouseLeave={handleOnMouseLeave}
            cursor={state.cursor}
            onKeyDown={handleOnKeyDown}
            onKeyUp={handleOnKeyUp}
            tabIndex="0"
          >
            <PanZoom ref={panZoomContainer} {...panZoomHandlers}>
              <PanZoomInner
                onMouseUp={handleOnKeyUpMarker}
                onMouseMove={handleOnMoveMarker}
                onMouseLeave={handleOnMouseLeaveMarker}
                onClick={handleClick}
                onFocus={() => {}}
                transform={transform}
              >
                <ListMarkers
                  markers={state.taggedList || []} // Add fallback empty array
                  isMoveMarker={state.isMoveMarker}
                  onMouseDown={handleOnKeyDownMarker}
                  zoom={zoom}
                />

                <Img
                  onDragStart={onDragStart}
                  onLoad={onLoadImage}
                  ref={imgRef}
                  alt=""
                  src={getImagePath()}
                />
              </PanZoomInner>
            </PanZoom>
          </Container>
        </Col>
        <Col flex-basis="300px" width="300px" padding="0">
          <TagsContainer>
            <Title>Tags</Title>
            <ListTags
              tags={state.untaggedList || []} // Add fallback empty array
              selected={state.selected}
              onSelect={onSelected}
            />
            <Line />
            <ListTagsTagged
              tags={state.taggedList || []} // Add fallback empty array
              onRemove={handleOnRemove}
            />
          </TagsContainer>
        </Col>
      </Row>
    </ContainerFlex>
  );
}

TagsAlarmInterlockView.propTypes = {};

export default memo(TagsAlarmInterlockView);
