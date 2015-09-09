var path = require('path');

module.exports = function(app){

  return {
    preApiFunc: preApi(),
    doApiFunc: doApi(),
    postApiFunc: postApi()
  };

  function preApi() {
    return function(req, res, next) {
      console.log('In common pre api');
      var module = req.currentModule;
      res.myModuleData = {};
      module.preProcessor(req, res);
      next();
    };
  }

  function doApi() {
    return function(req, res, next) {
      console.log('In do api');
      if(req.currentModule.dbCall) {
        console.log(req.rentMeDb[req.currentModule.dbCall.query]);
        var promise  = req.rentMeDb[eq.currentModule.dbCall.query];
        promise.on('error', function(err){
          console.log('error');
        });
        promise.on('success', function(doc){
          console.log(doc);
        });
        promise.on('complete', function(err, doc){
          console.log('complete');
        });
      }
      next();
    };
  }

  function postApi() {
    return function(req, res, next) {
      console.log('In common post api');
      var module = req.currentModule;
      module.postProcessor(req, res);

      if(module.isJson)
        res.render(res.myModuleData);
      else
        res.render(path.join(module.templatePath, module.templateName), res.myModuleData);
    };
  }

};