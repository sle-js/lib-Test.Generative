// An implementation of the pseudo-random number generator (PRNG) from
// [https://gist.github.com/blixt/f17b47c62508be59987b]
// This is a very simple algorithm and suites my purpose.
//
// interface PRNG where
//   next :: () -> PRNG
//   asIntInRange :: () -> Int
//   asFloat :: () -> Float
//   toString :: () -> String
//
// seed :: () -> Promise _ [0.0 .. 1.0)
// Random :: () -> Promise _ PRNG

function PRNGType(content) {
    this.content = content;
}


PRNGType.prototype.next = function () {
    return new PRNGType(this.content * 16807 % 2147483647);
};


PRNGType.prototype.asIntInRange = function (min) {
    return max => (Math.round(this.asFloat() * (max - min) + min)) | 0;
};


PRNGType.prototype.asFloat = function () {
    return (this.content - 1) / 2147483646;
};


PRNGType.prototype.toString = function() {
    return "" + this.content;
};


// Returns a pseudo random number generator (PRNG) from the passed seed.  The seed needs to be in the range [0..1).
const prng = seed => {
    const newSeed = ((seed * 2147483648) | 0) % 2147483647;

    return (newSeed <= 0)
        ? new PRNGType(newSeed + 2147483646)
        : new PRNGType(newSeed);
};


const seed = () =>
    new Promise(accept => accept(Math.random()));


const Random = () =>
    seed().then(seed => prng(seed));


module.exports = {
    Random,
    seed
};