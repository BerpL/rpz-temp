import React, { Component } from 'react';
import DOM from 'react-dom';
import { Motion, spring, presets } from 'react-motion';
import styled from 'styled-components';

const ItemContainer = styled.div`
  display: flex;
  will-change: transform;
  flex-wrap: wrap;
  margin: 0px auto;
  position: relative;
`;

const SliderContainer = styled.div`
  z-index: 3;
  left: 0;
  width: 100%;
  height: 1px;
  pointer-events: none;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  position: absolute;
  top: calc(50% - 1px);
`;

const SliderBar = styled.div`
  background: rgba(255, 255, 255, 1);
  width: 100%;
  left: -100%;
  height: 1px;
  position: absolute;
`;

const Slider = props => (
  <SliderContainer>
    <SliderBar style={props.style} />
  </SliderContainer>
);

export default class ScrollHorizontal extends Component {
  constructor(props) {
    super(props);

    this.state = { animValues: 0, bounds: 0 };

    this.onScrollStart = this.onScrollStart.bind(this);
    this.resetMin = this.resetMin.bind(this);
    this.resetMax = this.resetMax.bind(this);
  }

  componentDidUpdate = () => this.calculate();

  onScrollStart(e) {
    e.preventDefault();
    // If scrolling on x axis, change to y axis. Otherwise, just get the y deltas.
    // (Basically, this for Apple mice that allow horizontal scrolling by default)
    const rawData = e.deltaY ? e.deltaY : e.deltaX;
    const mouseY = Math.floor(rawData);

    // Bring in the existing animation values
    const animationValue = this.state.animValues;
    const newAnimationValue = animationValue + mouseY;
    const newAnimationValueNegative = animationValue - mouseY;

    if (!this.caniscroll()) {
      return;
    }

    const scrolling = () => {
      this.props.reverseScroll
        ? this.setState({ animValues: newAnimationValueNegative })
        : this.setState({ animValues: newAnimationValue });
    };

    // Begin Scrolling Animation
    window.requestAnimationFrame(scrolling);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      true &&
      // Ensure component has been loaded
      this.calculate.timer !== void 0 &&
      this.props.children === nextProps.children &&
      this.state.animValues === nextState.animValues
    ) {
      return false;
    }

    if (
      true &&
      this.props.children === nextProps.children &&
      this.caniscroll() === false
    ) {
      return false;
    }

    return true;
  }

  caniscroll() {
    const el = DOM.findDOMNode(this.hScrollParent);
    const rect = el.getBoundingClientRect();
    const scroller = el.firstElementChild;

    return (
      scroller.offsetLeft < rect.left ||
      scroller.offsetLeft + scroller.offsetWidth > rect.width
    );
  }

  scrollZPerPercent = (z, boundsProp) => {
    const bounds = -boundsProp;
    const percent = -100 - (z * 100) / bounds;

    if (percent > -bounds && percent < 0) {
      return percent;
    }
    if (percent <= -bounds) {
      return -100;
    }
    if (percent >= 0) {
      return 0;
    }
  };

  calculate() {
    // Cancel the previous calculate
    clearTimeout(this.calculate.timer);

    // Lazy to calculate, prevent max recurse call
    this.calculate.timer = setTimeout(() => {
      // Calculate the bounds of the scroll area
      const el = DOM.findDOMNode(this.hScrollParent);

      const max = el.lastElementChild.scrollWidth;

      const win = el.offsetWidth;

      // Get the new animation values
      const curr = this.state.animValues;

      // Establish the bounds. We do this every time b/c it might change.
      const bounds = -(max - win);

      this.setState({ bounds });

      // Logic to hold everything in place
      if (curr >= 1) {
        this.resetMin();
      } else if (curr <= bounds) {
        const x = bounds + 1;
        this.resetMax(x);
      }
    });
  }

  resetMin() {
    this.setState({ animValues: 0 });
  }

  resetMax(x) {
    this.setState({ animValues: x });
  }

  render() {
    const { config, style, children, widthWrapper } = this.props;
    const { width, height } = style;
    const springConfig = config || presets.noWobble;

    // Styles
    const styles = {
      height: height || `100%`,
      width: width || `100%`,
      overflow: `hidden`,
      position: `relative`,
      display: 'flex',
      alignItems: 'center',
      ...style,
    };
    return (
      <div
        onWheel={this.onScrollStart}
        ref={r => {
          this.hScrollParent = r;
        }}
        style={styles}
      >
        <Motion style={{ z: spring(this.state.animValues, springConfig) }}>
          {({ z }) => {
            const scrollingElementStyles = {
              transform: `translate3d(${z}px, 0,0)`,
              width: `${widthWrapper}px` || '',
            };

            const sliderElementStyles = {
              left: `${this.scrollZPerPercent(z, this.state.bounds)}%`,
            };

            return (
              <ItemContainer style={scrollingElementStyles}>
                <Slider style={sliderElementStyles} />
                {children}
              </ItemContainer>
            );
          }}
        </Motion>
      </div>
    );
  }
}

ScrollHorizontal.defaultProps = {
  reverseScroll: false,
  style: { width: `100%`, height: `100%` },
};
