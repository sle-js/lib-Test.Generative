const ITERATIONS =
    1000;


const forAll = gen => predicate => {
    forAllN = n => genStream => {
        if (n === 0) {
            return Promise.resolve(true);
        } else {
            const rest = forAllN(n-1)(genStream.tail());

            return rest.then(_ => predicate(genStream.head()));
        }
    };

    return gen.then(genStream => forAllN(ITERATIONS)(genStream));
};




module.exports = {
    forAll,
};