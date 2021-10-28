import React, { useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, useColorScheme } from 'react-native';
import { BottomSheet, BottomSheetRef } from 'react-native-sheet';

export default function App() {
  const colorScheme = useColorScheme() || 'light';
  const isDarkMode = colorScheme === 'dark';
  const bottomSheet = useRef<BottomSheetRef>(null);
  const [height, setHeight] = useState(400);

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#0f0f0f' : '#ffffff' }]}>
      <BottomSheet height={height} ref={bottomSheet} contentContainerStyle={styles.bottomSheetContainer}>
        <Text style={{ color: isDarkMode ? '#ffffff' : '#222222' }}>Your content here</Text>
        <View>
          <TouchableOpacity style={styles.button} onPress={() => setHeight(currentHeight => (currentHeight === 400 ? 700 : 400))}>
            <Text style={styles.buttonText}>Change height</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => bottomSheet.current?.hide()}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
      <TouchableOpacity onPress={() => bottomSheet.current?.show()}>
        <Text style={{ color: isDarkMode ? '#ffffff' : '#222222' }}>Open Bottom Sheet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomSheetContainer: {
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#166fe5',
    marginBottom: 25,
    borderRadius: 8,
    maxWidth: 500
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center'
  }
});
