export const emailValidation = (input : string) => {
  let regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(input) ? false : 'Email is invalid';
}

export const emptyValidation = (input : string) => {
  return input && input.length > 0 ? false : 'Field cannot be empty !';
}
