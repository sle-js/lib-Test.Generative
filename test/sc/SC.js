const Array = require("../Lib").Array;
const Result = require("./Result");


const split = input => separators =>
    input === ""
        ? []
        : input.split(separators);


const tokenize = input => {
    if (input.startsWith("//[")) {
        const indexOfNewline = input.indexOf("\n");

        return split(input.substring(indexOfNewline + 1))(input.substring(3, indexOfNewline - 1));
    } else if (input.startsWith("//")) {
        return split(input.substring(4))(input[2]);
    } else {
        return split(input)(/[,\n]/);
    }
};

const parse = input =>
    tokenize(input).map(s => parseInt(s));


const add = input => {
    const numbers = parse(input);

    if (Array.any(n => n < 0)(numbers)) {
        return Result.Error(Array.join(", ")(Array.filter(n => n < 0)(numbers)));
    } else {
        return Result.Okay(Array.sum(Array.filter(n => n <= 1000)(numbers)));
    }
};


module.exports =
    add;