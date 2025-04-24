import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { hostUrlBase } from 'services/Api';
import { MdCheck } from 'react-icons/md/index.esm';
import {
  AlternativeContent,
  AlternativeCount,
  Image,
  AlternativeText,
} from './Styles';

function AlternativeItem({
  alternative,
  index = 0,
  onChangeAlternative,
  typeQuestion,
  alternativeSelected,
  idQuestion,
}) {
  function handleChangeAlternative() {
    onChangeAlternative(alternative.idAlternativa, idQuestion, typeQuestion);
  }

  let active = false;
  const cursorDefault = 'default';

  if (typeQuestion === 1) {
    active = alternativeSelected === alternative.idAlternativa;
  }

  if (typeQuestion === 2 && alternativeSelected) {
    active =
      alternativeSelected[alternative.idAlternativa] ===
      alternative.idAlternativa;
  }

  // Convertir el índice a letra usando el código ASCII
  const getLetterFromIndex = (index) => String.fromCharCode(97 + index); // 97 es el código ASCII de 'a'

  return (
    <AlternativeContent
      active={active}
      style={{ cursor: active && cursorDefault }}
      onClick={handleChangeAlternative}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'flexStart',
        }}
      >
        <AlternativeCount active={active}>{getLetterFromIndex(index)}</AlternativeCount>
        <AlternativeText>{parse(alternative.contenido)}</AlternativeText>
        {active && <MdCheck />}
      </div>
      <div>
        {alternative.urlImagen && (
          <Image
            src={`${hostUrlBase}/${alternative.urlImagen}`}
            alt={alternative.contenido}
          />
        )}
      </div>
    </AlternativeContent>
  );
}

AlternativeItem.propTypes = {
  alternative: PropTypes.object,
  index: PropTypes.number,
  onChangeAlternative: PropTypes.func,
  alternativeSelected: PropTypes.any,
  idQuestion: PropTypes.any,
  typeQuestion: PropTypes.number,
};

export default AlternativeItem;
