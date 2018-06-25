import React, { Component } from 'react';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true
    };
  }

  render() {
    let Splash_Screen = (

            <View style={styles.SplashScreen_RootView}>

                <View style={styles.SplashScreen_ChildView}>

                    {/* Put all your components Image and Text here inside Child view which you want to show in Splash Screen. */}

                    <Image source={{uri: 'https://reactnativecode.com/wp-content/uploads/2018/01/welcome.png'}}
                    style={{width:'100%', height: '100%', resizeMode: 'contain'}} />

                </View>


                <TouchableOpacity
                  activeOpacity = { 0.5 }
                  style={styles.TouchableOpacity_Style}
                  onPress={this.Hide_Splash_Screen} >

                    <Image source={{uri: 'https://reactnativecode.com/wp-content/uploads/2018/01/close_button.png'}}
                    style={{width:25, height: 25}} />

                </TouchableOpacity>


            </View> )

        return(

            <View style = { styles.MainContainer }>

                <Text style={{textAlign: 'center'}}> Hello Guys </Text>

                {
                  (this.state.isVisible === true) ? Splash_Screen : null
                }


            </View>

        );
  }

  hideSplashScreen(){
    this.setState({
      isVisible : false

    });
  }

  componentDidMount() {
    var that = this;

    setTimeout(function(){
        that.hideSplashScreen();
      }, 5000);
  }

}

export default Splash;
