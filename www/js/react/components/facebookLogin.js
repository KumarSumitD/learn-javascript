var React = require('react');
var ReactDOM = require('react-dom');
var CommentBox = React.createClass({
  render: function() {
    return(
      <div>
        Hello, world! I am a React
      </div>
    );
  }
});

ReactDOM.render(<CommentBox />, document.getElementById('main-app'));