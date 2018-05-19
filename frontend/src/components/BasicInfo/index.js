import React, { Component } from 'react';

import './styles.sass';

class BasicInfo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className="basicInfo">
        <div className="profilePic" >
          <img src={this.props.profile.picture}/>
        </div>
        <div className="nameWrapper">
          <h3 className="normal">{this.props.profile.name}</h3>
        </div>
      </div>
    );
  }
}

export default BasicInfo;
