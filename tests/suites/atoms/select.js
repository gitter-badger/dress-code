casper.test.begin("select", function(test) {
  var utils = require("../utils");

  var component = {
    className: "dc-select",
    modifiers: ["is-error", "small"]
  };

  utils.initialize("atoms/select");

  casper.start();

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
