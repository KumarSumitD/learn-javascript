var path = require('path');
var glob = require('glob');
// DB Name and Port Configurable
var rentMeDb = require('monk')('localhost:27017/rentMeDb');
var _ = require('lodash');

module.exports = function(app) {
  var middleware = requireFromRoot('/common/framework/middleware.js')(app);
  var defaultConfig = {
    route: null,
    routeVerb: 'get',
    isJson: false,
    preProcessor: function() {
      console.log('default preProcessor');
    },
    postProcessor: function() {
      console.log('default postProcessor');
    }
  },
  modules = {};

  //- Looping through all apps
  iterateApps();

  //- Register All Route
  registerApps();

  function iterateApps() {
    glob.sync('./**/*.js', { cwd: process.cwd() + '/app'})
      .forEach(function(file) { setupMiniApp(path.join(process.cwd() + '/app', file)); });
  }

  function setupMiniApp(filepath) {
    var appModule = require(filepath)(app);
    var moduleConfig = _.assign(_.cloneDeep(defaultConfig), appModule);
    var routeLookup = moduleConfig.routeVerb + ':' + moduleConfig.route;
    moduleConfig.templatePath = path.dirname(filepath);
    moduleConfig.templateName = path.basename(filepath, '.js');
    moduleConfig.rentMeDb = moduleConfig.dbCall ? rentMeDb.get(dbCall.tableName) : "";
    modules[routeLookup] = moduleConfig;
  }

  function registerApps() {
    _.each(modules,function(module){
      app[module.routeVerb](module.route, initFunction, middleware.preApiFunc, middleware.doApiFunc, middleware.postApiFunc);
    });
  }

  function initFunction(req, res, next) {
    req.currentModule = modules[req.method.toLowerCase() + ':' + req.route.path];
    next();
  }
};