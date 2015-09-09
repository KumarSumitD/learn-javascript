module.exports = function(app) {
  return {
    route: '/photos',
    preProcessor: function(req, res) {
      console.log('Home Pre Processor');
    },
    postProcessor: function(req, res) {
      console.log('Home Post Processor');
      res.myModuleData = {
        pageName: 'photos'
      };
    }
  };
};