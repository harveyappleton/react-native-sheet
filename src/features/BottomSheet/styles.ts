import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'transparent',
    ...(Platform.OS === 'web'
      ? ({
          cursor: 'default',
          position: 'static',
          'z-index': 9999,
          top: 0,
          left: 0,
          width: '100vw',
          display: 'block',
          height: '100vh',
          flex: 'none'
        } as any)
      : {})
  },
  container: {
    width: '100%',
    height: 0,
    overflow: 'hidden',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    ...(Platform.OS === 'web'
      ? {
          width: 'calc(100% - 20px)',
          'box-sizing': 'content-box',
          position: 'absolute',
          bottom: 0,
          marginHorizontal: 10
        }
      : {})
  },
  draggableContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  draggableIcon: {
    width: 40,
    height: 6,
    borderRadius: 3,
    margin: 10,
    marginBottom: 0
  }
});
