module.exports = function(app) {
  return {
    route: '/',
    // dbCall: {
    //   tableName: 'Players',
    //   query: find({})
    // },
    preProcessor: function(req, res) {
      console.log('Home Pre Processor');
    },
    postProcessor: function(req, res) {
      console.log('Home Post Processor');
      res.myModuleData = {
        pageName: 'home'
      };
    }
  };
};