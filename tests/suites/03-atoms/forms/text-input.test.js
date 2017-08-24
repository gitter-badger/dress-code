// This is the path from the directory where CasperJS runs, tests/suites in this case, as specified in the npm script
var common = require('../config'); 
var phantomcss = common.phantomcss;

casper.test.begin('Text input', function(test) {
  common.openPage('/03-atoms.html#forms');
  
  common.setViewport('desktop');

  casper.then(function() {
      phantomcss.screenshot('input.dc-input', 'dc-input');
      phantomcss.screenshot('input.dc-input.dc-input--is-error', 'dc-input--is-error');
      phantomcss.screenshot('input.dc-input.dc-input--disabled', 'dc-input--disabled');
  });

  casper.then(function now_check_the_screenshots() {
    phantomcss.compareAll();
  });

  casper.run(function() {
    casper.test.done();
  });
}); 