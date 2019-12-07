process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdout.write('>>> Enter you string: ');

process.stdin.on('data', (input) => {
  const reversMessage = String(input).split('').reverse().join('');
  process.stdout.write(`>>> Your revers string is: `);
  process.stdout.write(`${reversMessage} \n\n`);
});
