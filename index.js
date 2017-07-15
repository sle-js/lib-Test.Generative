const InfiniteStream = require("./src/InfiniteStream");
const Random = require("./src/Random");


const ITERATIONS =
    1000;


// typealias Generator t =
//   Promise _ (InfiniteStream t)
//
// typealias Assertion =
//   Promise { fileName :: String, lineNumber :: Int, message :: String } _


// forAll :: Generator t -> (t -> Assertion) -> Assertion
const forAll = gen => predicate =>
    gen.then(stream =>
        stream.foldn(ITERATIONS)(Promise.resolve(true))(acc => item => acc.then(_ => predicate(item)))
    );


// randoms :: () -> Promise _ (InfiniteStream Random.PRNG)
const randoms = () => {
    const randomList = s =>
        InfiniteStream.Cons(s)(() => randomList(s.next()));

    return Random.Random().then(seed => randomList(seed));
};



// arrayOf :: Generator Int -> Generator i -> Generator (Array t)
const arrayOf = lengthGen => itemGen => {
    const randomArray = lengthStream => itemStream =>
        InfiniteStream.Cons(itemStream.takeAsArray(lengthStream.head()))(() => randomArray(lengthStream.drop(1))(itemStream.drop(lengthStream.head())));

    return Promise.all([lengthGen, itemGen])
        .then(streams => Promise.resolve(randomArray(streams[0])(streams[1])));
};


module.exports = {
    arrayOf,
    forAll,
    randoms
};