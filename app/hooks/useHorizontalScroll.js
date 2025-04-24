import { useCallback, useState, useRef, useMemo } from 'react';

const noop = () => { };
const clamp = (min, max) => value => Math.max(min, Math.min(value, max));

const tryCancelEvent = event => {
  if (event.cancelable === false) {
    return false;
  }

  event.preventDefault();
  return true;
};

const isChildOf = (child, parent) =>
  !!(child && parent) &&
  (child === parent || isChildOf(child.parentElement, parent));

function normalizeDelta(deltaY) {
  if (deltaY > 0) {
    return 100;
  }
  return -100;
}

const useHorizontalScroll = ({
  enableScroll = true,
  enablePan = true,
  container,
  onScroll = noop,
  onPanStart = noop,
  onPan = noop,
  onPanEnd = noop,
  reverseScroll = false,
  initialScroll = { x: 0, y: 0 },
}) => {
  if (container === undefined) {
    throw Error('Container cannot be empty and should be a ref');
  }

  const [transform, setTransform] = useState({
    ...initialScroll,
  });

  const wasPanning = useRef(false);
  const wasTouching = useRef(false);
  const prev = useRef([]);

  const [isPanning, setPanning] = useState(false);

  const canScroll = useCallback(() => {
    if (container.current) {
      const el = container.current;
      const rect = el.getBoundingClientRect();
      const scroller = el.firstElementChild;

      return (
        scroller.offsetLeft < rect.left ||
        scroller.offsetLeft + scroller.offsetWidth > rect.width
      );
    }

    return false;
  });

  const setPan = useCallback(
    f =>
      setTransform(({ x }) => {
        const el = container.current;
        const max = el.lastElementChild.scrollWidth;
        const newPan = typeof f === 'function' ? f({ x }) : f;
        const win = el.offsetWidth;
        const bounds = -(max - win);
        return {
          x: clamp(bounds, 0)(newPan.x),
          y: 0,
        };
      }),
    [onPan, enablePan],
  );

  const startPan = useCallback(
    pointers => {
      if (enablePan) {
        prev.current = pointers;
        setPanning(true);
        onPanStart(pointers);
      }
    },
    [enablePan, onPanStart],
  );

  const movePan = useCallback(
    (pointers, e) => {
      if (isPanning) {
        wasPanning.current = true;

        const prevPointers = prev.current;
        prev.current = pointers;
        window.requestAnimationFrame(() => {
          setPan(({ x }) => {
            let dx = 0;
            const l = Math.min(pointers.length, prevPointers.length);
            for (let i = 0; i < l; i += 1) {
              dx += pointers[i].x - prevPointers[i].x;
            }
            return {
              x: x + dx / l,
              y: 0,
            };
          });

          onPan(e);
        });
      }
    },
    [isPanning, onPan],
  );

  const onDragStart = event => tryCancelEvent(event);

  const endPan = useCallback(
    () => {
      if (isPanning) {
        setPanning(false);
        onPanEnd();
      }
    },
    [isPanning, onPanEnd],
  );

  const onTouchStart = event => {
    event.persist();
    wasTouching.current = true;
    const { touches } = event;
    startPan([...touches].map(({ pageX, pageY }) => ({ x: pageX, y: pageY })));
  };

  const onTouchMove = event => {
    const { touches } = event;
    movePan([...touches].map(({ pageX, pageY }) => ({ x: pageX, y: pageY })));
    tryCancelEvent(event);
  }

  const onTouchEnd = () => {
    endPan();
  };

  const onTouchCancel = () => endPan();

  const onMouseDown = event => {
    event.persist();
    const { pageX, pageY } = event;
    startPan([{ x: pageX, y: pageY }]);
  };

  const onMouseUp = () => {
    endPan();
  };

  const onMouseMove = ({ pageX, pageY }) => {
    movePan([{ x: pageX, y: pageY }]);
  };

  const onMouseOut = useCallback(
    event => {
      if (!isChildOf(event.relatedTarget, container.current)) {
        endPan();
      }
    },
    [isPanning, onPanEnd],
  );

  const onClickCapture = useCallback(event => {
    if (wasPanning.current && !wasTouching.current) {
      wasPanning.current = false;
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
    }
  });

  const onWheel = useCallback(
    event => {
      if (enableScroll && container.current && canScroll()) {
        const { deltaY, deltaX } = event;

        const rawData = normalizeDelta(deltaY || deltaX);

        const el = container.current;
        const max = el.lastElementChild.scrollWidth;
        const win = el.offsetWidth;
        const bounds = -(max - win);

        window.requestAnimationFrame(() => {
          setTransform(({ x }) => {
            const animationValue = x;
            const newAnimationValue = animationValue + rawData;
            const newAnimationValueNegative = animationValue - rawData;

            const curr = reverseScroll
              ? newAnimationValueNegative
              : newAnimationValue;

            if (curr >= 1) {
              return initialScroll;
            }
            if (curr <= bounds) {
              const xTmp = bounds + 1;
              return { x: xTmp, y: 0 };
            }

            return { x: curr, y: 0 };
          });
        });

        tryCancelEvent(event);
      }
    },
    [enableScroll, onScroll],
  );

  const getPercentSlider = useCallback(x => {
    if (enableScroll && container.current && canScroll()) {
      const el = container.current;
      const max = el.lastElementChild.scrollWidth;
      const win = el.offsetWidth;
      const bounds = -(max - win);
      const percentTmp = -100 - (x * 100) / -bounds;
      return clamp(-100, 0)(percentTmp);
    }

    return -100;
  }, []);

  return {
    x: transform.x,
    isPanning,
    getPercentSlider,
    panWheelHandlers: {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onTouchCancel,
      onMouseDown,
      onClickCapture,
      onMouseMove,
      onMouseUp,
      onDragStart,
      onMouseOut,
      onWheel,
    },
  };
};

export default useHorizontalScroll;
