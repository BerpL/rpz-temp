import React, { useState, useEffect, useRef } from 'react';
import { ControlGroupService } from 'servicesV2';
import usePanZoom from 'hooks/usePanZoom';
import useComponentSize from 'hooks/useComponentSize';
import { hostUrlBase } from 'services/Api';
import Marker from 'components/Marker';
import { GiHamburgerMenu } from 'react-icons/gi/index.esm';
import { FaTimes } from 'react-icons/fa/index.esm';
import { ContainerFlex, Row } from 'components/ContainerFlex';

import {
  getAllInterfacesByControlGroup,
} from 'services/ControlGroupService';

import {
  getInterfaceTags,
  getDetailInterfaceTags,
} from 'services/InterfacesTagsService';
import {
  getAlarmInterlock,
  getDetailAlarmInterlock,
} from 'services/AlarmsInterlocksService';

import Tree from '../Tree';
import {
  TreeContainer,
  ViewContainer,
  TagDetailContainer,
  PanZoom,
  ButtonHandlerTree,
  CloseIcon,
  PanZoomInner,
  Img,
  Message,
} from './Styles';

import DetailAlarmInterlock from './DetailAlarmInterlock';
import { borderRadius } from 'polished';

function ListMarkers({ markers, isMoveMarker, onMouseDown, zoom, onClick }) {
  return markers.map(marker => (
    <Marker
      key={marker.idDetalleEtiquetaModulo}
      isMoveMarker={isMoveMarker}
      onMouseDown={onMouseDown}
      marker={marker}
      zoom={zoom}
      onClick={onClick}
    />
  ));
}

