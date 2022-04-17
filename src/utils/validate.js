export const validateSignupField = (name, value, formData) => {
  switch (name) {
    case 'firstName':
      return value.length >= 2 && /^[a-zA-Z ]*$/.test(value)
        ? ''
        : 'Invalid First Name';

    case 'lastName':
      return value.length >= 2 && /^[a-zA-Z ]*$/.test(value)
        ? ''
        : 'Invalid Last Name';

    case 'email':
      return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(value) ? '' : 'Invalid Email';

    case 'password':
      return value !== '' && value.length >= 6
        ? ''
        : 'Password must contain atleast 6 characters.';

    case 'confirmPassword':
      return value !== '' && value === formData.password
        ? ''
        : 'Password does not match';

    default:
      break;
  }
};

export const validateLoginField = (name, value, formData) => {
  switch (name) {
    case 'email':
      return value === '' ? 'Email is required' : '';

    case 'password':
      return value === '' ? 'Password is required' : '';

    default:
      break;
  }
};

export const validateSignup = (formData) => {
  let isValid = true;
  const errors = {};
  for (const fieldName in formData.errors) {
    const error = validateSignupField(fieldName, formData[fieldName], formData);
    if (error.length > 0) {
      isValid = false;
      errors[fieldName] = error;
    }
  }
  return { isValid, errors };
};

export const validateLogin = (formData) => {
  let isValid = true;
  const errors = {};
  for (const fieldName in formData.errors) {
    const error = validateLoginField(fieldName, formData[fieldName], formData);
    if (error.length > 0) {
      isValid = false;
      errors[fieldName] = error;
    }
  }
  return { isValid, errors };
};
