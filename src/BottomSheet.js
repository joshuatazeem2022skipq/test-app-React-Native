import React, {useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, Animated, StyleSheet} from 'react-native';

const BottomSheet = ({lines, isExpanded, onToggle}) => {
  const height = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.timing(height, {
      toValue: isExpanded ? 300 : 100,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isExpanded]);

  return (
    <Animated.View style={[styles.bottomSheet, {height}]}>
      {lines.slice(0, isExpanded ? lines.length : 3).map((line, index) => (
        <Text key={index} style={styles.lineText}>
          {line}
        </Text>
      ))}
      <TouchableOpacity onPress={onToggle}>
        <Text style={styles.toggleText}>
          {isExpanded ? 'Collapse' : 'Expand'}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: '#00C4CC',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 0,
  },
  lineText: {
    color: '#FFF',
    marginBottom: 10,
  },
  toggleText: {
    color: '#FFF',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default BottomSheet;
