import React, { Component } from 'react';
import axios from 'axios';
import Loading from './Loading';

class App extends Component {
  constructor () {
    super();
    this.state = {
      users: [],
      loading: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getUsers() {
    this.setState({
      loading: true
    })
    axios('https://api.randomuser.me/?nat=US&results=5').then(response => 
      this.setState({
        users: [...this.state.users, ...response.data.results],
        loading: false
      })
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    this.getUsers();
  }

  componentDidMount() {
    this.getUsers();  
  }

  render() {
    const { loading, users } = this.state;
    return <div className="container py-5">
      <h3>Click on below button to load more users</h3>
      <form onSubmit={this.handleSubmit}>
        <input className='btn btn-primary' type="submit" value="Load More Users" />
      </form>
      <hr/>
      {!loading ? users.map(user => 
        <div className='media' key={user.id.value}>
          <div className='media-left'><img src={user.picture.thumbnail} alt='' /></div>
          <div className="media-body">
            <h3>{user.name.title}. {user.name.first} {user.name.last}</h3>
            <p>{user.email}</p>
          </div>
        </div>
      ) : (<Loading message="Please wait..." />)}
    </div>;
  }
}

export default App;
