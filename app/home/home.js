module.exports = function(app) {
  return {
    route: '/',
    dbCall: {
      collectionName: 'VolleyBall_Players_Detail',
      dbQuery: 'find'
    },
    preProcessor: function(req, res) {
      console.log('Home Pre Processor');
    },
    postProcessor: function(req, res) {
      console.log('Home Post Processor');
      res.myModuleData.pageName = 'Home';
      res.myModuleData.dbCallData = res.pageDBCallData;
    }
  };
};