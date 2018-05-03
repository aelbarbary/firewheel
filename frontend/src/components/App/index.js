import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Header from '../Header/index';
import Footer from '../Footer/index';
import './styles.sass';
import '../../styles/animation.sass';

import { withRouter } from 'react-router';
import { Switch, Route} from 'react-router-dom'

import Main from '../Main/index';
import Profile from '../Profile/index';
import Login from '../Login/index';
import Trades from '../Trades/index';
import ItemPage from '../ItemPage/index';
import MyItems from '../MyItems/index';
import ErrorPage from '../ErrorPage/index';



class App extends Component {
  render() {

    return (
      <div className="wrapper">
        <Header />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/item/:id" component={ItemPage} />
          <Route path="/profile" component={Profile} />
          <Route path="/login" component={Login} />
          <Route path="/trades" component={Trades} />
          <Route path="/myItems" component={MyItems} />
          <Route path="*" component={ErrorPage} />
        </Switch>

        <Footer />

      </div>
      // <div className="wrapper">
      //   <Header />
      //   <ReactCSSTransitionGroup
      //     transitionName="content"
      //     transitionEnterTimeout={500}
      //     transitionLeaveTimeout={300}>
      //     <div key={this.props.location.pathname}>
      //       {this.props.children}
      //       <Footer />
      //     </div>
      //   </ReactCSSTransitionGroup>
      // </div>
      // <div>
      //   <Header />
      // </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  location: PropTypes.object.isRequired
};

export default withRouter(App);
