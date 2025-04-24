import React from 'react';
import '@google/model-viewer';

const styleViewer = {
  width: '100%',
  height: 'calc(100vh - 50px)',
  '--poster-color': '#2e2c3a',
};

const ModelViewer = ({ src }) => (
  <model-viewer
    src={src}
    id="modelo"
    style={styleViewer}
    alt="A 3D model"
    camera-controls
    auto-rotate
    ar
    magic-leap
  />
);

export default ModelViewer;
