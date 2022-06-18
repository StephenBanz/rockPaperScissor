import React, { Component } from "react";
import {
  View,
  Text,
  Animated,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Easing,
  Image
} from "react-native";
import * as Progress from 'react-native-progress';
import Modal from "react-native-modal";


import UserHpAvatar from "./assets/images/user_hp_avatar";
import CpuHpAvatar from "./assets/images/cpu_hp_avatar";
import RockIcon from "./assets/images/rock_icon";
import PaperIcon from "./assets/images/paper_icon";
import ScissorsIcon from "./assets/images/scissors_icon";
import RandomIcon from "./assets/images/random_icon";
import { styles, buttonStyles, modalStyles } from "./Style"

export default class animations extends Component {
  // State変数の初期値
  state = {
    topHand: new Animated.Value(-100),
    bottomHand: new Animated.Value(100),
    userChoice: 'idle',
    cpuChoice: 'idle',
    cpuPoints: 0,
    userPoints: 0,
    winner: ''
  };

  // 初期値れセットできるように別の変数に保存
  baseState = this.state

  // 画面起動に時実行される機能
  async componentDidMount(){
    this.startTopHandAnimation()
    this.startBottomHandAnimation()
  }

  // 画面がアップデートされたとき（画面内のStateがアップデートされた時実行される機能）
  async componentDidUpdate(){
    this.startTopHandAnimation()
    this.startBottomHandAnimation()
  
  }

  // 「手」のアニメーション用
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

  // 「手」のアニメーション用
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


  // ゲームリセット
  restartGame = () => {
    this.setState(this.baseState);
  }

  // そのラウンドの勝者返す
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


// ボタン押下
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
      userPoints+=1
      if (userPoints == 3) { winner = 'user'}
    } else if (roundWinner == 'cpu') {
      cpuPoints+=1
      if (cpuPoints == 3) { winner = 'cpu'}
    }
    
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

  // CPU手表示
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

  // Player手表示
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

  // CPU分表示
  renderCpu = () => {
    const topHandAnimatedStyles = {
      transform: [{ translateY: this.state.topHand }]
    };

    return(
      <>
        <View style={styles.playerContainer}>
          <CpuHpAvatar/><Text style={{fontSize: 40, fontWeight: 'bold', paddingLeft: 20}}>{this.state.cpuPoints}</Text>
        </View>
        <View style={[styles.subContainer]}>
          {/* CPU 手 */}
          <Animated.View style={[topHandAnimatedStyles,{flex: 1}]} >
          <Image source={this.CpuHand()} style={styles.hand}/>
          </Animated.View>
          {/* Player Progress Bar */}
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
        </View>
      </>
    )
  }

  // Player分表示
  renderPlayer = () => {
    const bottomHandAnimatedStyles = {
      transform: [{ translateY: this.state.bottomHand }]
    };

    return (
      <>
        {/* Player 画像 */}
        <View style={styles.playerContainer}>
          <UserHpAvatar/><Text style={{fontSize: 40, fontWeight: 'bold', paddingLeft: 20}}>{this.state.userPoints}</Text>
        </View>
        <View style={[styles.subContainer]}>
          {/* Player Progress Bar */}
          <View style={styles.progress}>
            <Progress.Bar 
              progress={(3 - this.state.cpuPoints) / 3} 
              width={150}
              height={8}
              color="#ffb24c"
              unfilledColor="#232586"
              borderWidth={0}
              style={styles.progessBar}
            />
          </View>
          <Animated.View style={[bottomHandAnimatedStyles,{ flex: 1, alignItems: 'flex-start', zIndex: 99}]} >
            {/*  Player 手 */}
          <Image source={this.UserHand()} style={styles.hand}/>
          </Animated.View>
        </View>
      </>
    )
  }

  // ボタン表示
  renderButtons = () => {
    return(
      <View style={{width: '100%', height: 170}}>
        <TouchableOpacity onPress={()=>this.onChoiceClick('rock')} style={buttonStyles.rockIcon}><RockIcon /></TouchableOpacity>
        <TouchableOpacity onPress={()=>this.onChoiceClick('paper')} style={buttonStyles.paperIcon}><PaperIcon/></TouchableOpacity>
        <TouchableOpacity onPress={()=>this.onChoiceClick('scissor')} style={buttonStyles.scissorsIcon}><ScissorsIcon/></TouchableOpacity>
        <TouchableOpacity onPress={()=>this.onChoiceClick('random')} style={buttonStyles.randomIcon}><RandomIcon/></TouchableOpacity>
      </View>
    )
  }

  // モーダル表示
  renderModal = () => {
    return(
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
    )
  }
  
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto"/>
        
        {/* ボタン表示 */}
        { this.renderCpu() }

        <View style={{height: 50}}></View>

        {/* ボタン表示 */}
        { this.renderPlayer() }

        {/* ボタン表示 */}
        { this.renderButtons() }

        {/* ゲーム完了後出るモーダル */}
        { this.renderModal() }
      </SafeAreaView>      
    );
  }
}