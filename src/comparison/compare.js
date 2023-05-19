// compare.js
const { hkjcProcessData } = require('../api/hkjc.js');

async function findHighestOdd() {
    // Process the data
    let hkjcData = await hkjcProcessData();
    let hkjcOdds = [];
    let count = 0;
    for (let i = 0; i < hkjcData.length; i++) {
        let currentTime = new Date().getTime();
        let match = hkjcData[i];
        let matchDate = new Date(match.matchDate);
        let poolStatus = match.hadodds.POOLSTATUS
        if (matchDate.getTime() < currentTime || poolStatus != 'Selling') {
            continue; // Skip the current item and move to the next iteration
        }
      
        let homeOdds = parseFloat(match.hadodds.H.replace('100@', ''));
        let awayOdds = parseFloat(match.hadodds.A.replace('100@', ''));
        let drawOdds = parseFloat(match.hadodds.D.replace('100@', ''));

        let percentage = 1/homeOdds + 1/awayOdds + 1/drawOdds;
        
        // if (percentage < 1) {
            let jsonObject = {
                matchID: match.matchID,
                matchIDinofficial: match.matchIDinofficial,
                homeTeam: match.homeTeam.teamNameEN,
                awayTeam: match.awayTeam.teamNameEN,
                homeOdds: homeOdds,
                awayOdds: awayOdds,
                drawOdds: drawOdds,
                percentage: percentage
              };
    
            hkjcOdds.push(jsonObject);
        // }
    };

    return hkjcOdds;
  }
  
  module.exports = {
    findHighestOdd
  };