import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles.sass';
import { API_ROOT } from '../../../api-config';

class Offer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: false
    };
  }

  deleteItem(itemId){
    return fetch(`${API_ROOT}/offers/${itemId}`, {
        method: 'DELETE'
    })
    .then( data => {
      this.setState({
        isHidden: true});
      console.log(data);

    });
  }
  render() {
    console.log(this.state.isHidden);
    if (!this.state.isHidden){
      return (
        <div className="uIWrapper">
          <div className="upper">
            <div className="userImg" >
              <img src={this.props.offer.picture}/>
            </div>
            <div className="itemInfo">
              <h3 className="itemName">
                <Link to="item/1234">{this.props.offer.name}</Link>
              </h3>
              <p className="itemCost frm">{this.props.offer.cost}</p>
              <p className="addDate frm">{this.props.offer.date}</p>
              <p className="itemDescription">{this.props.offer.description}</p>
              <div className="tradeBtnWrapper lower">
                <button className="deleteBtn normalBtn" onClick={ () => {
                            this.deleteItem(this.props.offer.id)}
                          }>Remove Item</button>
                <button className="editBtn normalBtn" onClick={this.props.editModal}>Edit Info</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else{
      return(<div></div>);
    }
  }
}

Offer.propTypes = {
  editModal: PropTypes.func
};

export default Offer;
