import { useCallback, useState, useRef, useEffect } from 'react';

const clamp = (min, max) => value => Math.max(min, Math.min(value, max));
const identity = x => x;
const noop = () => { };
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));
const maybe = (f, g) => v => (v === null || v === undefined ? f() : g(v));
const snd = g => ([x, y]) => [x, g(y)];
const toPair = v => [v, v];

const getPinchLength = ([touch1, touch2]) => {
  return Math.hypot(
    touch1.pageY - touch2.pageY + touch1.pageX - touch2.pageX ,
  );
}


const getPinchMidpoint = ([touch1, touch2]) => ({
  x: (touch1.clientX + touch2.clientX) / 2,
  y: (touch1.clientY + touch2.clientY) / 2,
});

const getOffset = maybe(
  () => ({ left: 0, top: 0 }),
  compose(
    ([el, { left, top }]) => ({
      left: left + el.offsetLeft,
      top: top + el.offsetTop,
    }),
    snd(el => getOffset(el.offsetParent)),
    toPair,
  ),
);

const tryCancelEvent = event => {
  if (event.cancelable === false) {
    return false;
  }

  event.preventDefault();
  return true;
};

const getConstraintCoordinate = (
  imageContainer,
  minZoom,
  zoom,
  maxX,
  maxY,
  x,
  y,
  isImage,
) => {
  if (minZoom === zoom) return { x: maxX, y: maxY };
  let actualWidthImage;
  let nextWidthImage;

  let actualHeightImage;
  let nextHeightImage;

  if (isImage) {
    actualWidthImage = imageContainer.naturalWidth * minZoom;
    nextWidthImage = imageContainer.naturalWidth * zoom;

    actualHeightImage = imageContainer.naturalHeight * minZoom;
    nextHeightImage = imageContainer.naturalHeight * zoom;
  } else {
    actualWidthImage = imageContainer.offsetWidth * minZoom;
    nextWidthImage = imageContainer.offsetWidth * zoom;

    actualHeightImage = imageContainer.offsetHeight * minZoom;
    nextHeightImage = imageContainer.offsetHeight * zoom;
  }

  const minX = actualWidthImage - nextWidthImage;
  const minY = actualHeightImage - nextHeightImage;

  return {
    x: clamp(minX + maxX, maxX)(x),
    y: clamp(minY + maxY, maxY)(y),
  };
};

const getPositionOnElement = compose(
  ({ left, top }) => (x, y) => ({
    x: x - left,
    y: y - top,
  }),
  getOffset,
);

const getAutofitScale = (containerDimensions, imageDimensions) => {
  const { naturalWidth: imageWidth, naturalHeight: imageHeight } =
    imageDimensions || {};

  if (!(imageWidth > 0 && imageHeight > 0)) {
    return 1;
  }

  return Math.min(
    containerDimensions.offsetWidth / imageWidth,
    containerDimensions.offsetHeight / imageHeight,
    1,
  );
};

const getAutoFitScaleNonImage = (container, otherContainer) => {
  const { offsetWidth: imageWidth, offsetHeight: imageHeight } =
    otherContainer || {};
  if (!(imageWidth > 0 && imageHeight > 0)) {
    return 1;
  }
  return Math.min(
    container.offsetWidth / imageWidth,
    container.offsetHeight / imageHeight,
    1,
  );
};

function normalizeDelta(deltaY) {
  if (deltaY > 0) {
    return 100;
  }
  return -100;
}

const isChildOf = (child, parent) =>
  !!(child && parent) &&
  (child === parent || isChildOf(child.parentElement, parent));

