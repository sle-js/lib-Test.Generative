const Unit = require("./test/Libs").Unit;

require("./test/sc/SCTest")
    .then(Unit.showErrors)
    .then(Unit.showSummary)
    .then(Unit.setExitCodeOnFailures);