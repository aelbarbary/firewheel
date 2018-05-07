import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.sass';
import { API_ROOT } from '../../../api-config';

class ItemPage extends Component {
  componentDidMount() {
    document.body.scrollTop = 0;
    document.querySelector('.menu').classList.remove('open');
  }
  render() {
    var itemId = this.props.match.params.id;
    fetch (`${API_ROOT}/offers/${itemId}`)
    .then(results => {

      return results.json();
    }).then(data=> {
      var offer = data;
      this.setState ({ offer: data});
    });
    return (
      <div className="itemPageWrapper">
        <div className="itemImgWrapper content" >
          <img src={this.state.offer.picture} />
        </div>
        <div className="itemInfoWrapper">
          <Link className="backLink" to="/">
            <span className="small">
              <svg fill="#000000" height="13" viewBox="0 0 18 15" width="13" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10l5 5 5-5z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
            </span>All Items
          </Link>
          <h3 className="itemName">{this.state.offer.title}</h3>
          <p className="itemCost frm">${this.state.offer.cost}</p>
          <p className="description">
            {this.state.offer.description}
          </p>
          <p className="seller frm">By <span>{this.state.offer.provider}</span></p>
          <button className="reqTradeBtn normalBtn">Contact</button>
        </div>
      </div>
    );
  }
}

export default ItemPage;
