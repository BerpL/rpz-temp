/**
 *
 * Paragraph
 *
 */

import styled from 'styled-components';

const Paragraph = styled.p`
  font-size: 13px;
  color: ${({ theme: { text } }) => text};
`;

export default Paragraph;
