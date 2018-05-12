import React, { Component } from 'react';
import './styles.sass';
import Item from '../Item/index';
// import store from '../../store';
import { API_ROOT } from '../../../api-config';

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

    fetch (`${API_ROOT}/offers/`)
    .then(results => {
      return results.json();
    }).then(data=> {
      let offers = data.map((offer) => {
        return(

            <Item key={offer.id} imageProp={offer.picture} urlProp={'item/' + offer.id}/>
        );
      });

      this.setState ({ offers: offers});
    });
  }

  render() {
    return (
      <div className="main">
        {this.state.offers}
      </div>

    );
  }
}

export default Homepage;
