import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { hostUrlBase } from 'services/Api';
import { QuestionName, Numeration, QuestionContainer, Image } from './Styles';
// import Loader from './Loader';

function QuestionItem({ title, index = 0, urlImagen }) {
  // const [isMount, setMount] = useState(false);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setMount(true);
  //   }, 1500);
  // }, []);
  return (
    <QuestionContainer>
      <div style={{ display: 'flex' }}>
        <Numeration>{index + 1} .-</Numeration>
        <QuestionName>{parse(title)}</QuestionName>
      </div>
      <div>
        {urlImagen && <Image src={`${hostUrlBase}/${urlImagen}`} alt={title} />}
      </div>
    </QuestionContainer>
  );
}

QuestionItem.propTypes = {
  title: PropTypes.string,
  index: PropTypes.number,
  urlImagen: PropTypes.string,
};

export default QuestionItem;
