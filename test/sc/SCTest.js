const Unit = require("./../Lib").Unit;
const Assertion = require("./../Lib").Assertion;

const add = require("./SC");


module.exports =
    Unit.Suite("String Calculator Kata")([
        Unit.Test("given a blank string should return 0")(
            Assertion.equals(0)(add("")))
    ]);