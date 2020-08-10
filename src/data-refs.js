const fs = require("fs");
const readline = require('readline');

const contents = fs.readFileSync('../resources/data-refs.txt');
const lines = contents.toString().split(/\n/);

let writableRefs = {};
let readableRefs = {};
let count = 0;

lines.forEach(line => {
    if( count != 0 ) {
        const [dataRef, type, writable, units, description ] = line.split(/\t/);

        if( writable.toUpperCase() === 'Y' ) {
            writableRefs[dataRef] = { dataRef, type, units, description };
        }
        else {
            readableRefs[dataRef] = { dataRef,type, units, description };
        }
    }
    count++;
});

module.exports = Object.freeze({
    WRITABLE_REFS: writableRefs,
    READABLE_REFS: readableRefs
})