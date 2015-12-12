var React = require('react');
var ReactFire = require('reactfire');//access the bridge between firebase and our application
var Firebase = require('firebase');
var Header = require('./header');
var List = require('./list');
var rootUrl = 'https://flickering-fire-3797.firebaseio.com/';

var App = React.createClass({
    mixins: [ReactFire],//any method available on ReactFire literally copy paste over to our component

    getInitialState: function () {
        return {
            items: {},
            loaded: false
        }
    },

    componentWillMount: function () {
        this.fb = new Firebase(rootUrl + 'items/');//new Firebase object that points to this url,any object from this url is bound on our 'items' object(this.state.items={}
        this.bindAsObject(this.fb, 'items');
        this.fb.on('value', this.handleDataLoaded);
    },

    render: function () {
        return <div className="row panel panel-default">
            <div className="col-md-8 col-md-offset-2">
                <h2 className="text-center">
                    To Do List
                </h2>
                <Header itemStore={this.firebaseRefs.items}/>
                <hr/>
                <div className={"content " + (this.state.loaded ? 'loaded' : '')}>
                    <List items={this.state.items}/>
                    {this.deleteButton()}
                </div>
            </div>
        </div>
    },

    handleDataLoaded: function () {
        this.setState({loaded: true});
    },

    deleteButton: function () {
        if (!this.state.loaded) {
            return null;
        } else {
            return <div className="text center clear-complete">
                <hr/>
                <button
                    type="button"
                    onClick={this.onDeleteDoneClick}
                    className="btn btn-default">
                    Clear Complete
                </button>
            </div>
        }
    },

    onDeleteDoneClick: function () {
        for(var key in this.state.items){
            if(this.state.items[key].done === true){
                this.fb.child(key).remove();
            }
        }
    }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
