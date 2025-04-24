/**
 *
 * DropDownButton
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

/* components */
import Button from 'components/Button';
import ClickOutside from 'react-click-outside';
import { IoIosArrowDown } from 'react-icons/io/index.esm';

/* utils */
import { rgba } from 'polished';

function* range(start, end, step) {
  while (start < end) {
    yield start;
    start += step;
  }
}

const getFormattedNumber = n => (n <= 9 ? `0${n}` : n);

const capitalize = s => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const Arrow = styled.div`
  display: inline-block;
  margin-left: 5px;
  color: ${({ theme }) => rgba(theme.colors.text, 0.9)};
`;

const Container = styled.div`
  position: static;
  display: inline-block;
`;

const ContainerInner = styled.div``;

const ContainerDrop = styled.div`
  position: absolute;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #dedede;
  background: ${({ theme }) => theme.colors.base};
  min-width: 120px;
  z-index: 100000;
  overflow: hidden;
  padding: 16px 0;
  border-radius: 5px;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const ContainerDropInner = styled.div`
  width: 100%;
  max-height: ${({ heightList }) => `${heightList}px`};
  position: relative;
  overflow: auto;
`;

const Item = styled.div`
  color: ${({ theme }) => rgba(theme.colors.text, 0.9)};
  height: 24px;
  padding: 0px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 13px;
  width: 100%;
  &:hover {
    background: ${({ theme }) => rgba(theme.colors.text, 0.05)};
  }
`;

const Title = styled.div`
  padding: 10px 16px;
  color: ${({ theme }) => rgba(theme.colors.text, 0.4)};
  font-weight: 500;
  font-size: 11px;
`;

const ButtonStyled = styled(Button)`
  color: ${({ theme }) => rgba(theme.colors.text, 0.9)};
  background: ${({ theme }) => theme.colors.base};
  height: 30px;
  border: 1px solid rgba(4, 17, 38, 0.2);
  font-size: 14px;
  border-radius: 5px;
  padding: 3px;
  margin-right: 10px;
  &:hover {
    background: ${({ theme }) => theme.colors.base};
  }

  svg {
    font-size: 16px !important;
  }
`;

function DropDownButton({
  mode,
  name,
  text,
  items = [],
  numberList,
  title,
  value,
  canRestrictionChange = false,
  onChange = () => { },
  ...props
}) {
  let list;
  let heightList = 'auto';
  let firstItem = text;
  const nameAbbr = `${capitalize(name).substring(0, 3)}.`;
  if (mode === 'list-number-generated') {
    if (numberList !== 0) {
      list = Array.from(range(0, numberList + 1, 1));
      heightList = 24 * 7;
      firstItem = list
        ? `${getFormattedNumber(list[list.length - 1])} ${nameAbbr}`
        : text;
    } else {
      list = [0];
      firstItem = list ? `${getFormattedNumber(0)} ${nameAbbr}` : text;
    }
  }

  if (mode === 'list-numbers') {
    list = Array.from(range(1, numberList + 1, 1));
    heightList = 24 * 7;
    firstItem = list ? `${getFormattedNumber(list[list.length - 1])} ` : text;
  }

  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState(firstItem);

  useEffect(
    () => {
      if (value || value === 0) {
        if (mode === 'list-number-generated') {
          setSelected(`${getFormattedNumber(value)} ${nameAbbr}`);
        }
        if (mode === 'list-numbers') {
          setSelected(`${getFormattedNumber(value)} `);
        }
      }
    },
    [value],
  );

  const handleClick = () => {
    // if (!isOpen) {
    //   document.body.style.overflowY = 'scroll';
    // } else {
    //   document.body.style.overflowY = 'inherit';
    // }

    setOpen(!isOpen);
  };

  const handleChangeItem = async valueItem => {
    const canChange = await onChange(name, valueItem);

    if (mode === 'list-number-generated') {
      if (canRestrictionChange && canChange)
        setSelected(`${getFormattedNumber(valueItem)} ${nameAbbr}`);
    }

    if (mode === 'list-numbers') {
      if (canRestrictionChange && canChange)
        setSelected(getFormattedNumber(valueItem));
    }
    if (canRestrictionChange && canChange) setOpen(!isOpen);
  };

  return (
    <Container {...props}>
      <ClickOutside onClickOutside={() => setOpen(false)}>
        <ContainerInner>
          <ButtonStyled className="button" onClick={handleClick}>
            {list && selected}
            <Arrow>
              <IoIosArrowDown />
            </Arrow>
          </ButtonStyled>
          <ContainerDrop isOpen={isOpen}>
            <ContainerDropInner heightList={heightList}>
              {list &&
                list.map(n => (
                  <Item key={n} onClick={() => handleChangeItem(n)}>
                    {getFormattedNumber(n)}
                  </Item>
                ))}
              {title && <Title>{title}</Title>}
              {items &&
                items.map(n => (
                  <Item
                    style={{ height: 35 }}
                    key={n.key}
                    onClick={() => handleChangeItem(n)}
                  >
                    {n.value}
                  </Item>
                ))}
            </ContainerDropInner>
          </ContainerDrop>
        </ContainerInner>
      </ClickOutside>
    </Container>
  );
}

DropDownButton.propTypes = {
  numberList: PropTypes.any,
  text: PropTypes.string,
  onChange: PropTypes.func,
  mode: PropTypes.string,
  items: PropTypes.array,
  title: PropTypes.string,
  name: PropTypes.string,
};

export default withTheme(DropDownButton);
