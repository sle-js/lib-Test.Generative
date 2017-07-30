const Array = require("../Libs").Array;
const Result = require("./Result");


const split = input => separators =>
    input === ""
        ? []
        : input.split(separators);


const quoteRegExp = str =>
    str.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");


const tokenize = input => {
    if (input.startsWith("//[")) {
        const indexOfNewline = input.indexOf("\n");
        const separators = new RegExp(input
            .substring(3, indexOfNewline - 1)
            .split("][")
            .sort((a, b) => b.length - a.length)
            .map(x => quoteRegExp(x))
            .join("|"));

        return split(input.substring(indexOfNewline + 1))(separators);
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