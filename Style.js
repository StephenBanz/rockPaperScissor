import {
  StyleSheet,
  Platform, 
  StatusBar
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'android' ? StatusBar.currentHeight : 0
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
    borderRadius: 10
  },
  progress: {
    flex: 1,
    alignSelf: 'center',
  },
  progessBar: {
    transform: [{ rotate: '270deg'}]
  }
});

const buttonStyles = StyleSheet.create({
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

export { styles, buttonStyles, modalStyles }