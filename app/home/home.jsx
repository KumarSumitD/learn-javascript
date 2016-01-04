var React = require('react');
var BaseLayout = require('../shared/base-template');
var FacebookLogin = require('../shared/facebook-login');

var HomePage = React.createClass({
  render: function() {
    return(
      <BaseLayout title="Livepuls Home Page">
        <div>This is the {this.props.pageName} Page</div>
        <div id="facebook_login"></div>
        <script>
          console.log("Facebook");
        </script>
      </BaseLayout>
    );
  }
});





module.exports = HomePage;