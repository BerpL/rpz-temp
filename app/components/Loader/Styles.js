import styled from 'styled-components';

const LoaderAnim = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #49505799;
  top: 0;
  left: 0;
  z-index: 99;

  .loader-balance {
    position: absolute;
    z-index: 100;
  }

  .spiner-balance {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    animation: 1.5s linear infinite spinner;
    animation-play-state: inherit;
    border: solid 5px #cfd0d1;
    border-bottom-color: #1c87c9;
    content: '';
    transform: translate3d(-50%, -50%, 0);
    will-change: transform;
  }

  @keyframes spinner {
    0% {
      transform: translate3d(-50%, -50%, 0) rotate(0deg);
    }
    100% {
      transform: translate3d(-50%, -50%, 0) rotate(360deg);
    }
  }
`;

export { LoaderAnim };
