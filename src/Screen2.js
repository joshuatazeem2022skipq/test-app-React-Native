import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Screen2 = () => {
  const route = useRoute();
  const {lines} = route.params; // Get the number of lines passed from Screen1
  const [isExpanded, setIsExpanded] = useState(false); // State for expansion
  const navigation = useNavigation();
  const headerHeight = useRef(new Animated.Value(300)).current;

  // Animating the header to shrink once the screen is opened
  useEffect(() => {
    Animated.timing(headerHeight, {
      toValue: 150, // Shrink the header height
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, []);

  // Dummy text lines for the bottom sheet
  const dummyText = Array.from(
    {length: lines},
    (_, i) => `${i + 1}. Lorem Ipsum text here.`,
  );

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <Animated.View style={[styles.header, {height: headerHeight}]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="cancel" size={24} color="black" />
        </TouchableOpacity>
      </Animated.View>

      <Text style={styles.screenTitle}>Screen 2</Text>

      {/* Bottom Sheet Component */}
      <BottomSheet
        lines={dummyText}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
      />
    </View>
  );
};

const BottomSheet = ({lines, isExpanded, onToggle}) => {
  const height = useRef(new Animated.Value(200)).current; // Initial height for collapsed

  // Animate the bottom sheet based on expansion state
  useEffect(() => {
    Animated.timing(height, {
      toValue: isExpanded ? 400 : 200, // Expand to 400, collapse to 200
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isExpanded]);

  return (
    <Animated.View style={[styles.bottomSheetContainer, {height}]}>
      <ScrollView
        showsVerticalScrollIndicator={false} // Scroll only if necessary
        style={styles.scrollView}>
        {/* Conditionally render up to 10 or 11 lines based on the state */}
        {lines.slice(0, isExpanded ? 11 : 10).map((line, index) => (
          <Text key={index} style={styles.lineText}>
            {line}
          </Text>
        ))}

        {/* Show remaining lines when expanded via scroll */}
        {isExpanded && lines.length > 11 && (
          <ScrollView>
            {lines.slice(11).map((line, index) => (
              <Text key={index + 11} style={styles.lineText}>
                {line}
              </Text>
            ))}
          </ScrollView>
        )}
      </ScrollView>

      {/* Toggle Button for Expand/Collapse */}
      <TouchableOpacity onPress={onToggle} style={styles.toggleButton}>
        <Text style={styles.toggleText}>
          {isExpanded ? 'Collapse' : 'Expand'}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#00C4CC',
    justifyContent: 'center',
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    paddingTop: Platform.OS === 'ios' ? 60 : 40, // Increased padding for safe area handling
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30, // Adjusted to be within a safe top margin
    left: 15,
    padding: 12, // Increased padding to make it more clickable
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 30, // Increased borderRadius to give a larger circular shape
    zIndex: 20, // Higher z-index to ensure it's above other elements
  },
  screenTitle: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  screenTitle1: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 5,
  },
  bottomSheetContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#00C4CC',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  scrollView: {
    flexGrow: 0,
  },
  lineText: {
    color: '#FFF',
    marginBottom: 10,
  },
  toggleButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
  },
  toggleText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Screen2;
