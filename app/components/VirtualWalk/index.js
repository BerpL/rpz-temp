/**
 *
 * VirtualWalk
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import History from 'utils/history';
import { getVideoById, getVideoBlob } from 'services/VideosService';
import { hostUrlBase } from 'services/Api';
// components V2
import InterfaceActions from 'V2/components/InterfaceActions';
import InterfaceContent from 'V2/components/InterfaceContent';

import '../../../node_modules/video-react/dist/video-react.css';
import { Player } from 'video-react';
import { ContainerFlex, ContainerVideo, BeforeTitle } from './Styles';

function VirtualWalk({ match, location }) {
  const { id } = match.params;
  const {image} = location.state
  const [videoUrl, setVideoUrl] = useState();
  const [stateVideo, setStateVideo] = useState({
    video: [],
    loading: true,
    error: false,
    video_play: '',
  });

  async function loadVideo() {
    const response = await getVideoById(id);
    setStateVideo(e => ({
      ...e,
      video: response.data.data,
      loading: false,
    }));

    try {
      const video = `${hostUrlBase}/${response.data.data.url}`
      setVideoUrl(video);
      const response_video = await getVideoBlob(response.data.data.url);
      const variable = URL.createObjectURL(response_video.data);
      setStateVideo(e => ({
        ...e,
        video_play: variable,
      }));
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    loadVideo();
  }, []);

  const { video } = stateVideo;
  const { video_play } = stateVideo;
  const goBack = () => History.goBack();

  return (
    <ContainerFlex>
      <InterfaceActions
        hasBack
        backMessage="Back to Videos"
        onClickBack={goBack}
      />
      <InterfaceContent>
        <BeforeTitle>{video.nombre}</BeforeTitle>

        {video.imagenPrevia && (
          <ContainerVideo>
            <Player
              playsInline
              poster={image}
              src={videoUrl}
            />
          </ContainerVideo>
        )}
      </InterfaceContent>
    </ContainerFlex>
  );
}

VirtualWalk.propTypes = {
  match: PropTypes.object.isRequired,
};

export default VirtualWalk;
