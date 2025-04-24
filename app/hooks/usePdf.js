import { useState, useEffect, useCallback } from 'react';
import * as PdfJs from 'pdfjs-dist/webpack';
import range from 'lodash/range';

let timer;

const clamp = (min, max) => value => Math.max(min, Math.min(value, max));
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));
const maybe = (f, g) => v => (v === null || v === undefined ? f() : g(v));
const snd = g => ([x, y]) => [x, g(y)];
const toPair = v => [v, v];

const BATCH_COUNT = 10;

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

function normalizeDelta(deltaY) {
  if (deltaY > 0) {
    return 100;
  }
  return -100;
}

const usePdf = ({
  src,
  enableZoom = true,
  container,
  requirePinch = true,
  zoomSensitivity = 0.01,
  minZoom = 0.5,
  maxZoom = 3,
}) => {
  const [pdf, setPdf] = useState(null);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState(0);
  const [next, setNext] = useState(0);
  const [scale, setScale] = useState(1);
  const [error, setError] = useState(null);
  const [reRender, setRender] = useState(Date.now());
  const [heightScroll, setHeightScroll] = useState(0);
  const [widthScroll, setWidthScroll] = useState(0);
  const [baseSizePage, setBaseSizePage] = useState(false);

  const clampZoom = useCallback(clamp(minZoom, maxZoom), [minZoom, maxZoom]);

  useEffect(
    () => {
      setRender(Date.now());
      setHeightScroll(container.current.scrollHeight);
    },
    [scale],
  );

  useEffect(
    () => {
      if (container.current) {
        const ctx = container.current;
        const scrollTop = (ctx.scrollHeight * ctx.scrollTop) / heightScroll;
        const scrollLeft = (ctx.scrollWidth - ctx.offsetWidth) / 2;
        container.current.scrollTop = scrollTop;
        container.current.scrollLeft = scrollLeft;
      }
    },
    [reRender],
  );

  const onWheel = useCallback(
    event => {
      if (event.ctrlKey && enableZoom && requirePinch && container.current) {
        const { deltaY } = event;

        requestAnimationFrame(() => {
          setScale(scaleTmp =>
            clampZoom(
              scaleTmp * (1 - zoomSensitivity) ** (normalizeDelta(deltaY) / 7),
            ),
          );
        });
      }
    },
    [enableZoom, requirePinch],
  );

  useEffect(() => {
    function preventDefault(e) {
      const event = e || window.event;
      if (event.preventDefault) event.preventDefault();
      event.returnValue = false;
    }
    setHeightScroll(container.current.scrollHeight);
    setWidthScroll(container.current.scrollWidth);
    function wheel(e) {
      if (e.ctrlKey) {
        return preventDefault(e);
      }

      return true;
    }

    window.addEventListener('DOMMouseScroll', wheel, { passive: false });
    window.addEventListener('mousewheel', wheel, { passive: false });
  }, []);

  useEffect(
    () => {
      setLoading(true);
      PdfJs.getDocument(src)
        .then(doc => {
          timer = setTimeout(() => setPdf(doc), 2000);
        })
        .catch(err => setError(err));

      return () => {
        setPages([]);
        setCursor(0);
        setNext(0);
        setScale(1);
        setError(null);
        setBaseSizePage(false);
        clearTimeout(timer);
      };
    },
    [src],
  );

  useEffect(
    () => {
      if (pdf) {
        const pageCount = pdf.numPages;
        const currentCount = pages.length;
        if (
          !(pageCount > 0 && currentCount === pageCount) &&
          !(cursor > currentCount)
        ) {
          const startPage = currentCount + 1; // PDF page numbering starts at 1
          const endPage = Math.min(currentCount + BATCH_COUNT, pageCount);
          setCursor(endPage);
          getPages(pdf, startPage, endPage).then(pagesReturn => {
            setPages(pagesTmp => [...pagesTmp, ...pagesReturn]);
            const viewport = pagesReturn[0].getViewport(3);
            setBaseSizePage({ width: viewport.width, height: viewport.height });
            setLoading(false);
            return pages;
          });
          pdf.getPage(1).then(page => {
            const viewport = page.getViewport(3);
            setBaseSizePage({ width: viewport.width, height: viewport.height });
          });
        }
      }
    },
    [pdf, next],
  );

  const getPages = (pdfTmp, first, last) => {
    const allPages = range(first, last + 1).map(number =>
      pdfTmp.getPage(number),
    );
    return Promise.all(allPages);
  };

  const increase = useCallback(() => {
    requestAnimationFrame(() => {
      setScale(scaleTmp => clampZoom(scaleTmp + 0.05));
    });
  });

  const reduce = useCallback(() => {
    requestAnimationFrame(() => {
      setScale(scaleTmp => clampZoom(scaleTmp - 0.05));
    });
  });

  return {
    pages,
    reduce,
    increase,
    loading,
    baseSizePage,
    error,
    setNext,
    next,
    scale,
    onWheel,
  };
};

export default usePdf;
