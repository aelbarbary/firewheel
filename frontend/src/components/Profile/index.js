import React, { Component } from 'react';

import BasicInfo from '../BasicInfo/index';
import OtherInfo from '../OtherInfo/index';
import './styles.sass';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {}
    };
    this.getUserbasicInfo_callback = this.getUserbasicInfo_callback.bind(this);
  }

  componentDidMount() {
    document.body.scrollTop = 0;
    document.querySelector('.menu').classList.remove('open');
  }

  componentWillMount() {
    this.props.auth.getUserbasicInfo(this.getUserbasicInfo_callback);
  }

  getUserbasicInfo_callback(err, profile)
  {
    console.log(profile);
    this.setState({profile: profile});
  }

  render() {
    return (
      <div className="infoWrapper">
        <BasicInfo profile={this.state.profile}/>
        <OtherInfo />
      </div>
    );
  }
}

export default Profile;
