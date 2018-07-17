import React from 'react';
import {Button, View} from 'react-native'
import {Firebase} from './lib/firebase'
import { getGoals } from './actions'
import { connect } from 'react-redux'

class Home extends React.Component {
  static navigationOptions  = ({navigation}) => ({
         title: navigation.state.params && navigation.state.params.title
  });

  constructor(props) {
    super(props);
    this.props.navigation.setParams({title: Firebase.auth().currentUser.email});

    this.navigateToSplashScreen = this.navigateToSplashScreen.bind(this);
  }

  navigateToSplashScreen(){
        this.props.navigation.navigate('Loading')
  }

  logout(navigation){
    Firebase.auth().signOut().then(this.navigateToSplashScreen, function(error) {
    });
  }

  componentDidMount() {
    
    this.fetchGoals()
  }

  fetchGoals = () => {
    return this.props.getGoals()
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setError(err);
      });
  }

  addGoal(){

  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
      <Button
        title="Add a daily goal"
        onPress={this.addGoal}
      />
    {

      //   this.props.goals ? (
      //   this.props.goals.map( (g, index) => {
      //     return (
      //       <View key={index}>
      //           <Text>{g.name}</Text>
      //       </View>
      //     )
      //   }
      //   )
      // ) : null
    }

    <Button title="log out"
      onPress={this.logout}/>
    </View>
    );
  }
}

const mapStateToProps = state => ({
    goals: state
});

const mapDispatchToProps = {
    getGoals
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
