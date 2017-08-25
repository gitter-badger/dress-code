var require = patchRequire(require);
var phantomcss = require("phantomcss");

var config = {
  rootUrl: "http://127.0.0.1:3000/",
  baseline: "./tests/screenshots/baseline/",
  results: "./tests/screenshots/results/",
  viewports: {
    desktop: { width: 1280, height: 1024 },
    mobile: { width: 320, height: 568 }
  }
};

exports.initialize = function(rootPath) {
  phantomcss.init({
    rebase: casper.cli.get("rebase"),
    screenshotRoot: config.baseline + rootPath,
    comparisonResultRoot: config.results + rootPath,
    failures: false,
    addIteratorToImage: false,
    outputSettings: {
      errorColor: {
        red: 255,
        green: 255,
        blue: 0
      },
      errorType: "movement",
      transparency: 0.5
    },
    rebase: casper.cli.get("rebase")
  });
};

function setViewport(name) {
  var viewport = config.viewports[name];
  casper.viewport(viewport.width, viewport.height);
};

exports.openPage = function(path, viewportName) {
  var rootUrl = config.rootUrl + path;  
  setViewport(viewportName);
  return casper.open(rootUrl);
};

exports.compareScreenshots = function() {
  phantomcss.compareAll();
};

/**
 * Takes screenshots of the specified component and its modifiers (in case it has)
 * in a given viewport size
 */
exports.takeScreenshots = function(component, viewport) {
  phantomcss.screenshot(
    getComponentSelector(component),
    getFileNameForComponent(component, viewport)
  );

  takeScreenshotsForModifiers(component, viewport);
  takeScreenshotsAfterClick(component, viewport);
};

function takeScreenshotsForModifiers(component, viewport) {
  if (component.modifiers && component.modifiers.length) {
    component.modifiers.forEach(function(modifier) {
      phantomcss.screenshot(
        getModifiedComponentSelector(component, modifier),
        getFileNameForModifiedComponent(component, modifier, viewport)
      );
    });
  }
}

function takeScreenshotsAfterClick(component, viewport) {
  if (component.onClick) {
    casper.click(component.onClick.screenshotSelector);

    casper.waitForSelector(
      component.onClick.waitFor,
      function success() {
        phantomcss.screenshot(
          getComponentSelector(component),
          getFileNameForClickedComponent(component, viewport)
        );
      },
      function timeout() {
        casper.test.fail(
          "Timeout while waiting for expected selector to show up after click"
        );
      }
    );
  }
}

function getComponentSelector(component) {
  return "." + component.className;
}

function getModifierSelector(component, modifier) {
  return "." + component.className + "--" + modifier;
}

function getModifiedComponentSelector(component, modifier) {
  return "." + component.className + getModifierSelector(component, modifier);
}

function getFileNameForComponent(component, viewport) {
  return component.className + "__" + viewport;
}

function getFileNameForModifiedComponent(component, modifier, viewport) {
  return component.className + "--" + modifier + "__" + viewport;
}

function getFileNameForClickedComponent(component, viewport) {
  return component.className + "__clicked__" + viewport;
}
