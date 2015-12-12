var React = require('react');
var ListItem = require('./listItem');

module.exports = React.createClass({
    render: function () {
        return <div>
            {this.renderList()}
        </div>
    },
    renderList: function () {
        if (!this.props.items) {
            return <h4>
                Add a todo to get started
            </h4>
        } else {
            var children = [];

            for (var key in this.props.items) {
                var item = this.props.items[key];
                item.key = key;
                children.push(
                    //<li>{this.props.items[key].text}</li>
                    <ListItem item={this.props.items[key]} key={key}></ListItem>
                )
            }
            return children;
        }
    }
});