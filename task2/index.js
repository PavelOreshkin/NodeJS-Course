import fs from 'fs';
import csv from 'csvtojson';
import path from 'path';

const csvFilePath = path.join(__dirname, 'csv', 'example.csv');
const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream('./task2/message.txt');

const parserParameters = {
  headers: ["book", "author", "amount", "price"],
  colParser: {
    "amount": "omit",
    "price": "number"
  },
}

const handleError = (message, error) => console.error(`${message}: `, error.message);

readStream
  .on('error', (error) => handleError('read stream error', error))
  .pipe(csv(parserParameters))
  .on('error', (error) => handleError('cvs convert error', error))
  .pipe(writeStream)
  .on('error', (error) => handleError('write stream error', error))
  .on('finish', () => console.log('message.txt is written successful'));
