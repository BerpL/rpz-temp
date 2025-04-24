import React, { useState } from 'react';
import Modal from 'components/ModalVideo';
import { hostUrlBase } from 'services/Api';
import { Player } from 'video-react';
import DocItem from './DocItem';
import { Container, Title, Title2 } from './Styles';
import 'video-react/dist/video-react.css';
const VideoViewer = ({ docs, title, type }) => {
  const [state, setState] = useState({
    open: false,
    video: null,
  });
  const handleClickDocument = url => {
    setState({
      open: true,
      video: `${hostUrlBase}/${url}`,
    });
  };
  return (
    <Container>
      {
        type === 1 ? 
          <Title>{title}</Title>
          : 
          <Title2>{title}</Title2>
      }
      {docs.map(doc => (
        <DocItem
          key={doc.idMedio}
          doc={doc}
          onClickDocument={handleClickDocument}
        />
      ))}
      <Modal open={state.open} onClose={() => setState({ open: false })}>
        <div>
          {state.video && (
            <Player
              // playsInline
              autoPlay
              src={state.video}
            />
          )}
        </div>
      </Modal>
    </Container>
  );
};

export default VideoViewer;
