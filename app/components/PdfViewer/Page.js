import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Loader from 'react-loader-spinner';

const isPortrait = (width, height) => height > width;

const getPageSize = (baseSizePage, page, container) => {
  const viewport = page.getViewport(3);
  // const viewport = page.getViewport(3);

  const isPortraitPage = isPortrait(viewport.width, viewport.height);

  let widthPage = 0;
  let heightPage = 0;
  if (isPortrait(baseSizePage.width, baseSizePage.height) && isPortraitPage) {
    heightPage = container.current.offsetHeight;
    widthPage = heightPage * (baseSizePage.width / baseSizePage.height);
  }

  if (isPortrait(baseSizePage.width, baseSizePage.height) && !isPortraitPage) {
    widthPage =
      container.current.offsetHeight *
      (baseSizePage.width / baseSizePage.height) *
      1.2;
    heightPage = widthPage * (baseSizePage.width / baseSizePage.height);
  }

  if (!isPortrait(baseSizePage.width, baseSizePage.height) && !isPortraitPage) {
    widthPage =
      container.current.offsetWidth > 900
        ? 900
        : container.current.offsetWidth - 100;
    heightPage = widthPage * (baseSizePage.height / baseSizePage.width);
  }

  if (!isPortrait(baseSizePage.width, baseSizePage.height) && isPortraitPage) {
    heightPage = container.current.offsetHeight;
    widthPage = heightPage * (viewport.width / viewport.height);
  }

  return {
    width: widthPage,
    height: heightPage,
  };
};

const PDFPage = styled.div`
  margin: 1% auto 1% auto;
  overflow: visible;
  position: relative;
  background-color: white;
`;

const LoaderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000000;
`;

const Page = ({ page, scale, container, number, baseSizePage }) => {
  const [pageImg, setPageImg] = useState('');

  const [isMount, setIsMount] = useState(false);
  const [pageSize, setPageSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    drawPage();
    setIsMount(true);
    // return () => destroyPage();
  }, []);

  useEffect(
    () => {
      if (isMount) {
        reDrawPage();
      }
    },
    [scale, isMount],
  );

  function reDrawPage() {
    // isPortrait(baseSizePage.width, baseSizePage.height);

    const { width, height } = getPageSize(baseSizePage, page, container);

    setPageSize({
      height: height * scale,
      width: width * scale,
    });
  }

  function drawPage() {
    if (!page) return;

    const viewport = page.getViewport(3);

    const { width: widthPage, height: heightPage } = getPageSize(
      baseSizePage,
      page,
      container,
    );

    setPageSize({
      height: height * scale,
      width: width * scale,
    });

    const { width, height } = viewport;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    try {
      canvas.width = width;
      canvas.height = height;

      page
        .render({
          canvasContext: context,
          viewport,
        })
        .promise.then(() => setPageImg(canvas.toDataURL('image/jpeg')));
    } catch (error) {
      // console.log(error);
    }

    setPageSize({
      height: `${heightPage * scale}px`,
      width: `${widthPage * scale}px`,
    });
  }

  return (
    <PDFPage style={{ ...pageSize }}>
      {pageImg && <img src={pageImg} alt="" style={{ ...pageSize }} />}
      {!pageImg && (
        <LoaderContainer>
          <Loader type="ThreeDots" color="#000000" height={60} width={60} />
        </LoaderContainer>
      )}
    </PDFPage>
  );
};

Page.propTypes = {
  page: PropTypes.any,
  scale: PropTypes.number,
};

export default Page;
