import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      username: '',
    };
    this.search = this.search.bind(this);
  }

  search(term) {
    $.post('/repos', {username: term}).then(() => $.ajax({
      url: '/repos',
      type: 'get',
      data: {username: term},
      dataType: 'json',
      success: (response) => {
        this.setState({
          repos: response.repos,
          username: response.username,
        });
      },
    }));
  }

  render() {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state}/>
      <Search onSearch={this.search}/>
    </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
