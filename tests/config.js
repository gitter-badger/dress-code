var require = patchRequire(require);
var phantomcss = require("phantomcss");

var config = {
  rootUrl: "http://127.0.0.1:3000/",
  screenshots: "./tests/screenshots",
  failures: "./tests/failures",
  viewports: {
    desktop: { width: 1280, height: 1024 },
    mobile: { width: 480, height: 320 }
  }
};

phantomcss.init({
  rebase: casper.cli.get("rebase"),
  screenshotRoot: config.screenshots,
  failedComparisonsRoot: config.failures
});

exports.phantomcss = phantomcss;

exports.openPage = function(path) {
  var rootUrl = config.rootUrl + path;
  casper.start(rootUrl);
};

exports.setViewport = function(name) {
  var viewport = config.viewports[name];
  casper.viewport(viewport.width, viewport.height);
};
