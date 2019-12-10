import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin
});
console.log( "Ready to read" );
rl.on( 'line', (line) => {
    console.log( "Got: " + line );
});
