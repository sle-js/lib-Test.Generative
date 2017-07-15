const Array = require("./../Lib").Array;
const Assertion = require("./../Lib").Assertion;
const Generative = require("../../index");
const InfiniteStream = require("../../src/InfiniteStream");
const Random = require("../../src/Random");
const Unit = require("./../Lib").Unit;

const add = require("./SC");

const integerStream = min => max =>
    Generative.randoms().then(things => things.map(s => s.asIntInRange(min)(max)));


// integers :: Promise _ (InfiniteStream Int)
const integers =
    integerStream(-10000)(10000);


// arrayOfIntegers :: Promise _ (InfiniteStream (Array Int))
const arrayOfIntegers =
    Generative.arrayOf(integerStream(0)(10))(integers);


const isDigit = n =>
    (n >= 48 && n <= 58);


// separators :: Promise _ (InfiniteStream Char)
const separators =
    Generative.map(String.fromCharCode)(Generative.filter(n => !isDigit(n) && n !== 45)(integerStream(33)(127)));


// mkString :: Array Int -> InfiniteStream String -> String
const mkString = nums => seps => {
    if (nums.length === 0) {
        return ""
    } else if (nums.length === 1) {
        return nums[0].toString();
    } else {
        return nums[0].toString() + seps.head() + mkString(Array.drop(1)(nums))(seps.tail());
    }
};


module.exports =
    Unit.Suite("String Calculator Kata")([
        Unit.Test("given a blank string should return 0")(
            Assertion.equals(0)(add(""))),
        Unit.Test("given an integer should return it's value")(
            Generative.forAll(integers)(n =>
                Assertion.equals(n)(add(n.toString())))
        ),
        Unit.Test("given integers separated with a comma or newline should return the sum")(
            Generative.forAll2(arrayOfIntegers)(Generative.oneOfStream([",", "\n"]))(ns => seps =>
                Assertion.equals(Array.sum(ns))(add(mkString(ns)(seps)))
            )
        ),
        Unit.Test("given integers separated with a single character custom separator should return the sum")(
            Generative.forAll2(arrayOfIntegers)(separators)(ns => sep => {
                const input = "//" + sep + "\n" + Array.join(sep)(ns);

                return Assertion.equals(Array.sum(ns))(add(input))
            })
        )
    ]);