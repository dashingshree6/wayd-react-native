
import React, {useState, createRef} from 'react';
import {
  Image,
  InteractionManager,
  StyleSheet,
  Switch,
  Text,
  View,
  TouchableOpacity,
  findNodeHandle,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';

const App = () => {
  const [showBlur, setShowBlur] = useState(true);
  const [viewRef, setViewRef] = useState(null);
  const [blurType, setBlurType] = useState('light');
  const backgroundImageRef = createRef();

  const tintColor = ['#ffffff', '#000000'];
  if (blurType === 'xlight') {
    tintColor.reverse();
  }

  const renderBlurView = () => {
    return (
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-end'
        }}>
        {viewRef && (
          <BlurView
            viewRef={viewRef}
            style={styles.blurViewStyle}
            blurRadius={1}
            blurType={blurType}
          
          />
        )}
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            paddingBottom: 32,
          }}>
          <Text
            style={[
              styles.textStyle,
              {color: tintColor[0]
            }]}>
              Blur component
          </Text>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
       
              setBlurType('xlight');
            }}>
            <Text
              style={[
                styles.textStyle,
                {color: tintColor[0]}
              ]}>
                xlight
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
            
              setBlurType('light');
            }}>
            <Text
              style={[
                styles.textStyle,
               {color: tintColor[0]}
              ]}>
                light
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
             
              setBlurType('dark');
            }}>
            <Text
              style={[
                styles.textStyle,
                {color: tintColor[0]}
              ]}>
                dark
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/site_banner_vertical.png',
        }}
        
        style={styles.imageStyle}
        ref={backgroundImageRef}
        onLoadEnd={() => {
     
          InteractionManager.runAfterInteractions(() => {
            setTimeout(() => {
              setViewRef(
                findNodeHandle(backgroundImageRef.current)
              );
            }, 500);
          });
        }}
      />
      {showBlur ? renderBlurView() : null}
      <View style={styles.blurToggleStyle}>
        <Text
          style={[
            styles.textStyle,
            {color: tintColor[0]}
          ]}>
            Show Blur Background
        </Text>
        <Text
          style={[
            styles.textStyle,
            {color: tintColor[0]}
          ]}>
            {showBlur ? 'Yes' : 'No'}
        </Text>
        <Switch
          onValueChange={
            (value) => setShowBlur(value)
          }
          value={showBlur}
        />
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  imageStyle: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    resizeMode: 'cover',
    width: null,
    height: null,
  },
  blurViewStyle: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  textStyle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: '#d0d0d0',
  },
  blurToggleStyle: {
    position: 'absolute',
    top: 30,
    alignItems: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: 'lightgreen',
    width: 300,
    marginLeft: 100,
    marginRight: 100,
    marginTop: 16,
  },
});