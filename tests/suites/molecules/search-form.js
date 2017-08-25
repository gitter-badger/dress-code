casper.test.begin("search-form", function(test) {
  var utils = require("../utils");

  var component = {
    className: "dc-search-form",
    onClick: {
      screenshotSelector: ".dc-search-form .dc-list",
      clickSelector: ".dc-input.dc-search-form__input",
      waitFor: ".dc-list.dc-suggest"
    }
  };

  utils.initialize("molecules/search-form");

  casper.start();

  casper
    .then(function() {
      utils.openPage("/04-molecules.html#05-search-form", "desktop");
    })
    .then(function() {
      utils.takeScreenshots(component, "desktop");
    });

  casper
    .then(function() {
      utils.openPage("/04-molecules.html#05-search-form", "mobile");
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
