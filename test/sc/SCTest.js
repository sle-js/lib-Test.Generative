const Assertion = require("./../Lib").Assertion;
const InfiniteStream = require("../../src/InfiniteStream");
const Generative = require("../../index");
const Random = require("../../src/Random");
const Unit = require("./../Lib").Unit;

const add = require("./SC");


// randoms :: () -> Promise _ (InfiniteStream Random.PRNG)
const randoms = () => {
    const randomList = s =>
        InfiniteStream.Cons(s)(() => randomList(s.next()));

    return Random.Random().then(seed => randomList(seed));
};


// integers :: () -> Promise _ (InfiniteStream Int)
const integers =
    randoms().then(things => things.map(s => s.asIntInRange(-10000)(10000)));


module.exports =
    Unit.Suite("String Calculator Kata")([
        Unit.Test("given a blank string should return 0")(
            Assertion.equals(0)(add(""))),
        Unit.Test("given an integer should return it's value")(
            Generative.forAll(integers)(n =>
                Assertion.equals(n)(add(n.toString())))
        )
    ]);