import styled from 'styled-components';

const QuestionContainer = styled.div`
  color: #000;
`;

const QuestionName = styled.div`
  font-size: 25px;
  font-weight: 600;
  p {
    margin: 0;
  }
`;

const Image = styled.img`
  max-width: 500px;
  margin-top: 12px;
  margin-left: 60px;
`;

const Numeration = styled.div`
  font-size: 20px;
  margin-top: 5px;
  font-weight: 500;
  flex-shrink: 0;
  width: 60px;
`;

const Bar = styled.div`
  width: ${({ width = '100%' }) => width};
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: #cccccc;
  border-radius: 5px;
  opacity: 0.3;
  background: linear-gradient(to right, #ddd 8%, #cccccc 18%, #ddd 33%);
  background-size: 800px 104px;
  height: 40px;
  position: relative;
  margin-bottom: 10px;
  @keyframes placeHolderShimmer {
    0% {
      background-position: -468px 0;
    }
    100% {
      background-position: 468px 0;
    }
  }
`;

export { QuestionName, Numeration, QuestionContainer, Bar, Image };
