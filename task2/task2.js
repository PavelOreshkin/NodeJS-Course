const csv = require('csvtojson');
const fs = require('fs');

const filename = "example.csv";
const csvFilePath = `${__dirname}/${filename}`;

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    const stream = fs.createWriteStream('./task2/message.txt');
    jsonObj.forEach(item => {
      try {
        stream.write(`${JSON.stringify(item)}\n`);
      } catch (error) {
        console.error(error);
      }
    })
    stream.end();
  });
