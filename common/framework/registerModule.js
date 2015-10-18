var path = require('path');
var glob = require('glob');
var _ = require('lodash');
// DB Name and Port Configurable
var mongo = require('mongodb');
var monk = require('monk');
var config = requireFromRoot('/common/config/config');
var projectDb = monk(config.db_host + config.project_db);

module.exports = function(app) {
  var middleware = requireFromRoot('/common/framework/middleware.js')(app);
  var defaultConfig = {
    route: null,
    routeVerb: 'get',
    isJson: false,
    dbCall: {},
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
    modules[routeLookup] = moduleConfig;
  }

  function registerApps() {
    _.each(modules,function(module){
      app[module.routeVerb](module.route, initFunction, middleware.preApiFunc, middleware.doDbFunc, middleware.postApiFunc);
    });
  }

  function initFunction(req, res, next) {
    req.currentModule = modules[req.method.toLowerCase() + ':' + req.route.path];
    req.projectDb = projectDb;
    next();
  }
};