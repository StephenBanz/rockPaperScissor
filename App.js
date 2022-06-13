import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Animated,
  SafeAreaView,
  TouchableOpacity,
  Easing,
  Text,
} from "react-native";
import * as Progress from 'react-native-progress';


import FemaleIdle from "./assets/img/female_idle.svg";
import FemalePaper from "./assets/img/female_paper.svg";
import FemaleRock from "./assets/img/female_rock.svg";
import FemaleScissors from "./assets/img/female_scissors.svg";
import MalePaper from "./assets/img/male_paper.svg";
import MaleRock from "./assets/img/male_rock.svg";
import MaleScissors from "./assets/img/male_scissors.svg";
import MaleIdle from "./assets/img/male_idle.svg";
import UserHpAvatar from "./assets/img/user_hp_avatar.svg";
import CpuHpAvatar from "./assets/img/cpu_hp_avatar.svg";
import RockIcon from "./assets/img/rock_icon.svg";
import PaperIcon from "./assets/img/paper_icon.svg";
import ScissorsIcon from "./assets/img/scissors_icon.svg";
import RandomIcon from "./assets/img/random_icon.svg";

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
        return(<FemaleRock height={250}/>)
      case 'paper':
        return(<FemalePaper height={250}/>)
      case 'scissor':
        return(<FemaleScissors height={250}/>)
      default:
        return(<FemaleIdle height={250}/>) 
    }
  }

  UserHand = () => {
    switch(this.state.userChoice) {
      case 'rock':
        return(<MaleRock height={250} style={styles.bottomHand}/>)
      case 'paper':
        return(<MalePaper height={250} style={styles.bottomHand}/>)
      case 'scissor':
        return(<MaleScissors height={250} style={styles.bottomHand}/>)
      default:
        return(<MaleIdle height={250} style={styles.bottomHand}/>) 
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
        <View style={[styles.playerContainer,{backgroundColor: 'yellow'}]}>
          <Animated.View style={[topHandAnimatedStyles,{flex: 1}]} >
            {/* <UserHpAvatar/> */}
            {this.CpuHand()}
          </Animated.View>
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
        {/* <View style={styles.playerContainer}/> */}
        <View style={[styles.playerContainer,{backgroundColor: 'blue'}]}>
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
          <Animated.View style={[bottomHandAnimatedStyles,{ flex: 1, alignItems: 'flex-start'}]} >
            {this.UserHand()}
            {/* <CpuHpAvatar/> */}
          </Animated.View>
        </View>
        <View style={{width: '100%', height: 170}}>
          <TouchableOpacity onPress={()=>this.onChoiceClick('rock')} style={styles.rockIcon}><RockIcon /></TouchableOpacity>
          <TouchableOpacity onPress={()=>this.onChoiceClick('paper')} style={styles.paperIcon}><PaperIcon/></TouchableOpacity>
          <TouchableOpacity onPress={()=>this.onChoiceClick('scissor')} style={styles.scissorsIcon}><ScissorsIcon/></TouchableOpacity>
          <TouchableOpacity onPress={()=>this.onChoiceClick('random')} style={styles.randomIcon}><RandomIcon/></TouchableOpacity>
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
    // flexWrap: 'wrap'
  },
  bottomHand: {
    alignSelf: 'flex-end',
    marginTop: 'auto'
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