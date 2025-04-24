import styled from 'styled-components';
import Btn from 'components/Button';
import { darken, rgba } from 'polished';

const EvaluationName = styled.div`
  font-size: 20px;
  font-weight: 600;
  opacity: 0.5;
  margin-bottom: 10px;
`;

const NextContainer = styled.div`
  margin-top: 10px;
  align-items: center;
  display: flex;
`;

const Image = styled.img`
  max-height: 100px;
  margin-left: 46px;
  margin-top: 8px;
`;

const Button = styled(Btn)`
  background: ${({ theme }) => theme.colors.darkPrimary};
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 80px;
  transition: background 0.3s;
  font-size: 20px;
  padding: 5px;
  &:hover {
    background: ${({ theme }) => darken('0.05', theme.colors.darkPrimary)};
  }
  svg {
    margin-left: 10px;
    margin-top: 2px;
    margin-right: 0;
    font-size: 20px;
  }
`;

const AlternativeCount = styled.span`
  width: 25px;
  height: 25px;
  border: 1px solid
    ${({ theme, active }) => rgba(theme.colors.darkPrimary, active ? 1 : 0.7)};
  margin-right: 20px;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  background: ${({ theme, active }) =>
    active ? rgba(theme.colors.darkPrimary, 0.5) : 'transparent'};
  border-radius: 5px;
  position: absolute;
  left: 16px;
  &::before {
    content: 'Option ';
    opacity: 0;
    display: none;
  }
`;

const AlternativeContent = styled.div`
  font-size: 16px;
  padding: 16px;
  position: relative;
  font-weight: 700;
  flex-direction: column;
  opacity: 0.8;
  width: calc(50% - 8px);
  align-self: flex-start;
  flex-shrink: 0;
  background: ${({ theme, active }) =>
    active ? rgba(theme.colors.darkPrimary, 0.3) : 'rgba(0,0,0,0.5)'};
  margin-right: 8px;
  margin-bottom: 8px;
  display: flex;
  cursor: pointer;
  user-select: none;
  border-radius: 5px;
  transition: all 0.1s;
  border: 1px solid
    ${({ theme, active }) => rgba(theme.colors.darkPrimary, active ? 1 : 0.7)};
  p {
    margin: 0;
  }
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.darkPrimary};
    background: ${({ theme }) => rgba(theme.colors.darkPrimary, 0.3)};
  }

  @media screen and (max-width: 800px) {
    min-width: 80%;
  }

  @media screen and (max-width: 500px) {
    min-width: 100%;
  }

  &:hover ${AlternativeCount} {
    border: 1px solid ${({ theme }) => theme.colors.darkPrimary};
    background: ${({ theme }) => rgba(theme.colors.darkPrimary, 0.5)};
    width: 77px;
    left: -36px;
  }
  &:hover ${AlternativeCount}::before {
    opacity: 1;
    display: unset;
  }
`;

const AlternativeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 60px;
  margin-top: 20px;
`;

const AlternativeText = styled.div`
  padding: 0 50px;
  width: 100%;
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
  opacity: 0.2;
  background: linear-gradient(to right, #ddd 8%, #cccccc 18%, #ddd 33%);
  background-size: 800px 104px;
  height: 30px;
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

const SpanText = styled.span`
  font-size: 12px;
  margin-left: 10px;
`;

export {
  EvaluationName,
  Image,
  NextContainer,
  AlternativeContent,
  AlternativeContainer,
  AlternativeCount,
  Bar,
  AlternativeText,
  SpanText,
  Button,
};
