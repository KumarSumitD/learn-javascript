module.exports = function(app) {
  return {
    route: '/',
    // apiCall: {
    //   path: '/livepuls/home/page', verb: 'put', useStub: false
    // },
    preProcessor: function(req, res) {
      console.log('Home Pre Processor');
    },
    postProcessor: function(req, res) {
      console.log('Home Post Processor');
      res.myModuleData = {
        pageName: 'Home'
      };
    }
  };
};