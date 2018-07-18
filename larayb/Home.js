import React from 'react';
import {Button, View, TouchableHighlight, Text} from 'react-native'
import {Firebase} from './lib/firebase'
import { fetchGoalsFromAPI } from './actions'
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

  componentDidMount(){
    this.props.getGoals()
  }

  render() {
    const { navigate } = this.props.navigation;
    const { goals, isFetching } = this.props.goals;
    console.log(goals);
    return (
      <View>

    <Button title="log out"
      onPress={this.logout}/>

      {
        isFetching && <Text>Loading</Text>
      }
      {

        goals.length ? (
          goals.map((person, i) => {
            return <View key={i} >
              <Text>Name: {person.name}</Text>
            </View>
          })
        ) : null
      }
  </View>
    );
  }
}

function mapStateToProps (state) {
  return {
    goals: state.goals
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getGoals: () => dispatch(fetchGoalsFromAPI())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
