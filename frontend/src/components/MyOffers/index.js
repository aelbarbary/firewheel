import React, { Component } from 'react';

import Offer from '../Offer/index';
import AddItemPage from '../AddItemPage/index';
import './styles.sass';
import { API_ROOT } from '../../../api-config';

class MyOffers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpened: false
    };
  }

  componentDidMount() {
    document.body.scrollTop = 0;
    document.querySelector('.menu').classList.remove('open');

    fetch (`${API_ROOT}/offers/`)
    .then(results => {
      return results.json();
    }).then(data=> {
        let myOffers = data.map((offer) => {
          return(
              <Offer key={offer.id} offer={offer} />
          );
        });
        this.setState ({ myOffers: myOffers});
    });

  }

  closeModal() {
    this.setState({ modalOpened: false });
    document.body.classList.remove('modal-opened');
    document.body.style.marginRight = 0;
  }

  getModal() {
    if (this.state.modalOpened) {
      return <AddItemPage openClass="open" close={this.closeModal.bind(this)} />;
    } else {
      return;
    }
  }

  openModal() {
    const scrollBar = document.querySelector('.scrollbar-measure');
    const scrollBarWidth = scrollBar.offsetWidth - scrollBar.clientWidth;
    document.body.classList.add('modal-opened');
    document.body.style.marginRight = `${scrollBarWidth}px`;
    this.setState({ modalOpened: true });
  }

  render() {
    return (
      <div className="myItemsWrapper">
        {this.getModal()}
        <div className="addTradeWrapper">
          <button
            onClick={() => {
              this.openModal();
            }}
            className="tradeBtn addItemBtn">
            + Add Item
          </button>
        </div>
       {this.state.myOffers}
      </div>
    );
  }
}

export default MyOffers;