function Index({ id, grupoName }) {
  const wrapperRef = useRef(null);

  const panZoomContainer = useRef(null);
  const imgRef = useRef(null);

  const [controlGroupService] = useState(new ControlGroupService());
  const [imagesAvailable, setImagesAvailable] = useState([]);

  const [treeState, setTreeState] = useState({
    data: [],
  });

  const [openTree, setOpenTree] = useState(true);


  const [alarmInterlockState, setAlarmInterlockState] = useState({
    alarm: null,
    detail: [],
    isLoading: true,
  });

  const [imageState, setImageState] = useState({
    image: null,
    isLoading: true,
  });

  const [tagsState, setTagsState] = useState({
    tags: [],
  });


  const wrapperSize = useComponentSize(wrapperRef);




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
    enablePan: true,
    enableZoom: true,
    initialZoom: 3,
    // onPan,
  });



  useEffect(() => {
    if (imageState.image) {
      setOpenTree(false);
      const detail = document.querySelector('#detail')
      detail.style.display = "none";
    }

  }, [transform, imageState.image])

  const getImageState = async idx => {
    setImageState(t => ({
      ...t,
      isLoading: true,
      image: null,
    }));
    try {
      const response = await getInterfaceTags(idx);
      const imagen = response.data.data.urlImagen;
      const serializeImage = imagen.replace(/\\/g, '/').trim();
      const imageUrl = `${hostUrlBase}/${serializeImage}`;

      setImageState(t => ({
        ...t,
        image: imageUrl,
      }));
    } catch (e) {
      setImageState(t => ({
        ...t,
        image: null,
      }));
    } finally {
      setImageState(t => ({
        ...t,
        isLoading: false,
      }));
    }
  };

  const getTags = async idx => {
    try {
      const response = await getDetailInterfaceTags(idx);
      setTagsState(t => ({ ...t, tags: response.data.data }));
    } catch (e) {
      setTagsState(t => ({ ...t, tags: [] }));
    }
  };

  useEffect(() => {
    async function fetchApi() {
      const response = await controlGroupService.getAllByParent(id);
      response.data.nodos = response.data.nodos.map((nodo) => {
        nodo.habilitado = true;
        return nodo;
      });
      setTreeState(t => ({
        ...t,
        data: response.data,
      }));
    }
    fetchApi();
  }, []);

  const handleClickItem = async (idx, index, tipo) => {
    try {
      const response = await getAllInterfacesByControlGroup(idx);
      const images = response.data.data;

      if(images && images.length){
        setImagesAvailable(images);
        const { idEtiquetaModulo } = images[0];
        getImageState(idEtiquetaModulo);
        getTags(idEtiquetaModulo);
        setOpenTree(false);
        setAlarmInterlockState({
          alarm: null,
          detail: [],
          isLoading: true,
        });
      }


    } catch (e) {
      setImageState(t => ({
        ...t,
        image: null,
      }));
      setTagsState(t => ({ ...t, tags: [] }));
    }
  };


  const changeImageActive = (id) => {
    getImageState(id);
    getTags(id);
    setOpenTree(false);
    setAlarmInterlockState({
      alarm: null,
      detail: [],
      isLoading: true,
    });
  }

  const handleClickAlarmInterlock = async (idEnclavamientoAlarma, e) => {
    setAlarmInterlockState(t => ({
      ...t,
      isLoading: true,
      alarm: null,
      detail: [],
    }));

    const detail = document.querySelector('#detail')
    // detail.style.display = "flex";




    if (wrapperSize.width > 480) {

      detail.style.width = "310px";
      detail.style.height = "310px";

      if ((wrapperSize.width - e.pageX) < 310) {
        detail.style.left = (e.pageX - 310) + "px";
      } else {
        detail.style.left = e.pageX + "px";
        detail.style.maxWidth = (wrapperSize.width - e.pageX) + "px";
      }

      if ((wrapperSize.height - e.pageY) < 310) {
        detail.style.top = (e.pageY - 310) + "px";
      } else {
        detail.style.top = e.pageY + "px";
        detail.style.maxWidth = (wrapperSize.height - e.pageY) + "px";
      }

    } else {
      detail.style.width = "100vw";
      detail.style.height = "100vh";
    }

    detail.style.display = "flex";



    try {
      const alarmResponse = await getAlarmInterlock(idEnclavamientoAlarma);
      const detailAlarmResponse = await getDetailAlarmInterlock(
        idEnclavamientoAlarma,
      );

      setAlarmInterlockState({
        alarm: alarmResponse.data.data,
        detail: detailAlarmResponse.data.data,
      });

    } catch (e) {
      //console.log(e);
    } finally {
      setAlarmInterlockState(t => ({
        ...t,
        isLoading: false,
      }));


    }
  };

  const handleClickCloseTagDetail = () => {
    const detail = document.querySelector('#detail')
    detail.style.display = "none";
  }


  useEffect(() => {
    if(openTree) handleClickCloseTagDetail();
  }, [openTree])

  return (
    <ContainerFlex ref={wrapperRef} style={{ height: "100vh" }}>
      <Row>
        <TreeContainer
          open={openTree}

        >
          <div
            style={{
              overflow: "hidden",
              width: "100%",
              height: "100%",
            }}
          >
            {treeState.data && (
              <Tree

                //   onClickBack={handleClickBackTree}
                items={treeState.data.nodos}
                title={grupoName}
                onClickItem={handleClickItem}
              //   onClickControl={handleClickControl}
              />
            )}
          </div>

          <ButtonHandlerTree onClick={() => setOpenTree(!openTree)}  >
            <GiHamburgerMenu />
          </ButtonHandlerTree>
        </TreeContainer>
        <ViewContainer style={{ width: wrapperSize.width, height: wrapperSize.height }}>
          <PanZoom ref={panZoomContainer} {...panZoomHandlers} style={{ width: wrapperSize.width, height: wrapperSize.height }}>
            <PanZoomInner
              transform={transform}
            // styleInnerContainer={styleInnerContainer}
            >
              <ListMarkers
                markers={tagsState.tags}
                zoom={zoom}
                onClick={handleClickAlarmInterlock}
              />

              <Img
                onDragStart={onDragStart}
                onLoad={onLoadImage}
                ref={imgRef}
                alt=""
                src={imageState.image}
              />
            </PanZoomInner>
          </PanZoom>
          {imageState.isLoading && (
            <Message active>
              Select an Alarm/Interlock to view its graphic
            </Message>
          )}
        </ViewContainer>
        <TagDetailContainer id="detail">
          <>
            <CloseIcon onClick={handleClickCloseTagDetail}>
              <FaTimes />
            </CloseIcon>
            {alarmInterlockState.alarm && (
              <DetailAlarmInterlock
                alarm={alarmInterlockState.alarm}
                detail={alarmInterlockState.detail}
                onClose={handleClickCloseTagDetail}
              />
            )}

          </>
        </TagDetailContainer>
      </Row>
      <div style={{position: 'absolute', bottom: 0, right: 0, zIndex: 1000}}>
        {imagesAvailable.map(imageAvailable =>
          <button
            style={{
              background: 'rgb(0,39,118)',
              borderRadius: 4,
              padding: '8px 12px',
              cursor: 'pointer',
              color: '#fff',
              fontSize: 13,
              outline: 'none',
              margin: '0px 10px 10px 0px',
              appearance: 'none',
            }}
            onClick={() => changeImageActive(imageAvailable.idEtiquetaModulo)}>
            {imageAvailable.nombre}
          </button>
        )}
      </div>
    </ContainerFlex >
  );
}

export default Index;
