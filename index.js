const ITERATIONS =
    1000;


const forAll = gen => predicate =>
    gen.then(stream =>
        stream.foldn(ITERATIONS)(Promise.resolve(true))(acc => item => acc.then(_ => predicate(item)))
    );


module.exports = {
    forAll,
};