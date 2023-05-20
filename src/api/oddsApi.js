// oddsApi.js
const axios = require('axios');

var oddsData = null;

async function oddsApiProcessData() {
  // Process the data
  try {
    if (oddsData == null){
      const response = await axios.get('https://api.the-odds-api.com/v4/sports/upcoming/odds', {
        params: {
          apiKey: '9afc77e8077cea8cec12d641dcbc736d', // Replace with your actual API key
          // sport: 'basketball_nba',
          regions: 'us',
          markets: 'h2h',
        },
      });
      oddsData = response.data;
    }


    const highestPrices = [];
    let count = 0;
    for (const match of oddsData) {
      
      for (const bookmaker of match.bookmakers) {
        for (const market of bookmaker.markets) {
          for (const outcome of market.outcomes) {
            
            const outcomeName = outcome.name;
            const outcomePrice = outcome.price;
            if (!highestPrices[count]) {
              highestPrices[count] = {};
            }
            if (!(outcomeName in highestPrices[count]) || outcomePrice > highestPrices[count][outcomeName]) {
              highestPrices[count][outcomeName] = {
                'bookie': bookmaker.key,
                'odds': outcomePrice
              };
            }
          }
        }
      }

      if (highestPrices[count] !== undefined) {
        count++;
      }
    }
    return oddsApiFindPercentage(highestPrices);

  } catch (error) {
    console.error('API request error:', error);
  }
}
  
function oddsApiFindPercentage(data) {
  for (let i = 0; i < data.length; i++) {
    let percentage = 0;

    if (typeof data[i]['percentage'] === 'undefined') {
      data[i]['percentage'] = 0;
    }

    for (const outcomeName in data[i]) {
      if (outcomeName !== 'percentage') {
        data[i]['percentage'] += 1 / parseFloat(data[i][outcomeName].odds);
      }
    }
  }
  return data;
}

module.exports = {
  oddsApiProcessData
};