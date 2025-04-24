/**
 *
 * ContainerAddEditQuestion
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rgba } from 'polished';
import { MdImage, MdDelete } from 'react-icons/md/index.esm';

/* components */
import { TextEditor } from 'components/TextEditor';
import TooltipForm from 'components/TooltipForm';
import Form from 'components/Form';

/* Hooks */
import useForm from 'hooks/useForm';

/* Services */
import {
  createQuestion,
  getQuestionById,
  updateQuestion,
} from 'services/QuestionService';
import { hostUrlBase } from 'services/Api';
// import { deleteAlternativeById } from 'services/AlternativesService';

/* components */
import Check from './Check';
import Radio from './Radio';

const Container = styled.div`
  width: 600px;
`;

const Header = styled.div`
  height: 46px;
  width: 100%;
  display: flex;
  align-items: center;
`;

const Body = styled.div`
  min-height: 40px;
  width: 100%;
  background: ${({ theme }) => theme.colors.base};
  padding: 26px;
`;

const ButtonAccept = styled.button`
  min-height: 36px;
  background: #3ce35f;
  outline: none;
  cursor: pointer;
  border-radius: 20px;
  padding: 0 16px;
  transition: transform 0.2s;
  display: inline-block;
  color: ${({ theme }) => theme.colors.base};
  &:focus {
    box-shadow: 0 0px 10px ${rgba('#3ce35f', 0.65)};
    transform: scale(1.01);
  }
`;

const ButtonCancel = styled.a`
  min-height: 36px;
  background: ${({ theme }) => theme.colors.base};
  outline: none;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  cursor: pointer;
  margin-right: 10px;
`;

const Footer = styled.div`
  height: 50px;
  padding: 0 26px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Description = styled.div`
  color: ${({ theme }) => rgba(theme.colors.text, 0.3)};
  padding: 0 26px;
`;

const WrapperAddAlternative = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const BtnAddImage = styled.div`
  outline: none;
  cursor: pointer;
  padding: 6px 9px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  line-height: 20px;
  font-size: 18px;
  align-items: center;
  color: ${({ theme }) => rgba(theme.colors.text, 0.4)};
  font-weight: 500;

  &:hover {
    background: ${({ theme }) => rgba(theme.colors.text, 0.05)};
  }

  &:focus {
    background: ${({ theme }) => rgba(theme.colors.text, 0.05)};
  }
`;

const BtnAddImageAlt = styled.a`
  outline: none;
  cursor: pointer;
  padding: 6px 9px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  margin: 4px;
  line-height: 20px;
  font-size: 18px;
  align-items: center;
  color: ${({ theme }) => rgba(theme.colors.text, 0.3)};
  font-weight: 500;

  &:hover {
    background: ${({ theme }) => rgba(theme.colors.text, 0.05)};
  }
  &:focus {
    background: ${({ theme }) => rgba(theme.colors.text, 0.05)};
  }
`;

const ContainerAddImage = styled.div`
  margin-left: 20px;
  user-select: none;
`;

const TextBtnAddImage = styled.p`
  margin: 0;
  color: ${({ theme }) => rgba(theme.colors.text, 0.5)};
  text-align: center;
  font-size: 10px;
`;

const Message = styled.p`
  margin: auto;
  color: ${({ theme }) => rgba(theme.colors.text, 0.5)};
  text-align: center;
  font-size: 12px;
  margin-bottom: 20px;
  user-select: none;
`;

const GroupRadio = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 62px;
  padding: 0 15px;
  margin-bottom: 15px;
`;

const isInputEditorEmpty = value => !value || value === '<p></p>';

/* components */

/* hooks */

/* tabs data */

