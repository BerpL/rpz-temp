import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pdfjsLib from 'pdfjs-dist';
import Viewer from './Viewer';
import Toolbar from './Toolbar';
import { PdfBody, Container } from './Styles';

class PdfViewer2 extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const loadingTask = pdfjsLib.getDocument(this.props.url);
    loadingTask.promise.then(
      doc => {
        this.viewer.setState({
          doc,
        });
        this.setState({
          loading: false,
        })
      },
      reason => {
        console.error(`Error during ${this.props.url} loading: ${reason}`);
      },
    );
  }

  zoomIn() {
    this.viewer.setState({
      scale:
        this.viewer.state.scale > 3
          ? this.viewer.state.scale
          : this.viewer.state.scale * 1.125,
    });
  }

  zoomOut() {
    this.viewer.setState({
      scale:
        this.viewer.state.scale < 0.5
          ? this.viewer.state.scale
          : this.viewer.state.scale / 1.125,
    });
  }

  fitWidth() {
    const factor =
      document.querySelector('.Viewer').clientWidth /
      document.querySelector('.textLayer').clientWidth;

    this.viewer.setState({
      scale: this.viewer.state.scale * factor,
    });
  }

  fitHeight() {
    const factor =
      document.querySelector('.Viewer').clientHeight /
      document.querySelector('.textLayer').clientHeight;

    this.viewer.setState({
      scale: this.viewer.state.scale * factor,
    });
  }

  displayScaleChanged(e) {
    // Solo intenta actualizar el estado del toolbar si existe
    if (this.toolbar) {
      this.toolbar.setState({
        scale: e.scale,
      });
    }
  }

  render() {
    const { showToolbar = true } = this.props; // Recibimos el flag, por defecto es `true`
    
    return (
      <Container>
        {/* Solo muestra el toolbar si showToolbar es true */}
        {showToolbar && (
          <Toolbar
            ref={ref => (this.toolbar = ref)}
            onZoomIn={e => this.zoomIn(e)}
            onZoomOut={e => this.zoomOut(e)}
            onFitWidth={e => this.fitWidth(e)}
            onFitHeight={e => this.fitHeight(e)}
          />
        )}
        
        <PdfBody>
          {this.state.loading && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              <p>LOADING....</p>
            </div>
          )}

          <Viewer
            ref={ref => (this.viewer = ref)}
            onScaleChanged={e => this.displayScaleChanged(e)}
          />
        </PdfBody>
      </Container>
    );
  }
}

PdfViewer2.propTypes = {
  url: PropTypes.string, // La URL del PDF es requerida
  showToolbar: PropTypes.bool,      // Nueva prop para controlar la visibilidad del Toolbar
};

export default PdfViewer2;
