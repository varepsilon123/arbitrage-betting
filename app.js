const express = require('express');
const app = express();

const { findHighestOdd } = require('./src/comparison/compare.js');

app.get('/api', async (req, res) => {
    let a = await findHighestOdd();

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
        Object.entries(data[i]).forEach(([key, value]) => {
            htmlCode += `${key}: ${value}, `;
          });
          htmlCode += '<br/>';
    }
    htmlCode += '</body></html>';

    return htmlCode;
}