const validate = values => {
  const errors = {};

  if (isInputEditorEmpty(values.contenido)) {
    errors.contenido = 'You need to enter the question';
    return errors;
  }

  if (isInputEditorEmpty(values.op1) || isInputEditorEmpty(values.op2)) {
    errors.alternativas = 'Option 1 and 2 must be filled';
    return errors;
  }

  if (!values.nivel) {
    errors.nivel = 'Select the question level';
    return errors;
  }

  if (isInputEditorEmpty(values.op3) && values.opc3) {
    errors.op3 = 'This option cannot be empty';
    return errors;
  }
  if (isInputEditorEmpty(values.op4) && values.opc4) {
    errors.op4 = 'This option cannot be empty';
    return errors;
  }
  if (isInputEditorEmpty(values.op5) && values.opc5) {
    errors.op5 = 'This option cannot be empty';
    return errors;
  }

  if (
    !values.opc1 &&
    !values.opc2 &&
    !values.opc3 &&
    !values.opc4 &&
    !values.opc5
  ) {
    errors.correcta = 'Choose one or more correct answers';
    return errors;
  }

  return errors;
};

const initialValues = {
  nivel: 1,
  alternativas: [],
  contenido: '<p></p>',
  op1: '<p></p>',
  op2: '<p></p>',
  op3: '<p></p>',
  op4: '<p></p>',
  op5: '<p></p>',
};

const Input = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;

  & + label {
    width: 100%;
    font-size: 13px;
    cursor: pointer;
    display: flex;
    color: ${({ theme }) => rgba(theme.colors.text, 0.38)};
    overflow: hidden;
    flex-direction: column;
    align-items: center;
  }

  & + label svg {
    vertical-align: middle;
    margin: 0 auto;
  }

  & + label span {
    width: 100%;
    min-height: 11px;
    display: -block;
    font-size: 11px;
    text-overflow: ellipsis;
    transition: all 0.2s ease;
    color: ${({ theme }) => rgba(theme.colors.text, 0.58)};
    white-space: nowrap;
    text-align: center;
    overflow: hidden;
    vertical-align: top;
    margin-top: 10px;
  }
`;

const ContSec = styled.div`
  width: 36px;
  margin: 4px;
  align-items: center;
  justify-content: center;
  height: ${({ hasValue }) => (hasValue ? '100%' : '0px')};
  overflow: hidden;
  display: ${({ hasValue }) => (hasValue ? 'flex' : 'none')};
`;

const Img = styled.img`
    max-width: 100%;
    max-height: 30px;

