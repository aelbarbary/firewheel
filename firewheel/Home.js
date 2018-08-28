import React from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl, Image, TouchableHighlight} from 'react-native'
import { Button, Card, ListItem, Icon } from 'react-native-elements'
import {Firebase} from './lib/firebase'
import { fetchHabitsFromStore, addHabitToStore } from './actions'
import { connect } from 'react-redux'
import Modal from "react-native-modal";
import t from 'tcomb-form-native';
import Habit  from './Habit'
import Images from './img/index';

const Form = t.form.Form;

const HabitModel = t.struct({
  name: t.String,
  time: t.Number
});

class Home extends React.Component {
  state = {
    modalVisible: false,
    isEditing: false,
    refreshing: false,
  };

  static navigationOptions  = ({navigation}) => ({
         title: navigation.state.params && navigation.state.params.title,
         header: null
  });

  constructor(props) {
    super(props);
    this.props.navigation.setParams({title: Firebase.auth().currentUser.email});
    this.navigateToSplashScreen = this.navigateToSplashScreen.bind(this);
  }

  navigateToSplashScreen(){
        this.props.navigation.navigate('Loading');

  }

  logout(){
    Firebase.auth().signOut().then(this.navigateToSplashScreen, function(error) {
    });
  }

  componentDidMount(){
    this.props.getHabits()
  }

  addHabit(){
    const value = this._form.getValue();
    if (value) {
      this.props.addHabit(value.name, value.time)
      this.setModalVisible(!this.state.modalVisible);
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  onRefresh = () => {
    this.setState({refreshing: true});
    this.props.getHabits()
  }

  render() {
    const { navigate } = this.props.navigation;
    const { habits } = this.props.habits;
    var doneTime = 0;
    var allTime = 0;
    habits.forEach(function(ele){
      doneTime += ele.totalTime;
      allTime += ele.time;
    });

    var progress = Math.round((doneTime / allTime) * 5);

    return (
      <View style={{flex:1}}>

          <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Form type={HabitModel} ref={ c => this._form = c }/>
              <Button
                onPress={() => {
                  this.addHabit();
                }}
                title='Save'
                style={styles.button}>
              </Button>

              <Button
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
                title='Cancel'
                style={styles.button}>
              </Button>
            </View>
          </View>
        </Modal>

          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={ progress >= 5 ? Images.image5 :
                          progress == 4 ? Images.image4  :
                          progress == 3 ? Images.image3  :
                          progress ==  2 ? Images.image2 :
                          progress ==  1 ? Images.image1 :
                          Images.image0}/>
                <Text style={styles.userInfo}> {Firebase.auth().currentUser.email} </Text>

                <View style={{flexDirection: 'row'}}>
                <Button title="Add a habit" onPress={() => {
                                                          this.setState({isEditing: false});
                                                           this.setModalVisible(true);
                                                         }} buttonStyle={styles.newButton}>
                </Button>
                <Button onPress={()=> this.props.navigation.navigate('History', {habits: habits})}
                  title="History" buttonStyle={styles.historyButton}>
                </Button>
                </View>
              </View>
          </View>

          <View style={styles.body}>
            <View style={{flex:1, flexDirection: 'column', justifyContent:'space-between'}}>
             <ScrollView style={{margin:0, padding:0}}>
                 {
                   habits.length ? (
                     habits.map((habit, i) => {
                       return <Habit key={habit.key} habit={habit} style={styles.habit} navigation={this.props.navigation}/>
                     })
                   ) : null
                 }
               </ScrollView>
           </View>

          </View>

          <View style={styles.footer}>

            <TouchableHighlight onPress={() => this.logout()}>
              <Icon
                name='exit-to-app'
              />
            </TouchableHighlight>

            <TouchableHighlight onPress={() => this.props.navigation.navigate('Stats', { habits: habits }) } >
              <Icon
                name='timeline'
              />
            </TouchableHighlight>

          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    margin: 0
  },
  header:{
    backgroundColor: "#DCDCDC",
    paddingTop: 10,
    flex: 2,
    flexDirection: 'column',
  },
  headerContent:{
    padding:5,
    alignItems: 'center',

  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "white",
    marginBottom:5,
  },
  name:{
    fontSize:22,
    color:"#000000",
    fontWeight:'600',
  },
  userInfo:{
    fontSize:16,
    color:"#778899",
    fontWeight:'600',
    marginBottom: 5
  },
  body:{
    flex:8,
    backgroundColor: "#778899",
    alignItems:'center',
    paddingBottom: 20,
    margin:0,
    padding: 0
  },
  habit:{
    margin: 0,
    padding:0
  },
  item:{
    flexDirection : 'row',
  },
  infoContent:{
    flex:1,
    alignItems:'flex-start',
    paddingLeft:5
  },
  iconContent:{
    flex:1,
    alignItems:'flex-end',
    paddingRight:5,
  },
  icon:{
    width:30,
    height:30,
    marginTop:20,
  },
  info:{
    fontSize:18,
    marginTop:20,
    color: "#FFFFFF",
  },
  footer:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white'
  },
  historyButton:{
    backgroundColor: 'orange',
    width:150
  },
  newButton:{
    backgroundColor: 'green',
    width:150
  }

});

function mapStateToProps (state) {
  return {
    habits: state.habits
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getHabits: () => dispatch(fetchHabitsFromStore()),
    addHabit: (name, time) => dispatch(addHabitToStore(name, time)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
