import styled from 'styled-components';

const Container = styled.div`
  color: ${({ theme }) => theme.colors.base};
  width: 100%;
`;

const BeforeTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  opacity: 0.5;
  line-height: 25px;
  color: #000000;
`;

const Title = styled.div`
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 25px;
  line-height: 34px;
  color: #000000;
`;

const ListItem = styled.div`
  background: #fff;
  padding: 10px 16px;
  border: 1px solid #494949;
  border-radius: 5px;
  margin-bottom: 5px;
  display: flex;
`;

const ListItemName = styled.div`
  margin-bottom: 7px;
  font-size: 17px;
  color: #000000;
`;

const ListItemDate = styled.div`
  color: ${({ theme }) => theme.colors.textDark};
  font-size: 14px;
`;

const ListItemNumbersQuestions = styled.span`
  color: #9295A9;
  font-size: 14px;
`;

const ListItemLeft = styled.div`
  flex: 4;
  padding-right: 10px;
`;

const ListItemRight = styled.div`
  flex-basis: 52px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ListItemRatingLabel = styled.div`
  font-size: 12px;
  opacity: 0.5;
  text-align: right;
  color: #000000;
`;

const ListItemRatingText = styled.div`
  text-align: right;
  font-size: 20px;
  color:#000000;
`;

const ListItemRating = styled.div``;

export {
  Container,
  ListItemRating,
  ListItemRatingText,
  Title,
  ListItem,
  ListItemName,
  ListItemDate,
  ListItemLeft,
  ListItemRight,
  ListItemNumbersQuestions,
  BeforeTitle,
  ListItemRatingLabel,
};
