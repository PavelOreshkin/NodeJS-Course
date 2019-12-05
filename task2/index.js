import fs from 'fs';
import csv from 'csvtojson';
import path from 'path';

const csvFilePath = path.join(__dirname, 'csv', 'example.csv');
const stream = fs.createReadStream(csvFilePath);

fs.writeFile('./task2/message.txt', '', () => {});

csv()
  .fromStream(stream)
  .subscribe(jsonObj => {
    delete jsonObj.Amount;
    let newObject = {};

    for (let key in jsonObj) {
      newObject[key.toLowerCase()] = jsonObj[key]
    }
    fs.appendFile('./task2/message.txt', `${JSON.stringify(newObject)}\n`, () => {})
  })
  .on('error', (err) => {
    console.error(err)
  })
