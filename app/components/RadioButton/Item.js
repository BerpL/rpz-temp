import styled from 'styled-components';
import { rgba } from 'polished';

const Item = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
  font-size: 13px;
  color: ${({ theme }) => rgba(theme.colors.text, 0.8)};
`;

export default Item;
