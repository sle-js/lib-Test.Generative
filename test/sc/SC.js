const Array = require("../Lib").Array;
const Result = require("./Result");


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


const add = input => {
    const numbers = parse(input);

    if (Array.any(n => n < 0)(numbers)) {
        return Result.Error(Array.join(", ")(Array.filter(n => n < 0)(numbers)));
    } else {
        return Result.Okay(Array.sum(numbers));
    }
};


module.exports =
    add;