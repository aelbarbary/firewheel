import React, { Component } from 'react';
// import {Link} from 'react-router';
import { withRouter } from "react-router-dom";
import './styles.sass';
import { Link } from 'react-router-dom'
class Item extends Component {

  render() {
    
    return(
      <div className="item">
        <p>{this.props.urlProp} </p>
        <Link to={this.props.urlProp}>
          <div className="content">
            <img src={this.props.imageProp} />
          </div>
        </Link>
      </div>
    );
  }
}

export default withRouter(Item);
