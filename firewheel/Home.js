import React from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl, Image, TouchableHighlight, TextInput} from 'react-native'
import { Button, Card, ListItem, Icon, FormLabel } from 'react-native-elements'
import {Firebase} from './lib/firebase'
import { fetchHabitsFromStore, addHabitToStore, addCommentToStore } from './actions'
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
    commentModalVisible: false,
    dailyComment: ''
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

  addComment(){
    if (this.state.dailyComment) {
      this.props.addComment(this.state.dailyComment);
      this.setState({commentModalVisible: false});
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  onRefresh = () => {
    this.setState({refreshing: true});
    this.props.getHabits()
  }

  formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
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

    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var today = new Date()
    var day = days[today.getDay()];
    var todayStr = this.formatDate(today);

    return (
      <View style={{justifyContent: 'space-between', flex: 1}}>

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
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Button
                      onPress={() => {
                        this.addHabit();
                      }}
                      title='Save'
                      style={styles.button}
                      backgroundColor='green'>
                    </Button>

                    <Button
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}
                      title='Cancel'
                      style={styles.button}
                      backgroundColor='red'>
                    </Button>
                  </View>
                </View>
              </View>
            </Modal>

          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.commentModalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}>
            <View style={{marginTop: 22}}>
              <View>
                <FormLabel>Daily Comment</FormLabel>
                <TextInput
                  style={styles.textArea}
                  underlineColorAndroid="transparent"
                  placeholder="Type something"
                  placeholderTextColor="grey"
                  numberOfLines={10}
                  multiline={true}
                  onChangeText={(value) => this.setState({ dailyComment: value })}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Button
                    onPress={() => {
                      this.addComment();
                    }}
                    title='Save'
                    style={styles.button}
                    backgroundColor='green'>
                  </Button>

                  <Button
                    onPress={() => {
                      this.setState({commentModalVisible: false});
                    }}
                    title='Cancel'
                    style={styles.button}
                    backgroundColor='red'>
                  </Button>
                </View>
              </View>
            </View>
          </Modal>

          <View style={styles.header}>

            <View style={styles.headerSub}>
              <Icon name='time-slot' type='entypo' color='#f50'/>
              <Text style={styles.headerSubFont}>{doneTime} min</Text>
            </View>
            <View style={styles.headerMain}>
                <Image style={styles.avatar}
                  source={ progress >= 5 ? Images.image5 :
                          progress == 4 ? Images.image4  :
                          progress == 3 ? Images.image3  :
                          progress ==  2 ? Images.image2 :
                          progress ==  1 ? Images.image1 :
                          Images.image0 }/>
                <Text style={styles.userInfo}> {Firebase.auth().currentUser.email} </Text>
              </View>
              <View style={styles.headerSub}>
                <Icon name='calendar' type='entypo' color='#00aced'/>
                <Text style={styles.headerSubFont}>{day}</Text>
                <Text style={styles.headerSubFont}>{todayStr}</Text>
              </View>
          </View>

          <View style={styles.body}>
            <View style={{flex:1, flexDirection: 'column', justifyContent:'space-between'}}>
             <ScrollView style={{margin:0, padding:0}}

               refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                  />
                }>
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

            <TouchableHighlight onPress={() => {
                                                      this.setState({isEditing: false});
                                                       this.setModalVisible(true);
                                                     }}>
              <Icon
                name='add'
              />
            </TouchableHighlight>

            <TouchableHighlight onPress={()=> this.props.navigation.navigate('MonthlyHistory', {habits: habits})}>
              <Icon
                name='history'
              />
            </TouchableHighlight>


            <TouchableHighlight onPress={() => this.props.navigation.navigate('Stats', { habits: habits }) } >
              <Icon
                name='timeline'
              />
            </TouchableHighlight>

            <TouchableHighlight onPress={() => this.setState({commentModalVisible: true}) } >
              <Icon
                name='comment'
              />
            </TouchableHighlight>

          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button:{
    width: 100,
  },
  container:{
    margin: 0
  },
  header:{

    paddingTop: 15,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent:'space-between',

  },
  headerMain:{
    alignItems: 'center',
  },
  headerSub:{
    height: 100,
    width: 100,
    alignItems:'center',
    justifyContent:'center',
    padding: 5
  },
  headerSubFont:{
    fontSize: 10,
    fontWeight: 'bold',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 0,
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
    flex:1,
    backgroundColor: "#FFFFFF",
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
    margin: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,

  },
  historyButton:{
    backgroundColor: 'orange',
    width:150
  },
  newButton:{
    backgroundColor: 'green',
    width:150
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: "gray",
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
    addComment: (comment) => dispatch(addCommentToStore(comment)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
