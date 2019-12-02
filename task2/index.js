import fs from 'fs';
import csv from 'csvtojson';

const filename = "example.csv";
const csvFilePath = `${__dirname}/csv/${filename}`;

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
    stream.end(null, () => console.log('>>> file is recording'));
  });
