import React, {useState, useRef} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

const Screen1 = () => {
  const [lines, setLines] = useState(3);
  const navigation = useNavigation();
  const headerHeight = useRef(new Animated.Value(470)).current;

  useFocusEffect(
    React.useCallback(() => {
      Animated.timing(headerHeight, {
        toValue: 470,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }, []),
  );

  const goToScreen2 = () => {
    if (lines > 3) {
      navigation.navigate('Screen2', {lines});
    } else {
      alert('Please enter a number greater than 3');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {/* Animated Header */}
        <Animated.View style={[styles.header, {height: headerHeight}]} />

        {/* Content with Title and Input */}
        <View style={styles.content}>
          <Text style={styles.screenTitle}>Screen 1</Text>
          <TextInput
            keyboardType="numeric"
            value={String(lines)}
            onChangeText={text => setLines(Number(text))}
            style={styles.input}
            placeholder="Enter a number"
            placeholderTextColor="#999"
          />
        </View>

        {/* Button to navigate to Screen 2 */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={goToScreen2}>
            <Text style={styles.buttonText}>Go to Screen 2</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#00C4CC',
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20, // Extra margin to prevent overlap with button
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    borderColor: '#ccc',
    width: '100%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
    margin: 0,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 30,
    backgroundColor: '#00C4CC',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Screen1;
