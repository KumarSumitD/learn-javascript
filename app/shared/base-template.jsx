var React = require('react');

var BaseTemplate = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.5/react.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.5/react-dom.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked.min.js"></script>
        </head>
        <body>Hello {this.props.children}</body>
      </html>
    );
  }
});

module.exports = BaseTemplate;