const usePanZoom = ({
  container,
  imageContainer,
  enablePan = true,
  enableZoom = true,
  requirePinch = false,
  preventClickOnPan = true,
  zoomSensitivity = 0.01,
  minZoom: minZoomed = 0,
  maxZoom: maxZoomed = Infinity,
  minX: minX_ = -Infinity,
  maxX: maxX_ = Infinity,
  minY: minY_ = -Infinity,
  maxY: maxY_ = Infinity,
  initialZoom = 1,
  initialPan = { x: 0, y: 0 },
  onPanStart = noop,
  onPan = noop,
  onPanEnd = noop,
  onZoom = noop,
  isImage = true,
}) => {
  if (container === undefined) {
    throw Error('Container cannot be empty and should be a ref');
  }
  const wasPanning = useRef(false);
  const prev = useRef([]);

  const [isPanning, setPanning] = useState(false);
  const [lastPinchLength, setLasPinchLength] = useState(null);
  const [minZoom, setMinZoom] = useState(minZoomed);
  const [maxZoom, setMaxZoom] = useState(maxZoomed);

  const [maxX, setMaxX] = useState(maxX_);
  const [minX] = useState(minX_);
  const [maxY, setMaxY] = useState(maxY_);
  const [minY] = useState(minY_);

  const [styleInnerContainer, setStyleInnerContainer] = useState(undefined);

  const [transform, setTransform] = useState({
    ...initialPan,
    zoom: initialZoom,
  });

  useEffect(() => {
    if (!isImage) {
      setStyleInnerContainer({
        width: imageContainer.offsetWidth,
        height: imageContainer.offsetHeight,
      });
      const initialZoomTmp = getAutoFitScaleNonImage(
        container.current,
        imageContainer.current,
      );

      setMinZoom(initialZoomTmp);
      setMaxZoom(initialZoomTmp * 4);

      let top = 0;
      let left = 0;

      if (
        imageContainer.current.offsetHeight * initialZoomTmp <
        container.current.offsetHeight
      ) {
        top =
          (container.current.offsetHeight -
            imageContainer.current.offsetHeight * initialZoomTmp) /
          2;
      }

      if (
        imageContainer.current.offsetWidth * initialZoomTmp <
        container.current.offsetWidth
      ) {
        left =
          (container.current.offsetWidth -
            imageContainer.current.offsetWidth * initialZoomTmp) /
          2;
      }

      setMaxX(left);
      setMaxY(top);

      // setMinY(top);
      setTransform({ x: left, y: top, zoom: initialZoomTmp });
    }
  }, []);

  // const clampX = useCallback(clamp(minX, maxX), [minX, maxX]);
  // const clampY = useCallback(clamp(minY, maxY), [minY, maxY]);
  const clampZoom = useCallback(clamp(minZoom, maxZoom), [minZoom, maxZoom]);

  const setPan = useCallback(
    f =>
      setTransform(({ x, y, zoom }) => {
        const newPan = typeof f === 'function' ? f({ x, y }) : f;
        const coordinates = getConstraintCoordinate(
          imageContainer.current,
          minZoom,
          zoom,
          maxX,
          maxY,
          newPan.x,
          newPan.y,
          isImage,
        );
        return {
          ...coordinates,
          zoom,
        };
      }),
    [minX, maxX, minY, maxY],
  );

  const setZoom = useCallback(
    (f, maybeCenter) =>
      setTransform(({ x, y, zoom }) => {
        const newZoom = clampZoom(typeof f === 'function' ? f(zoom) : f);

        const center = maybe(
          () => ({
            x: container.current.offsetWidth / 2,
            y: container.current.offsetHeight / 2,
          }),
          identity,
        )(maybeCenter);

        const coordinates = getConstraintCoordinate(
          imageContainer.current,
          minZoom,
          newZoom,
          maxX,
          maxY,
          x + ((center.x - x) * (zoom - newZoom)) / zoom,
          y + ((center.y - y) * (zoom - newZoom)) / zoom,
          isImage,
        );

        return {
          ...coordinates,
          zoom: newZoom,
        };
      }),
    [minX, maxX, minY, maxY, minZoom, maxZoom],
  );

  const startPanZoom = useCallback(
    pointers => {
      if (enablePan) {
        prev.current = pointers;
        setPanning(true);
        onPanStart(pointers);
      }
    },
    [enablePan, onPanStart],
  );

  const movePanZoom = useCallback(
    (pointers, e) => {
      if (isPanning) {
        wasPanning.current = true;

        const prevPointers = prev.current;
        prev.current = pointers;

        setPan(({ x, y }) => {
          let dx = 0;

          let dy = 0;

          const l = Math.min(pointers.length, prevPointers.length);

          for (let i = 0; i < l; i += 1) {
            dx += pointers[i].x - prevPointers[i].x;
            dy += pointers[i].y - prevPointers[i].y;
          }

          return {
            x: x + dx / l,
            y: y + dy / l,
          };
        });

        onPan(e);
      }
    },
    [isPanning, onPan, minX, maxX, minY, maxY],
  );

  const endPanZoom = useCallback(
    () => {
      if (isPanning) {
        // console.log("stop");
        setPanning(false);
        onPanEnd();
      }
    },
    [isPanning, onPanEnd],
  );

  const onClickCapture = useCallback(
    event => {
      if ((preventClickOnPan, wasPanning.current)) {
        wasPanning.current = false;
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
      }
    },
    [preventClickOnPan],
  );

  const pinchChange = useCallback(
    touches => {
      if (enableZoom && container.current) {


        const length = getPinchLength(touches);
        console.log(length);
        const midpoint = getPinchMidpoint(touches);

        const pointerPosition = getPositionOnElement(container.current)(
          midpoint.x,
          midpoint.y,
        );

        setZoom(
          zoom => (lastPinchLength ? (zoom * length) / lastPinchLength : zoom),
          pointerPosition,
        );

        setLasPinchLength(length);

        onZoom();
      }
    },
    [
      enableZoom,
      lastPinchLength,
      onZoom,
      minX,
      maxX,
      minY,
      maxY,
      minZoom,
      maxZoom,
    ],
  );

  const onMouseOut = useCallback(
    event => {
      if (!isChildOf(event.relatedTarget, container.current)) {
        endPanZoom();
      }
    },
    [isPanning, onPanEnd],
  );

  const onWheel = useCallback(
    event => {
      if (enableZoom && container.current && (!requirePinch || event.ctrlKey)) {
        const { pageX, pageY, deltaY } = event;

        const pointerPosition = getPositionOnElement(container.current)(
          pageX,
          pageY,
        );

        setZoom(
          zoom => zoom * (1 - zoomSensitivity) ** (normalizeDelta(deltaY) / 25),
          pointerPosition,
        );

        onZoom();
        tryCancelEvent(event);
      }
    },
    [
      enableZoom,
      requirePinch,
      onZoom,
      minX,
      maxX,
      minY,
      maxY,
      minZoom,
      maxZoom,
    ],
  );

  const onTouchStart = ({ touches }) => {
    //console.log(touches);
    if (touches.length === 2) {
      setLasPinchLength(getPinchLength(touches));
    } else {
      startPanZoom(
        [...touches].map(({ pageX, pageY }) => ({ x: pageX, y: pageY })),
      );
    }
  };
  const onTouchMove = event => {
    const { touches } = event;
    //  console.log(touches);
    if (touches.length === 2) {


      pinchChange(touches);
    } else {
      movePanZoom(
        [...touches].map(({ pageX, pageY }) => ({ x: pageX, y: pageY })),
      );
      tryCancelEvent(event);
    }
  };
  const onTouchEnd = () => endPanZoom();
  const onTouchCancel = () => endPanZoom();
  const onMouseDown = event => {
    event.persist();
    const { pageX, pageY } = event;

    startPanZoom([{ x: pageX, y: pageY }], event);
  };
  const onMouseMove = ({ pageX, pageY }) => {
    movePanZoom([{ x: pageX, y: pageY }]);
  };
  const onMouseUp = () => endPanZoom();

  const onMouseLeave = () => endPanZoom();

  const onDragStart = event => tryCancelEvent(event);

  const onLoadImage = () => {
    setStyleInnerContainer({
      width: imageContainer.current.naturalWidth,
      height: imageContainer.current.naturalHeight,
    });
    const initialZoomTmp = getAutofitScale(
      container.current,
      imageContainer.current,
    );
    setMinZoom(initialZoomTmp);
    setMaxZoom(initialZoomTmp * 4);

    let top = 0;
    let left = 0;

    if (
      imageContainer.current.naturalHeight * initialZoomTmp <
      container.current.offsetHeight
    ) {
      top =
        (container.current.offsetHeight -
          imageContainer.current.naturalHeight * initialZoomTmp) /
        2;
    }

    if (
      imageContainer.current.naturalWidth * initialZoomTmp <
      container.current.offsetWidth
    ) {
      left =
        (container.current.offsetWidth -
          imageContainer.current.naturalWidth * initialZoomTmp) /
        2;
    }

    setMaxX(left);
    setMaxY(top);

    // setMinY(top);
    setTransform({ x: left, y: top, zoom: initialZoomTmp });
  };

  return {
    transform: `translate3D(${transform.x}px, ${transform.y}px, 0) scale(${
      transform.zoom
      })`,
    pan: { x: transform.x, y: transform.y },
    zoom: transform.zoom,
    setPan,
    minZoom,
    setZoom,
    onLoadImage,
    onDragStart,
    styleInnerContainer,
    panZoomHandlers: {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      // onTouchCancel,
      onMouseDown,
      onMouseLeave,
      onMouseMove,
      onMouseUp,
      onClickCapture,
      onMouseOut,
      onWheel,
    },
  };
};

export default usePanZoom;
