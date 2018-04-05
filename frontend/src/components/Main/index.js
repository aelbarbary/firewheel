import React, { Component } from 'react';
import './styles.sass';
import Item from '../Item/index';
import { login } from '../../util/Auth';
// import store from '../../store';

class Homepage extends Component {

  constructor() {
    super();

    this.state = {
      offers: [],
      token: ''
    };
  }

  componentDidMount() {
    document.body.scrollTop = 0;
    document.querySelector('.menu').classList.remove('open');

    fetch ('https://randomuser.me/api?results=100')
    .then(results => {
      return results.json();
    }).then(data=> {
      let offers = data.results.map((pic) => {
        return(
            <Item imageProp={pic.picture.large}/>
        );
      });

      login("admin", "P@ssw0rd");
      this.setState ({ offers: offers});
    });
  }

  render() {
    return (
      <main className="main">
        {this.state.offers}
      </main>

    );
  }
}

export default Homepage;
