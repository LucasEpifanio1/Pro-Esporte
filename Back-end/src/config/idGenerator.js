function generateRandomId() {
  const randomNum = Math.floor(Math.random() * 10000000)
  return randomNum;
}

module.exports = { generateRandomId };