`;

function BoxImage({ onChange, name, value = null }) {
  const hasValue = !!value;

  const getImage = () => {
    if (value) {
      if (typeof value === 'string' || value instanceof String) {
        return `${hostUrlBase}/${value}`;
      }
      return URL.createObjectURL(value[0]);
    }

    return null;
  };

  return (
    <div>
      <Input
        type="file"
        name={name}
        id={name}
        tabIndex="-1"
        onChange={onChange}

      />
      <label htmlFor={name}>
        <ContSec hasValue={!hasValue}>
          <BtnAddImage tabIndex="-1">
            <MdImage />
          </BtnAddImage>
        </ContSec>
        <ContSec hasValue={hasValue}>
          <Img src={getImage()} alt="" />
        </ContSec>
      </label>
    </div>
  );
}

function ContainerAddEditQuestion({ id, onSave, onClose, idArea }) {
  const {
    values,
    handleChange,
    handleChangeFiles,
    handleSubmit,
    errors,
    setValues,
  } = useForm(createOrUpdate, validate);

  async function createOrUpdate() {
    function isString(value) {
      return typeof value === 'string' || value instanceof String;
    }

    const bodyFormData = new FormData();

    const pregunta = {
      id: values.id || 0,
      contenido: values.contenido,
      nivel: values.nivel,
      idAreaConocimiento: idArea,
      alternativas: [
        {
          id: values.id1 || 0,
          contenido: values.op1,
          correcta: !!values.opc1,
          numeroAlternativa: 1,
          tieneImagen: !!values.imgOpc1 && !isString(values.imgOpc1),
        },
        {
          id: values.id2 || 0,
          contenido: values.op2,
          correcta: !!values.opc2,
          numeroAlternativa: 2,
          tieneImagen: !!values.imgOpc2 && !isString(values.imgOpc2),
        },
      ],
    };

    if (values.imgOpc1) {
      bodyFormData.append('imagenesAlternativas', values.imgOpc1[0]);
    }

    if (values.imgOpc2) {
      bodyFormData.append('imagenesAlternativas', values.imgOpc2[0]);
    }

    if (!isInputEditorEmpty(values.op3) || (values.id3 !== 0 && values.id3)) {
      pregunta.alternativas.push({
        id: values.id3 || 0,
        contenido:
          values.id3 && isInputEditorEmpty(values.op3) ? '' : values.op3,
        correcta: !!values.opc3,
        numeroAlternativa: 3,
        tieneImagen: !!values.imgOpc3 && !isString(values.imgOpc3),
      });
      if (values.imgOpc3) {
        bodyFormData.append('imagenesAlternativas', values.imgOpc3[0]);
      }
    }
    if (!isInputEditorEmpty(values.op4) || (values.id4 !== 0 && values.id4)) {
      pregunta.alternativas.push({
        id: values.id4 || 0,
        contenido:
          values.id4 && isInputEditorEmpty(values.op4) ? '' : values.op4,
        correcta: !!values.opc4,
        numeroAlternativa: 4,
        tieneImagen: !!values.imgOpc4 && !isString(values.imgOpc4),
      });
      if (values.imgOpc4) {
        bodyFormData.append('imagenesAlternativas', values.imgOpc4[0]);
      }
    }

    if (!isInputEditorEmpty(values.op5) || (values.id5 !== 0 && values.id5)) {
      pregunta.alternativas.push({
        id: values.id5 || 0,
        contenido:
          values.id5 && isInputEditorEmpty(values.op5) ? '' : values.op5,
        correcta: !!values.opc5,
        tieneImagen: !!values.imgOpc5 && !isString(values.imgOpc5),
      });

      if (values.imgOpc5) {
        bodyFormData.append('imagenesAlternativas', values.imgOpc5[0]);
      }
    }

    bodyFormData.set('questionJSON', JSON.stringify(pregunta));
    bodyFormData.set(
      'imagenPregunta',
      values.imageQuestion && values.imageQuestion[0],
    );

    if (!id) {
      await createQuestion(bodyFormData);
    } else {
      await updateQuestion(id, bodyFormData);
    }
    onSave();
  }

  const getQuestion = async () => {
    if (id) {
      const response = await getQuestionById(id);
      const { data } = response.data;
      const pregunta = {
        id: data.id,
        contenido: data.contenido,
        nivel: data.nivel,
        idAreaConocimiento: data.idAreaConocimiento,
        imageQuestion: data.urlImagen,
      };

      data.alternativas.forEach((alternativa, index) => {
        pregunta[`id${index + 1}`] = alternativa.id;
        pregunta[`op${index + 1}`] = alternativa.contenido;
        pregunta[`opc${index + 1}`] = alternativa.correcta;
        pregunta[`imgOpc${index + 1}`] = alternativa.urlImagen;
      });

      for (let i = data.alternativas.length + 1; i <= 5; i += 1) {
        pregunta[`id${i}`] = 0;
        pregunta[`op${i}`] = '<p></p>';
        pregunta[`opc${i}`] = false;
      }

      // console.log(pregunta);

      setValues(pregunta);
    } else {
      setValues(initialValues);
    }
  };

  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <Form style={{ textAlign: 'left' }} onSubmit={handleSubmit}>
      <Container>
        <Header>
          <Description>{id ? 'Edit Question' : 'New Question'}</Description>
        </Header>
        <Body>
          <WrapperAddAlternative>
            <TooltipForm
              visible={errors.contenido}
              color="#F14D76"
              tip={errors.contenido || ''}
            >
              <TextEditor
                placeholder="Type your question here"
                value={values.contenido}
                onChange={handleChange}
                name="contenido"
              />
            </TooltipForm>
            <ContainerAddImage>
              <BoxImage
                name="imageQuestion"
                onChange={handleChangeFiles}
                value={values.imageQuestion}
              />
              <TextBtnAddImage>Image</TextBtnAddImage>
            </ContainerAddImage>
          </WrapperAddAlternative>

          <GroupRadio>
            <Radio
              name="nivel"
              onChange={handleChange}
              label="Basic"
              color="#3ce35f"
              value="1"
              checked={values.nivel == '1'}
            />
            <Radio
              name="nivel"
              onChange={handleChange}
              label="Intermediate"
              color="#F19A4D"
              value="2"
              checked={values.nivel == '2'}
            />
            <Radio
              name="nivel"
              onChange={handleChange}
              label="Advanced"
              color="#F14D76"
              value="3"
              checked={values.nivel == '3'}
            />
          </GroupRadio>
          <Message>Enter the answer options below</Message>
          <div>
            <WrapperAddAlternative>
              <TooltipForm
                width="24px"
                margin="0 10px 0 0"
                color="#F14D76"
                visible={errors.correcta}
                tip={errors.correcta || ''}
              >
                <Check
                  onChange={handleChange}
                  name="opc1"
                  checked={values.opc1}
                />
              </TooltipForm>
              <TooltipForm
                color="#F14D76"
                tip={errors.alternativas}
                visible={errors.alternativas || ''}
              >
                <TextEditor
                  style={{ minHeight: 41, fontSize: 13 }}
                  placeholder="Option 1"
                  onChange={handleChange}
                  value={values.op1}
                  name="op1"
                />
              </TooltipForm>
              <ContainerAddImage>
                <BoxImage
                  name="imgOpc1"
                  onChange={handleChangeFiles}
                  value={values.imgOpc1}
                />
              </ContainerAddImage>
            </WrapperAddAlternative>
            <WrapperAddAlternative>
              <Check
                onChange={handleChange}
                name="opc2"
                checked={values.opc2}
              />

              <TextEditor
                style={{ minHeight: 41, fontSize: 13 }}
                placeholder="Option 2"
                onChange={handleChange}
                name="op2"
                value={values.op2}
              />
              <ContainerAddImage>
                <BoxImage
                  name="imgOpc2"
                  onChange={handleChangeFiles}
                  value={values.imgOpc2}
                />
              </ContainerAddImage>
            </WrapperAddAlternative>
            <WrapperAddAlternative>
              <Check
                onChange={handleChange}
                name="opc3"
                checked={values.opc3}
              />
              <TooltipForm
                color="#F14D76"
                tip={errors.op3 || ''}
                visible={errors.op3}
              >
                <TextEditor
                  style={{ minHeight: 41, fontSize: 13 }}
                  placeholder="Option 3"
                  value={values.op3}
                  onChange={handleChange}
                  name="op3"
                />
              </TooltipForm>
              <ContainerAddImage>
                <BoxImage
                  name="imgOpc3"
                  onChange={handleChangeFiles}
                  value={values.imgOpc3}
                />
              </ContainerAddImage>
            </WrapperAddAlternative>
            <WrapperAddAlternative>
              <Check
                onChange={handleChange}
                name="opc4"
                checked={values.opc4}
              />
              <TooltipForm
                color="#F14D76"
                tip={errors.op4 || ''}
                visible={errors.op4}
              >
                <TextEditor
                  style={{ minHeight: 41, fontSize: 13 }}
                  placeholder="Option 4"
                  onChange={handleChange}
                  name="op4"
                  value={values.op4}
                />
              </TooltipForm>
              <ContainerAddImage>
                <BoxImage
                  name="imgOpc4"
                  onChange={handleChangeFiles}
                  value={values.imgOpc4}
                />
              </ContainerAddImage>
            </WrapperAddAlternative>
            <WrapperAddAlternative>
              <Check
                onChange={handleChange}
                name="opc5"
                checked={values.opc5}
              />
              <TooltipForm
                color="#F14D76"
                tip={errors.op5 || ''}
                visible={errors.op5}
              >
                <TextEditor
                  style={{ minHeight: 41, fontSize: 13 }}
                  placeholder="Option 5"
                  onChange={handleChange}
                  value={values.op5}
                  name="op5"
                />
              </TooltipForm>
              <ContainerAddImage>
                <BoxImage
                  name="imgOpc5"
                  onChange={handleChangeFiles}
                  value={values.imgOpc5}
                />
              </ContainerAddImage>
            </WrapperAddAlternative>
          </div>
        </Body>
        <Footer>
          <ButtonCancel onClick={onClose} tabIndex="-1">
            Cancel
          </ButtonCancel>
          <ButtonAccept>Save</ButtonAccept>
        </Footer>
      </Container>
    </Form>
  );
}

ContainerAddEditQuestion.propTypes = {
  id: PropTypes.any,
  onSave: PropTypes.func,
  onClose: PropTypes.func,
};

export default ContainerAddEditQuestion;
