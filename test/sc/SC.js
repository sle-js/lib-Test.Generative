const Array = mrequire("core:Native.Data.Array:1.0.0");


const add = input =>
    input === "" ? 0 : Array.sum(input.split(",").map(s => parseInt(s)));


module.exports =
    add;