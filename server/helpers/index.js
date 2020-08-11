const randomCode = (length) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < length; i += 1) {
    code += alphabet[Math.floor(Math.random() * 26)];
  }
  return code;
};

module.exports = {
  randomCode,
};
