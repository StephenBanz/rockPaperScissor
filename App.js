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
  Image,
  Button
} from "react-native";
import * as Progress from 'react-native-progress';
import Modal from "react-native-modal";


import UserHpAvatar from "./assets/images/user_hp_avatar.svg";
import CpuHpAvatar from "./assets/images/cpu_hp_avatar.svg";
import RockIcon from "./assets/images/rock_icon.svg";
import PaperIcon from "./assets/images/paper_icon.svg";
import ScissorsIcon from "./assets/images/scissors_icon.svg";
import RandomIcon from "./assets/images/random_icon.svg";

export default class animations extends Component {
  state = {
    topHand: new Animated.Value(-100),
    bottomHand: new Animated.Value(100),
    userChoice: 'idle',
    cpuChoice: 'idle',
    cpuPoints: 0,
    userPoints: 0,
    winner: ''
  };
  
  baseState = this.state

  async componentDidMount(){
    this.startTopHandAnimation()
    this.startBottomHandAnimation()
  }

  async componentDidUpdate(){
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
      cpuPoints+=1
      // cpuPoints = (cpuPoints*10 - 3)/10
      if (cpuPoints == 3) { winner = 'user'}
    } else if (roundWinner == 'cpu') {
      userPoints+=1
      if (userPoints == 3) { winner = 'cpu'}
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

  restartGame = () => {
    this.setState(this.baseState);
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
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto"/>
        <View style={styles.playerContainer}>
          <CpuHpAvatar/><Text style={{fontSize: 40, fontWeight: 'bold', paddingLeft: 20}}>{this.state.cpuPoints}</Text>
        </View>
        <View style={[styles.subContainer,{backgroundColor: ''}]}>
          <Animated.View style={[topHandAnimatedStyles,{flex: 1}]} >
          <Image source={this.CpuHand()} style={styles.hand}/>
          </Animated.View>
          
          <View style={styles.progress}>
            
            <Progress.Bar 
              progress={(3 - this.state.cpuPoints) / 3} 
              width={150}
              height={8}
              color="#ffb24c"
              unfilledColor="#232586"
              borderWidth={0}
              style={styles.progessBar}
            ></Progress.Bar>
          </View>
        </View>
        <View style={{height: 50}}></View>
        <View style={styles.playerContainer}>
          <UserHpAvatar/><Text style={{fontSize: 40, fontWeight: 'bold', paddingLeft: 20}}>{this.state.userPoints}</Text>
        </View>
        <View style={[styles.subContainer,{backgroundColor: ''}]}>
          <View style={styles.progress}>
            <Progress.Bar 
              progress={(3 - this.state.userPoints) / 3} 
              width={150}
              height={8}
              color="#ffb24c"
              unfilledColor="#232586"
              borderWidth={0}
              style={styles.progessBar}
            />
          </View>
          <Animated.View style={[bottomHandAnimatedStyles,{ flex: 1, alignItems: 'flex-start', zIndex: 99}]} >
          <Image source={this.UserHand()} style={styles.hand}/>
          </Animated.View>
        </View>
        <View style={{width: '100%', height: 170}}>
          <TouchableOpacity onPress={()=>this.onChoiceClick('rock')} style={styles.rockIcon}><RockIcon /></TouchableOpacity>
          <TouchableOpacity onPress={()=>this.onChoiceClick('paper')} style={styles.paperIcon}><PaperIcon/></TouchableOpacity>
          <TouchableOpacity onPress={()=>this.onChoiceClick('scissor')} style={styles.scissorsIcon}><ScissorsIcon/></TouchableOpacity>
          <TouchableOpacity onPress={()=>this.onChoiceClick('random')} style={styles.randomIcon}><RandomIcon/></TouchableOpacity>
        </View>

        {/* ゲーム完了後出るモーダル */}
        <Modal isVisible={this.state.winner != "" ? true : false}>
          <View style={modalStyles.content}>
            <Image 
              source={this.state.winner == 'user' ? require('./assets/images/result_user.png') : require('./assets/images/result_cpu.png')}
              style={{width: 150, resizeMode: 'contain'}}
            />
            <Text style={modalStyles.contentTitle}>YOU {this.state.winner == "user" ? 'WIN' : 'LOSE'}</Text>
            <TouchableOpacity onPress={this.restartGame}>
              <Image source={require('./assets/images/restart.png')} style={modalStyles.restartButton}/>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>      
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
  hand: {
    alignSelf: 'center',
    height: 200, 
    resizeMode: 'contain'
  },
  subContainer: {
    flex:1,
    flexDirection: 'row',
    width: '100%'
  },
  playerContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#232586",
    shadowRadius: 25,
    shadowOpacity: 1,
    elevation: 20,
    borderRadius: 10,
   
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
  },


});

const modalStyles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 20,
  },
  restartButton: {
    alignSelf: 'center',
    height: 150, 
    resizeMode: 'contain'
  }
})