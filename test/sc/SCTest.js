const Array = require("./../Lib").Array;
const Assertion = require("./../Lib").Assertion;
const Generative = require("../../index");
const Unit = require("./../Lib").Unit;

const add = require("./SC");

const integerStream = min => max =>
    Generative.randoms().then(things => things.map(s => s.asIntInRange(min)(max)));


// integers :: () -> Promise _ (InfiniteStream Int)
const integers =
    integerStream(-10000)(10000);


const arrayOfIntegers =
    Generative.arrayOf(integerStream(0)(10))(integers);


module.exports =
    Unit.Suite("String Calculator Kata")([
        Unit.Test("given a blank string should return 0")(
            Assertion.equals(0)(add(""))),
        Unit.Test("given an integer should return it's value")(
            Generative.forAll(integers)(n =>
                Assertion.equals(n)(add(n.toString())))
        ),
        Unit.Test("given integers separated with a comma should return the sum")(
            Generative.forAll(arrayOfIntegers)(ns =>
                Assertion.equals(Array.sum(ns))(add(Array.join(",")(ns)))
            )
        )
    ]);