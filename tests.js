const Unit = require("./test/Lib").Unit;

require("./test/sc/SCTest")
    .then(Unit.showErrors)
    .then(Unit.showSummary)
    .then(Unit.setExitCodeOnFailures);