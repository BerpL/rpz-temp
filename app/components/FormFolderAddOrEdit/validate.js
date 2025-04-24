const validate = values => {
  const errors = {};

  if (!values.get('nombre')) {
    errors.nombre = 'El nombre es requerido';
  }

  return errors;
};

export default validate;
