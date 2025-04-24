import { useState, useEffect } from 'react';
import _ from 'lodash';

const useForm = (callback, validate, initialValues) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async event => {
    if (event) event.preventDefault();
    setIsSubmitting(true);
    setErrors(await validate(values));
  };

  useEffect(() => {
    if (initialValues) {
      setValues(initialValues);
    }
  }, []);
  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback();
      }
    },
    [errors],
  );

  const handleChange = event => {
    if (event.persist) event.persist();
    setValues(valuesTmp => ({
      ...valuesTmp,
      [event.target.name]: event.target.value,
    }));
  };

  const handleChangeFiles = event => {
    if (event.persist) event.persist();

    const filesTmp = [];
    _.forEach(event.target.files, file => {
      filesTmp.push(file);
    });
    setValues(valuesTmp => ({
      ...valuesTmp,
      [event.target.name]: filesTmp,
    }));
  };

  return {
    handleChangeFiles,
    handleChange,
    handleSubmit,
    values,
    errors,
    setValues,
    setErrors,
    setIsSubmitting,
  };
};

export default useForm;
