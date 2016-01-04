var path = require('path');
var registerModules = requireFromRoot('/common/framework/registerModule.js');
var expressReact = require('express-react-views');

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
      .set('view options', {layout:false})
      .set('views', path.join(process.cwd(), '/'))
      .set('view engine', 'jsx')
      .engine('jsx', expressReact.createEngine());

    registerModules(app);

    app.listen(config.node_port);
  }

};