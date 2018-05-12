import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { API_ROOT } from '../../../api-config';
import './styles.sass';

class AddItemPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      this.modalWrapper.classList.add(this.props.openClass);
    }, 50);
  }

  close() {
    this.modalWrapper.classList.remove(this.props.openClass);
    setTimeout(() => {
      console.log(this.props);
      this.props.close();
    }, 850);
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = new FormData(event.target);

    fetch(`${API_ROOT}/offers/`, {
      method: 'POST',
      body: data,
    });

    this.props.close();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
      <div className="addItemWrapper" ref={node => { this.modalWrapper = node; }}>
        <div className="hider" />
        <div className="modal">
          <div className="heading">
            <h3>Add Item</h3>
          </div>
          <div className="itemWrapper">
            <div className="itemPicWrapper">
              <div className="img" />
              <p className="imgText frm">Upload Item Picture</p>
              <input id="title" name="picture" type="text" className="itemName" placeholder="Enter Name" value="test" />
            </div>
            <div className="itemInfoWrapper">
              <div className="inputWrapper">
                <label htmlFor="title">Provider:</label>
                <input id="provider_id" name="provider_id" type="text" className="itemName" placeholder="Enter Name" value="1" />
              </div>
              <div className="inputWrapper">
                <label htmlFor="title">Name:</label>
                <input id="title" name="name" type="text" className="itemName" placeholder="Enter Name" required />
              </div>
              <div className="priceWrapper">
                <div className="inputWrapper">
                  <label htmlFor="itemPrice">Price:</label>
                  <input min="0" id="itemPrice" name="price" type="number" className="itemPrice" placeholder="Enter Price" required />
                </div>
                {/* <div className="inputWrapper">
                  <label htmlFor="itemCurrency">Currency:</label>
                  <input id="cost" name="itemCurrency" type="text" className="itemCurrency" placeholder="Enter Currency" />
                </div> */}
              </div>
              <div className="inputWrapper">
                <label htmlFor="description">Description:</label>
                <textarea name="description" id="description" className="itemDescription" placeholder="Enter Item Description" />
              </div>
              <div className="inputWrapper">
                <label htmlFor="itemTags">Tags(Comma Separated):</label>
                <textarea name="itemTags" id="itemTags" className="itemTags" placeholder="Enter Tags" />
              </div>
            </div>
          </div>
          <div className="buttonWrapper">
            <button className="saveItemBtn">Save</button>
            <button className="cancelItemBtn" onClick={this.close.bind(this)}>Cancel</button>
          </div>
        </div>
      </div>
    </form>
    );
  }
}

AddItemPage.propTypes = {
  close: PropTypes.func,
  openClass: PropTypes.string
};

export default AddItemPage;
