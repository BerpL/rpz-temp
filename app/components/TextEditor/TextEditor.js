/**
 *
 * TextEditor
 *
 */

import React, { useState, Fragment, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { Editor } from 'slate-react';

import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
} from 'react-icons/md/index.esm';

import { isKeyHotkey } from 'is-hotkey';

import Html from 'slate-html-serializer';
import { rgba } from 'polished';
import BoldMark from './BoldMark';
import ItalicMark from './ItalicMark';
import UnderlineMark from './UnderlineMark';
import FormatToolbar from './FormatToolbar';
import Button from './Button';
import rules from './Rules';
import Container from './Container';

const StyledEditor = styled(Editor)`
  width: 100%;
  font-size: 16px;
  overflow: auto;
  border: 1px solid #ededed;
  min-height: 46px;
  border-radius: 5px;
  color: ${({ theme }) => rgba(theme.colors.text, 0.6)};
  box-shadow: ${({ isFocus }) =>
    isFocus
      ? '0 0 5px rgba(0,0,0,0.1), 0 6px 8px rgba(0,0,0,0.1)'
      : '0 0 0 0 transparent'};
  transform: ${({ isFocus }) => (isFocus ? 'scale(1.01)' : 'scale(1)')};
  transition: transform 0.2s, box-shadow 0.3s;
  vertical-align: middle;
  opacity: 1;
  padding: 12px 15px;

  span {
    opacity: 1 !important;
  }
`;

const html = new Html({ rules });

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');

const TextEditor = ({
  style,
  onChange,
  name,
  value: _initialValue,
  placeholder = '',
}) => {
  const [value, setValue] = useState(html.deserialize(''));
  const [isFocus, setFocus] = useState();
  const [currentPlaceholder, setPlaceholder] = useState(placeholder); 
  const [isMount, setIsMount] = useState(false);
  const editor = useRef(null);
  
  useEffect(
    () => {
      //
      if (_initialValue && !isMount) {
        setValue(html.deserialize(_initialValue));
        setIsMount(true);
      }
    },
    [_initialValue],
  );

  const handleChange = ({ value: _value }) => {
    //setValue(_value);

    // console.log(value.data);
    if (value.document !== _value.document) {
      let dataSerialize = '';

      try {
        dataSerialize = html.serialize(_value);
      } catch (ex) {
        // console.log(ex);
      } finally {
        const e = {
          target: {
            name,
            value: dataSerialize,
          },
        };
        onChange(e);
      }
    }
    setValue(_value);
  };

  // const hasBlock = type => value.blocks.some(node => node.type === type);
  const hasMark = type => value.activeMarks.some(mark => mark.type === type);

  const onKeyDown = (e, _editor, next) => {
    let mark;

    if (isBoldHotkey(e)) {
      mark = 'bold';
    } else if (isItalicHotkey(e)) {
      mark = 'italic';
    } else if (isUnderlinedHotkey(e)) {
      mark = 'underlined';
    } else {
      return next();
    }

    e.preventDefault();
    _editor.toggleMark(mark);
  };

  const onClickMark = (e, type) => {
    e.preventDefault();
    editor.current.toggleMark(type);
  };

  const renderMark = (props, _editor, next) => {
    switch (props.mark.type) {
      case 'bold':
        return <BoldMark {...props} />;
      case 'italic':
        return <ItalicMark {...props} />;
      case 'underline':
        return <UnderlineMark {...props} />;
      default:
        return next();
    }
  };

  const renderBlock = (props, _editor, next) => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>;
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>;
      case 'list-item':
        return <li {...attributes}>{children}</li>;
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>;
      case 'image': {
        const src = node.data.get('src');
        return <img src={src} alt="" />;
      }
      default:
        return next();
    }
  };

  const renderMarkButton = (type, Icon) => {
    const isActive = hasMark(type);

    return (
      <Button active={isActive} onMouseDown={event => onClickMark(event, type)}>
        <Icon />
      </Button>
    );
  };

  return (
    <Fragment>
      <Container>
        {isFocus && (
          <FormatToolbar>
            {renderMarkButton('italic', MdFormatItalic)}
            {renderMarkButton('underline', MdFormatUnderlined)}
            {renderMarkButton('bold', MdFormatBold)}
          </FormatToolbar>
        )}
        <StyledEditor
          style={{ ...style }}
          ref={editor}
          isFocus={isFocus}
          value={value}
          onFocus={(e, editor, next) => {
            next();
            setTimeout(() => setFocus(true), 0)
          }}
          onBlur={(e, editor, next) => {
            next();
            setTimeout(() => setFocus(false), 0)
          }}
          //placeholder={placeholder}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          renderMark={renderMark}
          renderBlock={renderBlock}
        />
      </Container>
    </Fragment>
  );
};

TextEditor.propTypes = {
  style: PropTypes.object,
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  theme: PropTypes.object,
};

export default withTheme(TextEditor);

