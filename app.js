const express = require('express');
const app = express();

const { findHighestOdd } = require('./src/comparison/compare.js');
const { oddsApiProcessData } = require('./src/api/oddsApi.js');

app.get('/hkjcApi', async (req, res) => {
  let a = await findHighestOdd();

  let HTMLcode = arr2html(a);
  res.set('Content-Type', 'text/html');
  res.send(HTMLcode);
});

app.get('/oddsApi', async (req, res) => {
    let a = await oddsApiProcessData();
    let HTMLcode = arr2html(a);
    res.set('Content-Type', 'text/html');
    res.send(HTMLcode);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

function arr2html (data) {
    let htmlCode = '<html><body>';

    for (let i = 0; i < data.length; i++) {
      htmlCode += '<table>';
      Object.entries(data[i]).forEach(([key, value]) => {
          if (key != 'percentage') {
            value = JSON.stringify(value);
          }
          htmlCode += `<tr><td>${key}</td><td>${value}</td></tr>`;
        });
      htmlCode += '</table>';
    }
    htmlCode += '</body></html>';

    return htmlCode;
}