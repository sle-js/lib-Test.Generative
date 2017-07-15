const Array = require("../Lib").Array;
const Maybe = require("../Lib").Maybe;


const split = input => separators =>
    input === ""
        ? []
        : input.split(separators);


const tokenize = input =>
    input.startsWith("//")
        ? split(input.substring(4))(input[2])
        : split(input)(/[,\n]/);


const parse = input =>
    tokenize(input).map(s => parseInt(s));


const add = input =>
    Maybe.Just(Array.sum(parse(input)));


module.exports =
    add;