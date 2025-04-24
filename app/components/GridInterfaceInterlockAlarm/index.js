/**
 *
 * GridInterfaceInterlockAlarm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ButtonAdmin from 'components/ButtonAdmin';
import TreeAdminContextMenu from 'components/TreeAdminContextMenu';

const C1 = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const C2 = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
`;

const S1 = styled.div`
  flex-grow: 1;
  display: flex;
  position: relative;
  padding: ${({ noPadding }) => noPadding || '0px 26px'};
  flex-direction: ${({ direction }) => direction || 'row'};
  /* for Firefox */
  min-height: 0;
`;

const Co02 = styled.div`
  overflow: auto;
  flex-shrink: 1;
  flex-grow: 1;
  padding: ${({ noPadding }) => noPadding || '0px 16px'};
  /* for Firefox */
  min-height: 0;
  flex-wrap: wrap;
  position: relative;
  display: flex;
`;

const AOI = styled.div`
  flex: 1;
  overflow: hidden;
  background: ${({ theme: { base } }) => base};
  padding: 10px 16px;
`;

const AOC = styled.div`
  flex-shrink: 0;
  flex-grow: 2;
  display: flex;
  max-width: 251px;
  padding: 5px;
`;

const I01 = styled.div`
  background: url(${({ src }) => src}) no-repeat center center;
  flex: 1;
  height: 180px;
  background-size: cover;
`;

const T01 = styled.div`
  color: ${({ theme: { text } }) => text});
  font-size: 13px;
  margin-top: 20px;
`;

function GridInterfaceInterlockAlarm({ interfaces }) {
  return (
    <C1>
      <C2>
        <S1 direction="column" noPadding>
          <div style={{ padding: '0px 16px 15px' }}>
            <ButtonAdmin sm>New Interface</ButtonAdmin>
          </div>
          <Co02>
            {interfaces.map(i => (
              <AOC key={i.id}>
                <TreeAdminContextMenu
                  id={i.id}
                  selector="menu_interlock_alarm_interface"
                >
                  <AOI>
                    <I01 src={i.imagePath} />
                    <T01>{i.name}</T01>
                  </AOI>
                </TreeAdminContextMenu>
              </AOC>
            ))}
          </Co02>
        </S1>
      </C2>
    </C1>
  );
}

GridInterfaceInterlockAlarm.propTypes = {
  interfaces: PropTypes.array.isRequired,
};

export default GridInterfaceInterlockAlarm;
