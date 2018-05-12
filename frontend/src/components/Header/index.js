import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.sass';
// import logo from './../../assets/images/logo.png';

class Header extends Component {

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.previousWidth = 0;
    this.menuButton = (
      <button className="menuBtn"
        onClick={
          () => {
            document.querySelector(".menu").classList.toggle("open");
          }
        }
      >
        MENU
      </button>
    );

    this.loggedInMenu = (
      <div className="menu">
        <Link  key={1} to="/"  className="navLink">
          Home
        </Link>
        {/* <Link onlyActiveOnIndex={true} key={2} to="/profile" activeClassName="activeNavLink" className="navLink">
          Providers
        </Link> */}
        <Link  key={2} to="/myOffers"  className="navLink">
          My Offers
        </Link>
        <Link key={3} to="#" className="navLink" onClick={this.logout.bind(this)}>
          Logout
        </Link>
      </div>
    );

    this.loggedOutMenu = (
      <div className="menu loginMenu">
        <Link key={5} className="navLink" to="#" onClick={this.login.bind(this)} >
          LogIn / Sign Up
        </Link>
      </div>
    );

    this.setNav();
    this.setMenuState(window.innerWidth);
    this.previousWidth = window.innerWidth;

  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setMenuState(window.innerWidth);
    });
  }

  setMenuState(width) {
    if (this.previousWidth !== width) {
      if (width > 768) {
        const menu = document.querySelector('div.menu');
        if(menu) {
          menu.classList.remove("open");
        }
        this.setState({menuActive: false});
      } else {
        this.setState({menuActive: true});
      }
      this.previousWidth = width;
    }
  }

  setNav() {
    const { isAuthenticated } = this.props.auth;
    console.log(isAuthenticated());
    // check for auth here
    if (isAuthenticated()) {
      this.setState({ nav: this.loggedInMenu });
    } else {
      this.setState({ nav: this.loggedOutMenu });
    }
  }

  render() {



    return (
      <header className="header">
        <h1>
          {/* <img src={logo} width="200px"/> */}
          <Link to="/" className="logo">
            LARAYB
          </Link>
        </h1>
        {this.state.menuActive ? this.menuButton: ""}
        {this.state.nav}
      </header>
    );
  }
}

export default Header;
