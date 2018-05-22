const types = {
  lat: 'number',
  lng: 'number',
  radius: 'number'
};

function validate(value, field) {
  // TODO: better validation
  return typeof value === types[field] ? true : false;
}

export default validate;