const Array = require("./src/Lib").Array;


const forAll = gen => predicate =>
    Array.foldl(Promise.resolve(true))(acc => item => acc.then(_ => predicate(item)))(gen);


module.exports = {
    forAll,
};