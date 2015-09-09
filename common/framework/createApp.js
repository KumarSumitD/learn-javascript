var path = require('path');
var registerModules = requireFromRoot('/common/framework/registerModule.js');

module.exports = function(cfg){
  var config = cfg;
  return {
    createApp: createApp
  };

  function createApp() {
    // Each Step should be abstracted to each file - minimum

    // Step 1: Setting express module
    var app = require('express')();
    app
      .set('trust proxy', true)
      .set('view engine', 'jade')
      .set('view options', {layout:false})
      .set('views', path.join(process.cwd(), '/'));

    registerModules(app);

    app.listen(config.node_port);
  }

};