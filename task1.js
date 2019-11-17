process.stdout.write('Enter you string: ')
process.stdin.on('data', function(str) {
  process.stdout.write('Your revers string is: ' + str.toString().split('').reverse().join('') + '\n\n')
})
