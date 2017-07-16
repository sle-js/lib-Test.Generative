const Array = mrequire("core:Native.Data.Array:1.0.0");

Array.sum = ns =>
    Array.foldl(0)(acc => i => acc + i)(ns);
assumptionEqual(0, Array.sum([]));
assumptionEqual(6, Array.sum([1, 2, 3]));


Array.drop = n => a =>
    Array.slice(n)(Array.length(a))(a);
assumptionEqual([], Array.drop(1)([1]));
assumptionEqual([2, 3, 4], Array.drop(1)([1, 2, 3, 4]));
assumptionEqual([3, 4], Array.drop(2)([1, 2, 3, 4]));


Array.any = p => a =>
    a.some(p);
assumption(!Array.any(x => x < 0)([1, 2, 3, 4]));
assumption(Array.any(x => x < 0)([1, 2, -3, 4]));


module.exports = Array;