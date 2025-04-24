/**
 *
 * VideosViewer
 *
 */

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Player } from 'video-react';
import styled from 'styled-components';
import '../../../node_modules/video-react/dist/video-react.css';

const Text = styled.div`
  color: ${({ theme: { base } }) => base};
  font-size: 15px;
  width: 100%;
`;

const ItemImage = styled.div`
  width: 80px;
  margin-right: 20px;

  & img {
    width: 100%;
    border-radius: 6px;
  }
`;

const VideoViewerContainer = styled.div`
    overflow; auto
`;

const Item = styled.div`
  padding: 10px 0px;
  display: flex;
  cursor: pointer;
  transition: 0.5s all;
  align-items: center;
`;

const ItemTitle = styled.div`
  color: ${({ theme: { base } }) => base};
  font-size: 13px;
`;

const VideoBackground = styled.div`
   color: ${({ theme: { bgU } }) => bgU};
   margin-top: 10px;
   border-radius: 6px;
   overflow: hidden;

`;

const VideoContainer = styled.div`
  max-width: ${1280 / 2}px;
  margin: 0 auto;
  outline: none;
  > div {
    outline: none;
  }
`;

function VideosViewer({ name = 'Videos', videos = [] }) {
  const [selectedVideo, setSelectedVideo] = useState(0);
  const playerVideo = useRef(null);
  const handleSelectedVideo = (index) => {
    setSelectedVideo(index);
    playerVideo.current.load();
  }
  return (
    <VideoViewerContainer>
      <Text>{name}</Text>
      {videos.length > 0 &&
        <VideoBackground>
          <VideoContainer>
            <Player
              ref={playerVideo}
              playsInline
              poster={videos[selectedVideo].poster}
              src={videos[selectedVideo].fileUrl}
            />
          </VideoContainer>
        </VideoBackground>}
      {videos.map((video, index) => (
        <Item key={index} onClick={() => handleSelectedVideo(index)}>
          <ItemImage>
            <img alt={video.name} src={video.poster} />
          </ItemImage>
          <ItemTitle>{video.name}</ItemTitle>
        </Item>
      ))}
    </VideoViewerContainer>
  );
}

VideosViewer.propTypes = {
  name: PropTypes.string,
  videos: PropTypes.array,
};

export default VideosViewer;
