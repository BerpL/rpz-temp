import styled from 'styled-components';

const PanelsContainer = styled.div`
  display: flex;
  transform: translateX(${({ select }) => `${select * -100}%`});
  transition: transform 0.3s ease-in-out;
  height: 100%;
`;

const Panel = styled.div`
  position: absolute;
  top: 0;
  left: ${({ depth }) => `${depth * 100}%`};
  width: 100%;
  height: 100%;
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  height: 100%;
  overflow: auto;
  background-color: #17428B; /* Color base */
  color: #ecf0f1;
`;

const ButtonAlarmsAndInterlocks = styled.div`
  margin-bottom: 10px;
  color: #c60c30;
  border: 1px solid;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
`;

const PanelWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Group = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: #fff;
  text-decoration: none;
  transition: background-color 0.3s;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #009640;
  }

  svg {
    margin-right: 10px;
    min-width: 16px;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;

const GoBack = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  svg {
    margin-right: 5px;
  }
`;

const Item = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: #fff;
  text-decoration: none;
  transition: background-color 0.3s;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#009640' : 'transparent')};

  &:hover {
    background-color: #009640;
  }

  svg {
    margin-right: 10px;
    min-width: 16px;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;

const LabelItem = styled.span`
  margin-left: 0px;
`;

const Title = styled.div`
  padding: 20px;
  background-color: #009640;
  text-align: center;
  font-size: 1.2em;
  font-weight: bold;
`;

const BtnBack = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #ecf0f1;
  transition: color 0.3s;

  &:hover {
    color: #009640; /* Color para hover */
  }

  svg {
    margin-right: 5px;
  }
`;

export {
  PanelsContainer,
  Panel,
  Contents,
  BtnBack,
  Title,
  ButtonAlarmsAndInterlocks,
  PanelWrapper,
  Group,
  GoBack,
  Item,
  LabelItem,
};
