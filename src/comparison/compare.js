// compare.js
const { hkjcProcessData } = require('../api/hkjc.js');

async function findHighestOdd() {
    // Process the data
    let a = await hkjcProcessData();

    return a;
  }
  
  module.exports = {
    findHighestOdd
  };