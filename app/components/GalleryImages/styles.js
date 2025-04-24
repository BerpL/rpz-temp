import styled from 'styled-components';

const Image = styled.img`
  background: #fff;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Title = styled.div`
  color: #fff;
  font-size: 24px;
  padding: 10px 16px;
  text-align: center;
`;

const Title2 = styled.div`
  color: rgb(0,39,118);
  font-size: 24px;
  padding: 10px 0;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

const ImageContainer = styled.div`
  flex: auto;
  width: 100px;
  cursor: pointer;
  margin: 30px;
  box-shadow: 0px 0px 20px 10px rgba(0, 39, 118, 0.3);

  ${Image} {
    width: 100%;
    height: 100%;
  }
`;

export { Image, ImageContainer, Container, Title, Title2 };
