import React, { memo, useMemo, useState, useRef, useImperativeHandle, useCallback, forwardRef, ReactNode } from 'react';
import { Platform, View, Modal, TouchableOpacity, Animated, PanResponder, ViewStyle, useColorScheme } from 'react-native';
import { styles } from './styles';

export interface BottomSheetRef {
  show: () => void;
  hide: () => void;
}

export interface BottomSheetProps {
  children: ReactNode;
  height: number;
  colorScheme?: 'auto' | 'light' | 'dark' | undefined;
  backdropClosesSheet?: boolean | undefined;
  backdropBackgroundColor?: string | undefined;
  sheetBackgroundColor?: string | undefined;
  draggable?: boolean | undefined;
  showDragIcon?: boolean | undefined;
  dragIconColor?: string | undefined;
  dragIconStyle?: ViewStyle | undefined;
  contentContainerStyle?: ViewStyle | undefined;
  borderRadius?: number | undefined;
  openTime?: number | undefined;
  closeTime?: number | undefined;
  onOpenStart?: () => void;
  onOpenFinish?: () => void;
  onCloseStart?: () => void;
  onCloseFinish?: () => void;
}

export const BottomSheet = memo(
  forwardRef<BottomSheetRef, BottomSheetProps>((props, ref) => {
    const {
      height,
      colorScheme,
      backdropClosesSheet = true,
      backdropBackgroundColor,
      sheetBackgroundColor,
      draggable = true,
      showDragIcon = true,
      dragIconColor,
      dragIconStyle,
      borderRadius = 10,
      contentContainerStyle,
      onOpenStart,
      onOpenFinish,
      onCloseStart,
      onCloseFinish,
      openTime = 300,
      closeTime = 300,
      children
    } = props;

    const isDraggable = Platform.OS !== 'web' && !!draggable;
    const colorSchemeName = useColorScheme() || 'light';
    const isDarkMode = useMemo(() => {
      // Color Scheme from props passed as 'auto' or undefined
      if (colorScheme === 'auto' || !colorScheme) {
        // Then use OS hook result
        return colorSchemeName === 'dark';
      }
      // Otherwise return user choice
      return colorScheme === 'dark';
    }, [colorScheme, colorSchemeName]);
    const [visible, setVisible] = useState(false);
    const animatedHeight = useMemo(() => new Animated.Value(0), []);
    const pan = useMemo(() => new Animated.ValueXY(), []);

    const setModalVisibility = useCallback(
      (newVisible: boolean) => {
        // Open modal
        if (newVisible) {
          setVisible(true);
          if (typeof onOpenStart === 'function') onOpenStart();
          Animated.timing(animatedHeight, {
            toValue: height,
            duration: openTime,
            useNativeDriver: false
          }).start(() => {
            if (typeof onOpenFinish === 'function') onOpenFinish();
          });
          return;
        }

        // Close modal
        if (typeof onCloseStart === 'function') onCloseStart();
        Animated.timing(animatedHeight, {
          toValue: 0,
          duration: closeTime,
          useNativeDriver: false
        }).start(() => {
          pan.setValue({ x: 0, y: 0 });
          setVisible(false);
          if (typeof onCloseFinish === 'function') onCloseFinish();
        });
      },
      [animatedHeight, closeTime, height, onCloseFinish, onCloseStart, onOpenFinish, onOpenStart, openTime, pan]
    );

    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gestureState) => {
          if (gestureState.dy > 0) {
            Animated.event([null, { dy: pan.y }], {
              useNativeDriver: false
            })(e, gestureState);
          }
        },
        onPanResponderRelease: (_e, gestureState) => {
          const gestureLimitArea = height / 3;
          const gestureDistance = gestureState.dy;
          if (gestureDistance > gestureLimitArea) {
            setModalVisibility(false);
          } else {
            Animated.spring(pan, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: false
            }).start();
          }
        }
      })
    ).current;

    useImperativeHandle(ref, () => ({
      show: () => setModalVisibility(true),
      hide: () => setModalVisibility(false)
    }));

    if (!visible) return null;

    return (
      <Modal transparent visible={visible} onRequestClose={() => setModalVisibility(false)}>
        <View
          style={[
            styles.wrapper,
            {
              backgroundColor: backdropBackgroundColor || `#25252599`,
              minHeight: height
            }
          ]}
        >
          <TouchableOpacity testID='backdrop' disabled={!backdropClosesSheet} style={styles.backdrop} activeOpacity={1} onPress={() => setModalVisibility(false)} />
          <Animated.View
            {...(isDraggable && panResponder.panHandlers)}
            style={[
              {
                transform: pan.getTranslateTransform()
              },
              styles.container,
              {
                height: animatedHeight,
                borderTopRightRadius: borderRadius,
                borderTopLeftRadius: borderRadius,
                backgroundColor: sheetBackgroundColor || isDarkMode ? '#222222' : '#F3F3F3'
              }
            ]}
          >
            {isDraggable && showDragIcon && (
              <View style={styles.draggableContainer}>
                <View
                  testID='drag-icon'
                  style={[
                    styles.draggableIcon,
                    dragIconStyle,
                    {
                      backgroundColor: dragIconColor || isDarkMode ? '#444444' : '#A3A3A3'
                    }
                  ]}
                />
              </View>
            )}
            <View style={[{ height }, contentContainerStyle]}>{children}</View>
          </Animated.View>
        </View>
      </Modal>
    );
  })
);
