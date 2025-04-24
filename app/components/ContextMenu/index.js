/**
 *
 * ContextMenu
 *
 */
import {
  ContextMenu as Cm,
  MenuItem,
  ContextMenuTrigger,
} from 'react-contextmenu';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rgba } from 'polished';

const ContextMenu = styled(Cm)`
  background: ${({ theme: { base } }) => base};
  border-radius: 5px;
  overflow: hidden;
  padding: 10px 0;
  transition: max-height 1s, opacity 0.2s;
  box-shadow: 0 2px 2px 0px rgba(0, 0, 0, 0.16);
  max-height: ${({ open }) => (open ? '1000px' : '0px')};
  opacity: ${({ open }) => (open ? 1 : 0)} !important;
  position: absolute !important;
  border: 1px solid #cbcaca;

  div {
    cursor: pointer;
    padding: 10px 26px;
    outline: none;
    font-size: 13px;
    display: flex;
    align-items: center;
    color: ${({ theme: { text } }) => text};

    &:hover {
      background: ${({ theme: { primary } }) => rgba(primary, 0.05)};
    }

    > svg {
      margin-right: 10px;
      flex: 0 0 15px;
      font-size: 15px;
      fill: none;
    }
  }
`;

export { ContextMenu, MenuItem, ContextMenuTrigger };
