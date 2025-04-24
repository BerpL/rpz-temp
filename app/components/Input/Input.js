import styled from 'styled-components';

const Input = styled.input`
  background: ${({ theme: { base } }) => base};
  outline: none;
  border: 1px solid rgba(41, 42, 58, 0.34);
  box-shadow: rgba(0, 0, 0, 0.08) 0;
  padding: 10px 16px;
  display: block;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 6px;
  font-size: 13px;
  color: ${({
  theme: {
    colors: { text },
  },
}) => text};
`;

export default Input;
