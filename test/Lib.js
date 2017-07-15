const Libs = require("../src/Lib");


module.exports = Object.assign({}, Libs, {
    Assertion: mrequire("core:Test.Unit.Assertion:1.1.0"),
    Maybe: mrequire("core:Native.Data.Maybe:1.0.0"),
    Unit: mrequire("core:Test.Unit:0.0.1")
});