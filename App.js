import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Image,
  TouchableWithoutFeedback,
  Easing,
} from "react-native";
import SvgUri from 'react-native-svg-uri';


import FemaleIdle from "./assets/img/female_idle.svg";
import FemalePaper from "./assets/img/female_paper.svg";
import FemaleRock from "./assets/img/female_rock.svg";
import FemaleScissors from "./assets/img/female_scissors.svg";
import MalePaper from "./assets/img/male_paper.svg";
import MaleRock from "./assets/img/male_rock.svg";
import MaleScissors from "./assets/img/male_scissors.svg";
import MaleIdle from "./assets/img/male_idle.svg";

export default class animations extends Component {
  state = {
    topHand: new Animated.Value(-250),
    bottomHand: new Animated.Value(900),
  };

  async componentDidMount(){
    this.startTopHandAnimation()
    this.startBottomHandAnimation()
  }

  startTopHandAnimation = () => {
    Animated.timing(this.state.topHand, {
      toValue: 50,
      duration: 500,
      useNativeDriver: true,
      // easing: Easing.back(5),
      // easing: Easing.bounce
      // easing: Easing.elastic(3)
      // easing: Easing.bezier(.06,1,.86,.23)
    }).start();
  };

  startBottomHandAnimation = () => {
    Animated.timing(this.state.bottomHand, {
      toValue: 350,
      duration: 500,
      useNativeDriver: true,
      // easing: Easing.back(5),
      // easing: Easing.bounce
      // easing: Easing.elastic(3)
      // easing: Easing.bezier(.06,1,.86,.23)
    }).start();
  };

  render() {
    const topHandAnimatedStyles = {
      transform: [{ translateY: this.state.topHand }],
    };

    const bottomHandAnimatedStyles = {
      transform: [{ translateY: this.state.bottomHand }],
    };
    return (
      <View style={styles.container}>
          <Animated.View style={topHandAnimatedStyles} >
          <FemaleIdle height={250}/>
          </Animated.View>
          <Animated.View style={bottomHandAnimatedStyles} >
            <MaleIdle height={250} style={styles.bottomHand}/>
          </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: "tomato",
  },
  bottomHand: {
    alignSelf: 'flex-end'
  }
});