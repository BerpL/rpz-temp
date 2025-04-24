import styled from 'styled-components';
import { rgba } from 'polished';

const RadioButtonLabel = styled.label`
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  cursor: pointer;
  left: 0;
  top: 2px;
  border: 2px solid ${({ theme }) => rgba(theme.colors.text, 0.8)};
`;
export default RadioButtonLabel;
