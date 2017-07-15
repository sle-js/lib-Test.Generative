const Array = mrequire("core:Native.Data.Array:1.0.0");

Array.sum = ns =>
    Array.foldl(0)(acc => i => acc + i)(ns);
assumptionEqual(0, Array.sum([]));
assumptionEqual(6, Array.sum([1, 2, 3]));


module.exports = Array;