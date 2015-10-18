var path = require('path');
var commonDb = requireFromRoot('/common/framework/commonDb')();

module.exports = function(app){

  return {
    preApiFunc: preApi(),
    doDbFunc: dbCall(),
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

  function dbCall() {
    return function(req, res, next) {
      console.log('In do api -- This is a place common db call like profile or something which has to be call in every page.--');
      commonDb.doCommonDb(req, res, moduleDbCall);

      function moduleDbCall(){
        var module = req.currentModule;
        if(module.dbCall && module.dbCall.collectionName) {
          var collection = req.projectDb.get(module.dbCall.collectionName);
          var promise = module.dbCall.queryData ? collection[module.dbCall.dbQuery](module.dbCall.queryData) : collection[module.dbCall.dbQuery]();
          promise.on('success', function(doc){
            res.pageDBCallData = doc;
            next();
          });
        }
      }
    };
  }

  function postApi() {
    return function(req, res, next) {
      var module = req.currentModule;
      module.postProcessor(req, res);
      console.log(res.myModuleData);
      if(module.isJson)
        res.render(res.myModuleData);
      else
        res.render(path.join(module.templatePath, module.templateName), res.myModuleData);
    };
  }

};