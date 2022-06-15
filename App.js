import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Platform, 
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Easing,
  Image
} from "react-native";
import * as Progress from 'react-native-progress';
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
export default class animations extends Component {
  state = {
    topHand: new Animated.Value(-100),
    bottomHand: new Animated.Value(100),
    userChoice: 'idle',
    cpuChoice: 'idle',
    cpuPoints: 1,
    userPoints: 1,
    winner: ''
  };
  

  async componentDidMount(){
    this.startTopHandAnimation()
    this.startBottomHandAnimation()
  }

  async componentDidUpdate(){
    console.log("--")
    console.log(this.state.winner)
    this.startTopHandAnimation()
    this.startBottomHandAnimation()
  
  }

  startTopHandAnimation = () => {
    Animated.timing(this.state.topHand, {
      toValue: 20,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.back(5),
      // easing: Easing.bounce
      // easing: Easing.elastic(3)
      // easing: Easing.bezier(.06,1,.86,.23)
    }).start();
  };

  startBottomHandAnimation = () => {
    Animated.timing(this.state.bottomHand, {
      toValue: 20,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.back(5),
      // easing: Easing.bounce
      // easing: Easing.elastic(3)
      // easing: Easing.bezier(.06,1,.86,.23)
    }).start();
  };

  onChoiceClick = userChoice => {
    const choices = ['rock', 'paper', 'scissor'];
    let cpuPoints = this.state.cpuPoints
    let userPoints = this.state.userPoints
    let winner = ''

    const cpuChoice = choices[Math.floor(Math.random() * choices.length)];

    if (userChoice == 'random') {
      userChoice = choices[Math.floor(Math.random() * choices.length)];
    }

    const roundWinner = this.decideRoundWinner(userChoice, cpuChoice)
    if (roundWinner == 'user') {
      cpuPoints = (cpuPoints*10 - 2)/10
      if (cpuPoints <= 0) { winner = 'user'}
    } else if (roundWinner == 'cpu') {
      userPoints = (userPoints*10 - 2)/10
      if (userPoints <= 0) { winner = 'cpu'}
    }
    console.log(roundWinner)
    console.log(cpuPoints)
    console.log(userPoints)
    console.log(winner)
    
    this.setState({
      topHand: new Animated.Value(-100), 
      bottomHand: new Animated.Value(100),
      userChoice: userChoice, 
      cpuChoice: cpuChoice,
      cpuPoints: cpuPoints,
      userPoints: userPoints,
      winner: winner
    })
  }

  decideRoundWinner = (userChoice, cpuChoice) => {
    switch(userChoice) {
      case 'rock':
        switch(cpuChoice) {
          case 'paper':
            return 'cpu';
          case 'scissor':
            return 'user';
          default:
            return '';
        }
      case 'paper':
        switch(cpuChoice) {
          case 'rock':
            return 'user';
          case 'scissor':
            return 'cpu';
          default:
            return '';
        }
      case 'scissor':
        switch(cpuChoice) {
          case 'rock':
            return 'cpu';
          case 'paper':
            return 'user';
          default:
            return '';
        }
      default:
        return '';
    }
  }

  CpuHand = () => {
    switch(this.state.cpuChoice) {
      case 'rock':
        return(require('./assets/images/female_rock.png'))
      case 'paper':
        return(require('./assets/images/female_paper.png'))
      case 'scissor':
        return(require('./assets/images/female_scissors.png'))
      default:
        return(require('./assets/images/female_idle.png'))
    }
  }

  UserHand = () => {
    switch(this.state.userChoice) {
      case 'rock':
        return(require('./assets/images/male_rock.png'))
      case 'paper':
        return(require('./assets/images/male_paper.png'))
      case 'scissor':
        return(require('./assets/images/male_scissors.png'))
      default:
        return(require('./assets/images/male_idle.png'))
    }
  }

  render() {
    const topHandAnimatedStyles = {
      transform: [{ translateY: this.state.topHand }],
    };

    const bottomHandAnimatedStyles = {
      transform: [{ translateY: this.state.bottomHand }],
    };
    return this.state.winner == '' ? (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto"/>
        <View style={[styles.playerContainer,{backgroundColor: ''}]}>
          <Animated.View style={[topHandAnimatedStyles,{flex: 1}]} >
          <Image source={this.CpuHand()} style={styles.bottomHand}/>
          </Animated.View>

          <Image source={require('./assets/images/cpu_hp_avatar.png')}/>
          <View style={styles.progress}>
            
            <Progress.Bar 
              progress={this.state.cpuPoints} 
              width={150}
              height={8}
              color="#ffb24c"
              unfilledColor="#232586"
              borderWidth={0}
              style={styles.progessBar}
            />
          </View>
        </View>
        <View style={[styles.playerContainer,{backgroundColor: ''}]}>
          <View style={styles.progress}>
            <Progress.Bar 
              progress={this.state.userPoints} 
              width={150}
              height={8}
              color="#ffb24c"
              unfilledColor="#232586"
              borderWidth={0}
              style={styles.progessBar}
            />
          </View>

          <Image source={require('./assets/images/user_hp_avatar.png')}/>

          <Animated.View style={[bottomHandAnimatedStyles,{ flex: 1, alignItems: 'flex-start', zIndex: 99}]} >
          <Image source={this.UserHand()} style={styles.bottomHand}/>
          </Animated.View>
        </View>
        <View style={{width: '100%', height: 170}}>
          <TouchableOpacity onPress={()=>this.onChoiceClick('rock')} style={styles.rockIcon}>
            <Image source={require('./assets/images/rock_icon.png')}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.onChoiceClick('paper')} style={styles.paperIcon}>
            <Image source={require('./assets/images/paper_icon.png')}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.onChoiceClick('scissor')} style={styles.scissorsIcon}>
            <Image source={require('./assets/images/scissors_icon.png')}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.onChoiceClick('random')} style={styles.randomIcon}>
            <Image source={require('./assets/images/random_icon.png')}/>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    ) : (
      <SafeAreaView style={styles.container}><Text>{this.state.winner} win</Text></SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    // flexWrap: 'wrap'
  },
  bottomHand: {
    alignSelf: 'center',
    height: 250, 
    resizeMode: 'contain'
  },
  playerContainer: {
    flex:1,
    flexDirection: 'row',
    width: '100%'
    // // justifyContent: 'space-between',
   
  },
  progress: {
    flex: 1,
    alignSelf: 'center',
  },
  progessBar: {
    transform: [{ rotate: '270deg'}]
  },
  rockIcon: {
    position: 'absolute',
    bottom: 0,
    left: '10%',
    marginBottom: 30
  },
  paperIcon: {
    position: 'absolute',
    bottom: 0,
    left: '40%',
    marginBottom: 80
  },
  scissorsIcon: {
    position: 'absolute',
    bottom: 0,
    left: '70%',
    marginBottom: 30
  },
  randomIcon: {
    position: 'absolute',
    bottom: -75,
    left: '37%'
  }

});