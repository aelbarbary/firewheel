import React, {Component} from 'react';

class Background extends Component{
  constructor() {
    super();
    this.state = {
      pictures: []
    };
  }

  componentDidMount() {
    fetch ('https://randomuser.me/api?results=100')
    .then(results => {
      return results.json();
    }).then(data=> {
      let pictures = data.results.map((pic) => {
        return(
          <div key={pic.results}>
            <img src={pic.picture.medium}/>
          </div>
        );
      });
      this.setState ({ pictures: pictures});
      // console.log("state", this.state.pictures);
    });
  }

  render() {
    return (
      <div className="container2">
        <div className="container1">
          {this.state.pictures}
        </div>
      </div>
    );
  }
}

export default Background;
