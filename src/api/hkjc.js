// hkjc.js
const axios = require('axios');

const hkjcURL = "https://bet.hkjc.com/football/getJSON.aspx?jsontype=odds_had.aspx";
var hkjcMatches = null;

async function hkjcProcessData() {
    // Process the data
    try {
        if (hkjcMatches == null) { // dev only
            const response = await axios.get(hkjcURL);
            hkjcMatches = response.data.matches; // in the data: name, tournaments, matches
        }
        
      } catch (error) {
        console.error('API request error:', error);
      }
    return hkjcMatches;
  }
  
  module.exports = {
    hkjcProcessData
  };