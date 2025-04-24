/* eslint-disable react/prop-types */
import React from 'react';

const ModelIframeViewer = ({ src }) => (
  <iframe src={src} title="Visor" style={{ width: '95%', height: '95%', marginLeft: '1rem' }} />
);

export default ModelIframeViewer;
