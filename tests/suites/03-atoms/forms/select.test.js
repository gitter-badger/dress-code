var common = require('../config');
var phantomcss = common.phantomcss;

casper.test.begin('Select', function(test) {
  common.openPage('/03-atoms.html#forms');
  
  common.setViewport('desktop');

  casper.then(function() {
      phantomcss.screenshot('select.dc-select', 'dc-select');
      phantomcss.screenshot('select.dc-select.dc-select--is-error', 'dc-select--is-error');
      phantomcss.screenshot('select.dc-select.dc-select--small', 'dc-select--small');
  });

  casper.then(function now_check_the_screenshots() {
    phantomcss.compareAll();
  });

  casper.run(function() {
    casper.test.done();
  });
});