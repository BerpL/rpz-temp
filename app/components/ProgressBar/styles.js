import styled from 'styled-components';

export const Container = styled.div`
 width: 100%;
 margin-bottom: 10px;
  .progress-bar{
    background: lightgray;
    width: 100%;
    height: 20px;
    overflow: hidden;
    border-radius: 4px;
    position: relative;

    .bar-progress{
      transition: all .3s;
      height: 100%;
      background: #74e046;
    }

    .text-progress{
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      border-radius: 4px;
      font-size: 14px;
      z-index: 3;
      color: gray;
      text-align: center;
    }


  }
  .text-help {
      color: gray;
      font-size: 12px;
      margin-top: 0px;
    }
`;
