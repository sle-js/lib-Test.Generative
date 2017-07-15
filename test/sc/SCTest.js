const Assertion = require("./../Lib").Assertion;
const Generative = require("../../index");
const Unit = require("./../Lib").Unit;

const add = require("./SC");


const integers = [1, 2, 3, 4];


module.exports =
    Unit.Suite("String Calculator Kata")([
        Unit.Test("given a blank string should return 0")(
            Assertion.equals(0)(add(""))),
        Unit.Test("given an integer should return it's value")(
            Generative.forAll(integers)(n =>
                Assertion.equals(n)(add(n.toString())))
        )
    ]);