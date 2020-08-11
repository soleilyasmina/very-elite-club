module.exports = (message, ws, wss) => {
  const payload = JSON.parse(message);
  console.log(payload);
};
