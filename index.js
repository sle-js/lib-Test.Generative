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


// forAll2 :: Generator t1 -> Generator t2 -> (t1 -> t2 -> Assertion) -> Assertion
const forAll2 = gen1 => gen2 => predicate =>
    gen1.then(stream1 =>
        gen2.then(stream2 =>
            stream1.zip(stream2).foldn(ITERATIONS)(Promise.resolve(true))(acc => item => acc.then(_ => predicate(item[0])(item[1])))
        )
    );


// seedStream :: Random.PRNG -> InfiniteStream Random.PRNG
const seedStream = seed =>
    InfiniteStream.Cons(seed)(() => seedStream(seed.next()));


// seedStream :: Random.PRNG -> InfiniteStream (InfiniteStream Random.PRNG)
const seedStreamOfStream = seed =>
    InfiniteStream.Cons(seedStream(seed))(() => seedStreamOfStream(seed.next()));


// randoms :: () -> Promise _ (InfiniteStream Random.PRNG)
const randoms = () =>
    Random.Random().then(seed => seedStream(seed));


// arrayOf :: Generator Int -> Generator i -> Generator (Array t)
const arrayOf = lengthGen => itemGen => {
    const randomArray = lengthStream => itemStream =>
        InfiniteStream.Cons(itemStream.takeAsArray(lengthStream.head()))(() => randomArray(lengthStream.drop(1))(itemStream.drop(lengthStream.head())));

    return Promise.all([lengthGen, itemGen])
        .then(streams => Promise.resolve(randomArray(streams[0])(streams[1])));
};


// oneOfStream :: Array String -> Generator (InfiniteStream String)
const oneOfStream = items =>
    Random.Random().then(seed =>
        seedStreamOfStream(seed)
            .map(s => s.map(c => items[c.asIntInRange(0)(items.length - 1)])));


const map = f => gen =>
    gen.then(stream => stream.map(f));


const filter = f => gen =>
    gen.then(stream => stream.filter(f));


module.exports = {
    arrayOf,
    filter,
    forAll,
    forAll2,
    map,
    oneOfStream,
    randoms,
    seedStream,
    seedStreamOfStream
};