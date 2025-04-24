const validate = values => {
  const errors = {};

  if (!values.get('nombre')) {
    errors.nombre = 'El nombre es requerido';
  }

  if (!values.get('usuario')) {
    errors.usuario = 'El usuario es requerido';
  }

  if (!values.get('grupo')) {
    errors.grupo = 'El grupo es requerida';
  }

  if (!values.get('contrasenia')) {
    errors.contrasenia = 'La contraseña es requerida';
  }

  if (!values.get('contrasenia_confirmacion')) {
    errors.contrasenia_confirmacion =
      'La confirmación de contraseña  es requerida';
  }

  if (values.get('contrasenia_confirmacion') !== values.get('contrasenia')) {
    errors.contrasenia_confirmacion = 'Las contraseñas no coinciden';
  }

  return errors;
};

export default validate;
