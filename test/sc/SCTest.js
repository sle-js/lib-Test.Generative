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
const nonNegativeIntegers =
    integerStream(0)(1500);


// arrayOfIntegers :: Promise _ (InfiniteStream (Array Int))
const arrayOfIntegers =
    Generative.arrayOf(integerStream(0)(10))(integerStream(-1500)(1500));


const arrayOfNonNegativeIntegers =
    Generative.arrayOf(integerStream(0)(10))(nonNegativeIntegers);


// arrayOfIntegers :: Promise _ (InfiniteStream (Array Int))
const arrayOfIntegersWithNegatives =
    Generative.filter(ns => Array.any(n => n < 0)(ns))(arrayOfIntegers);


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


const sum = ns =>
    Array.sum(Array.filter(n => n <= 1000)(ns));


module.exports =
    Unit.Suite("String Calculator Kata")([
        Unit.Test("given a blank string should return 0")(
            Assertion
                .isTrue(add("").isOkay())
                .equals(0)(add("").withDefault(0))),

        Unit.Test("given an integer should return it's value if <= 1000 else 0")(
            Generative.forAll(nonNegativeIntegers)(n => {
                const result = add(n.toString());

                return Assertion
                    .isTrue(result.isOkay())
                    .equals(n <= 1000 ? n : 0)(result.withDefault(0));
            })),

        Unit.Test("given integers separated with a comma or newline should return the sum of all numbers <= 1000")(
            Generative.forAll2(arrayOfNonNegativeIntegers)(Generative.oneOfStream([",", "\n"]))(ns => seps => {
                const result = add(mkString(ns)(seps));

                return Assertion
                    .isTrue(result.isOkay())
                    .equals(sum(ns))(result.withDefault(0))
            })
        ),

        Unit.Test("given integers separated with a single character custom separator should return the sum of all numbers <= 1000")(
            Generative.forAll2(arrayOfNonNegativeIntegers)(separators)(ns => sep => {
                const result = add("//" + sep + "\n" + Array.join(sep)(ns));

                return Assertion
                    .isTrue(result.isOkay())
                    .equals(sum(ns))(result.withDefault(0))
            })
        ),

        Unit.Test("given integers with at least one negative should return an error with the negative numbers")(
            Generative.forAll(arrayOfIntegersWithNegatives)(ns => {
                const result = add(Array.join(",")(ns));

                return Assertion
                    .isTrue(result.isError())
                    .equals(Array.join(", ")(Array.filter(n => n < 0)(ns)))(result.errorWithDefault(""))
            })
        ),
    ])
;