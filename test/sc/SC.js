const Array = mrequire("core:Native.Data.Array:1.0.0");


const tokenize = input =>
    input.split(/[,\n]/);


const parse = input =>
    tokenize(input).map(s => parseInt(s));


const add = input =>
    input === "" ? 0 : Array.sum(parse(input));


module.exports =
    add;