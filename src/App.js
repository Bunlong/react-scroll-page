import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import createReactClass from 'create-react-class';

const InfiniteData = createReactClass({
  getInitialState: function() {
    return (
      {
        data: [], 
        requestSent: false
      }
    );
  },

  componentDidMount: function() {
    window.addEventListener('scroll', this.handleOnScroll);

    this.initData();
  },

  componentWillUnmount: function() {
    window.removeEventListener('scroll', this.handleOnScroll);
  },

  initData: function() {
    var data = this.loadData(this.state.data.length, 100);
    this.setState({data: data});
  },

  loadData: function(startKey, counter) {
    var i = 0;
    var data = [];
    for (i = 0; i < counter; i++) {
      var tempData = (<div key={startKey+i} className="data-info">Data {startKey+i}</div>);
      data.push(tempData);
    }

    return data;
  },

  querySearchResult: function() {
    if (this.state.requestSent) {
      return;
    }

    // enumerate a slow query
    setTimeout(this.query, 1000);

    this.setState({requestSent: true});
  },

  query: function() {
    var data = this.loadData(this.state.data.length, 20);
    var newData = this.state.data.concat(data);
    this.setState({data: newData, requestSent: false});
  },  

  isAtBottom() {
    var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    var clientHeight = document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    return scrolledToBottom;
  },

  handleOnScroll: function() {
    if (this.isAtBottom()) {
      this.querySearchResult();
    }
  },

  render: function() {
    return (
      <div>
        <div className="data-container">
          {this.state.data}
        </div>
        {(() => {
          if (this.state.requestSent) {
            return(
              <div className="data-loading">
                <i className="fa fa-refresh fa-spin">Refresh</i>
              </div>
            );
          } else {
            return(
              <div className="data-loading"></div>
            );
          }
        })()}
      </div>
    );
  }
});


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Scroll</h1>
        </header>
        <p className="App-intro">
          <InfiniteData />
        </p>
      </div>
    );
  }
}

export default App;
