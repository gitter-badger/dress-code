casper.test.begin("input", function(test) {
  // This is the path from the directory where CasperJS runs, tests/suites in this case, as specified in the npm script
  var utils = require("../utils");

  var component = {
    className: "dc-input",
    modifiers: ["is-error", "disabled", "small"]
  };

  utils.initialize("atoms/input");

  casper
    .then(function() {
      utils.openPage("/03-atoms.html#forms", "desktop");
    })
    .then(function() {
      utils.takeScreenshots(component, "desktop");
    });

  casper
    .then(function() {
      utils.openPage("/03-atoms.html#forms", "mobile");
    })
    .then(function() {
      this.evaluate(function() {
        document.documentElement.classList.remove("f-menu-active");
      });

      utils.takeScreenshots(component, "mobile");
    });

  casper.then(utils.compareScreenshots);

  casper.run(function() {
    casper.test.done();
  });
});
