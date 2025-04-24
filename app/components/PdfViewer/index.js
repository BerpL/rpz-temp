/**
 *
 * PdfViewer
 *
 */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { MdAdd, MdRemove } from 'react-icons/md/index.esm';
import Loader from 'react-loader-spinner';

import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
// import LoadeGif from 'images/ajax-loader.gif';
import usePdf from 'hooks/usePdf';

import { lighten } from 'polished';
import Page from './Page';

const PdfViewerContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
`;

const InfiniteScrollContainer = styled(InfiniteScroll)`
  overflow: visible !important;
  transform-origin: left top;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const ActionButtons = styled.div`
  bottom: 20px;
  right: 20px;
  position: absolute;
  z-index: 1000;
  user-select: none;
`;

const PlusButton = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${({ theme: { base } }) => base};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.5);
  color: ${({ theme: { bgU } }) => bgU};
  margin-bottom: 10px;
`;

const MinusButton = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme: { base } }) => base};
  cursor: pointer;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.5);
  color: ${({ theme: { bgU } }) => bgU};
`;

const LoaderContainer = styled.div`
  position: absolute;
  top: 0;
  background: ${({ theme: { bgU } }) => lighten('0.25', bgU)};
  left: 0;
  bottom: 0;
  color: ${({ theme: { base } }) => base};
  right: 0;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoaderTransparentContainer = styled.div`
  position: absolute;
  top: 0;
  background: transparent;
  left: 0;
  bottom: 0;
  color: ${({ theme: { base } }) => base};
  right: 0;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function PdfViewer({ src, idPdf, loadingStyle = false }) {
  const pdfViewerRef = useRef(null);
  const {
    pages,
    next,
    setNext,
    loading,
    scale,
    increase,
    reduce,
    onWheel,
    baseSizePage,
  } = usePdf({
    src,
    container: pdfViewerRef,
  });

  const normalLoading = loading && !loadingStyle;
  const transparentLoading = loading && loadingStyle;

  return (
    <Wrapper>
      <PdfViewerContainer ref={pdfViewerRef} id={idPdf} onWheel={onWheel}>
        <InfiniteScrollContainer
          dataLength={pages.length}
          next={() => {
            setNext(next + 1);
          }}
          hasMore
          scrollableTarget={idPdf}
        >
          {pages.map((page, index) => (
            <Page
              baseSizePage={baseSizePage}
              key={page.pageIndex}
              container={pdfViewerRef}
              number={index}
              page={page}
              scale={scale}
            />
          ))}
        </InfiniteScrollContainer>
      </PdfViewerContainer>

      {!loading && (
        <ActionButtons>
          <PlusButton onClick={increase}>
            <MdAdd />
          </PlusButton>
          <MinusButton onClick={reduce}>
            <MdRemove />
          </MinusButton>
        </ActionButtons>
      )}
      {normalLoading && (
        <LoaderContainer>
          <Loader type="ThreeDots" color="#ffffff" height={60} width={60} />
        </LoaderContainer>
      )}

      {transparentLoading && (
        <LoaderTransparentContainer>
          <Loader type="ThreeDots" color="#ffffff" height={60} width={60} />
        </LoaderTransparentContainer>
      )}
    </Wrapper>
  );
}

PdfViewer.propTypes = {
  src: PropTypes.any,
  idPdf: PropTypes.string,
  loadingStyle: PropTypes.bool,
};

export default PdfViewer;
