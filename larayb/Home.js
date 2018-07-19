import React from 'react';
import {Button, View, TouchableHighlight, Text} from 'react-native'
import {Firebase} from './lib/firebase'
import { fetchGoalsFromAPI, addHabitToFirebase } from './actions'
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

  addHabit(){
    this.props.addHabit()
    console.log("calling add habit");
  }

  render() {
    const { navigate } = this.props.navigation;
    const { goals, isFetching } = this.props.goals;
    
    return (
      <View>

    <Button title="log out"
      onPress={this.logout}/>
    <Button title="Add a habit"
        onPress={() =>  this.addHabit() }/>
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
    getGoals: () => dispatch(fetchGoalsFromAPI()),
    addHabit: () => dispatch(addHabitToFirebase())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
