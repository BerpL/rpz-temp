import React from 'react';

import { Container } from './styles';

function ProgressBar({ uploadProgress, showMessage = true }) {
  return <Container>
    <div className="progress-bar">
      <div className="bar-progress" style={{ width: `${uploadProgress}%` }}></div>
      <div className="text-progress">{uploadProgress}%</div>
    </div>
    {showMessage && <p className="text-help">* Do not close the modal until the loading bar ends</p>}
  </Container>;
}

export default ProgressBar;
