const fs = require("fs");
const readline = require('readline');
const { inspect } = require("util");

const readLines = (filename) => {
    const contents = fs.readFileSync(filename);
    return contents.toString().split(/\n/);
}

let writableRefs = {};
let readableRefs = {};
let count = 0;
const refLines = readLines('resources/data-refs.txt');

refLines.forEach(refLine => {
    if( count != 0 ) {
        const [dataRef, type, writable, units, description ] = refLine.split(/\t/);

        if( writable.toUpperCase() === 'Y' ) {
            writableRefs[dataRef] = { dataRef, type, units, description };
        }
        else {
            readableRefs[dataRef] = { dataRef,type, units, description };
        }
    }
    count++;
});

let commandRefs = {};
const cmdLines = readLines('resources/commands.txt');
count = 0;
cmdLines.forEach(cmdLine => {
    if( count != 0 ){
        const [command, description] = cmdLine.split(/\t/);
        commandRefs[command] = { command, description};
    }
    count++;
});

module.exports = Object.freeze({
    WRITABLE_REFS: writableRefs,
    READABLE_REFS: readableRefs,
    COMMAND_REFS: commandRefs
})