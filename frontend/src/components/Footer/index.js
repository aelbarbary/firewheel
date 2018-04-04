import React, { Component } from 'react';
import './styles.sass';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <p className="has-link">
          Contact me <a target="blank" href="mailto:abdelrahman.elbarbary@gmail.com">Abdelrahman Elbarbary</a>
        </p>
      </footer>
    );
  }
}

export default Footer;
