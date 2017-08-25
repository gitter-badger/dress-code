casper.test.begin("button", function(test) {
  // This is the path from the directory where CasperJS runs, tests/suites in this case, as specified in the npm script
  var utils = require("../utils");

  var component = {
    className: "dc-btn",
    modifiers: ["primary", "destroy", "active", "disabled", "link"]
  };

  utils.initialize("atoms/button");

  casper.start();

  casper
    .then(function() {
      utils.openPage("/03-atoms.html#buttons", "desktop");
    })
    .then(function() {
      this.waitUntilVisible("." + component.className, function() {
        utils.takeScreenshots(component, "desktop");
      });
    });

  casper
    .then(function() {
      utils.openPage("/03-atoms.html#buttons", "mobile");
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
