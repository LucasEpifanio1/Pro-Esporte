function generateRandomId() {
  const randomNum = Math.floor(Math.random() * 10000000);
  return randomNum;
}

function generateRandomId8Dig() {
  const randomNum = Math.floor(Math.random() * 100000000);
  return randomNum;
}

module.exports = { generateRandomId8Dig, generateRandomId };
