import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import './Toolbar.css';
import { MdZoomIn, MdZoomOut, MdZoomOutMap } from 'react-icons/md/index.esm';
import { ToolBarContainer, ButtonToolbar } from './Styles';

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: 0,
    };
  }

  zoomIn(e) {
    if (this.props.onZoomIn) {
      this.props.onZoomIn(e);
    }
  }

  zoomOut(e) {
    if (this.props.onZoomOut) {
      this.props.onZoomOut(e);
    }
  }

  fitWidth(e) {
    if (this.props.onFitWidth) {
      this.props.onFitWidth(e);
    }
  }

  // fitHeight(e) {
  //   if (this.props.onFitHeight) {
  //     this.props.onFitHeight(e);
  //   }
  // }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.scale !== nextState.scale) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <ToolBarContainer className="Toolbar">
        <ButtonToolbar className="ZoomIn" onClick={e => this.zoomOut(e)}>
          <MdZoomOut />
        </ButtonToolbar>
        <ButtonToolbar className="ZoomOut" onClick={e => this.zoomIn(e)}>
          <MdZoomIn />
        </ButtonToolbar>
        <ButtonToolbar className="FitWidth" onClick={e => this.fitWidth(e)}>
          <MdZoomOutMap />
        </ButtonToolbar>
        {/* <button className="FitHeight" onClick={e => this.fitHeight(e)}>
          ][
        </button> */}
      </ToolBarContainer>
    );
  }
}

Toolbar.propTypes = {
  onZoomIn: PropTypes.func,
  onZoomOut: PropTypes.func,
  onFitWidth: PropTypes.func,
};

export default Toolbar;
