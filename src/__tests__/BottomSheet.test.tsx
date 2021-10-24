import React, { createRef } from 'react';
import { Text } from 'react-native';
import { waitFor, act, render, fireEvent } from '@testing-library/react-native';
import { BottomSheet, BottomSheetRef } from '../features/BottomSheet';

describe('BottomSheet', () => {
  it('should open a bottom sheet and display content', () => {
    const ref = createRef<BottomSheetRef>();
    const { queryByTestId, getByTestId, getByText, queryByText } = render(
      <BottomSheet ref={ref} height={400}>
        <Text testID='sheet-content'>Test text</Text>
      </BottomSheet>
    );
    expect(queryByTestId('sheet-content')).toBeFalsy();
    expect(queryByText('Test text')).toBeFalsy();
    act(() => {
      ref.current?.show();
    });

    expect(getByText('Test text')).toBeTruthy();
    expect(getByTestId('sheet-content')).toBeTruthy();
  });

  it('should close a bottom sheet remove content', async () => {
    const ref = createRef<BottomSheetRef>();
    const { queryByText, queryByTestId, getByTestId, getByText } = render(
      <BottomSheet ref={ref} height={400}>
        <Text testID='sheet-content'>Test text</Text>
      </BottomSheet>
    );
    act(() => {
      ref.current?.show();
    });

    expect(getByText('Test text')).toBeTruthy();
    expect(getByTestId('sheet-content')).toBeTruthy();

    act(() => {
      ref.current?.hide();
    });

    await waitFor(() => {
      expect(queryByText('Test text')).toBeFalsy();
      expect(queryByTestId('sheet-content')).toBeFalsy();
    });
  });

  it('should close sheet on tapping on backdrop', async () => {
    const ref = createRef<BottomSheetRef>();
    const { queryByText, queryByTestId, getByTestId, getByText } = render(
      <BottomSheet ref={ref} height={400} backdropClosesSheet>
        <Text testID='sheet-content'>Test text</Text>
      </BottomSheet>
    );
    act(() => {
      ref.current?.show();
    });

    expect(getByText('Test text')).toBeTruthy();
    expect(getByTestId('sheet-content')).toBeTruthy();

    fireEvent.press(getByTestId('backdrop'));

    await waitFor(() => {
      expect(queryByText('Test text')).toBeFalsy();
      expect(queryByTestId('sheet-content')).toBeFalsy();
    });
  });

  it('should not close sheet on tapping on backdrop if backdropClosesSheet prop passed as false', async () => {
    const ref = createRef<BottomSheetRef>();
    const { getByTestId, getByText } = render(
      <BottomSheet ref={ref} height={400} backdropClosesSheet={false}>
        <Text testID='sheet-content'>Test text</Text>
      </BottomSheet>
    );
    act(() => {
      ref.current?.show();
    });

    expect(getByText('Test text')).toBeTruthy();
    expect(getByTestId('sheet-content')).toBeTruthy();

    fireEvent.press(getByTestId('backdrop'));

    expect(getByText('Test text')).toBeTruthy();
    expect(getByTestId('sheet-content')).toBeTruthy();
  });

  it('should show drag icon', () => {
    const ref = createRef<BottomSheetRef>();
    const { getByTestId } = render(
      <BottomSheet ref={ref} height={400}>
        <Text testID='sheet-content'>Test text</Text>
      </BottomSheet>
    );
    act(() => {
      ref.current?.show();
    });

    expect(getByTestId('drag-icon')).toBeTruthy();
  });

  it('should not show drag icon if sheet is not draggable', () => {
    const ref = createRef<BottomSheetRef>();
    const { queryByTestId } = render(
      <BottomSheet ref={ref} height={400} draggable={false}>
        <Text testID='sheet-content'>Test text</Text>
      </BottomSheet>
    );
    act(() => {
      ref.current?.show();
    });

    expect(queryByTestId('drag-icon')).toBeFalsy();
  });

  it('should not show drag icon if showDragIcon prop passed as false', () => {
    const ref = createRef<BottomSheetRef>();
    const { queryByTestId } = render(
      <BottomSheet ref={ref} height={400} showDragIcon={false}>
        <Text testID='sheet-content'>Test text</Text>
      </BottomSheet>
    );
    act(() => {
      ref.current?.show();
    });

    expect(queryByTestId('drag-icon')).toBeFalsy();
  });

  it('should call open callbacks', async () => {
    const onOpenStart = jest.fn();
    const onOpenFinish = jest.fn();
    const ref = createRef<BottomSheetRef>();
    render(
      <BottomSheet ref={ref} height={400} onOpenStart={onOpenStart} onOpenFinish={onOpenFinish}>
        <Text testID='sheet-content'>Test text</Text>
      </BottomSheet>
    );

    expect(onOpenStart).toHaveBeenCalledTimes(0);
    expect(onOpenFinish).toHaveBeenCalledTimes(0);

    act(() => {
      ref.current?.show();
    });

    expect(onOpenStart).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(onOpenFinish).toHaveBeenCalledTimes(1));
  });

  it('should call finish callbacks', async () => {
    const onCloseStart = jest.fn();
    const onCloseFinish = jest.fn();
    const ref = createRef<BottomSheetRef>();
    render(
      <BottomSheet ref={ref} height={400} onCloseStart={onCloseStart} onCloseFinish={onCloseFinish}>
        <Text testID='sheet-content'>Test text</Text>
      </BottomSheet>
    );
    act(() => {
      ref.current?.show();
    });

    expect(onCloseStart).toHaveBeenCalledTimes(0);
    expect(onCloseFinish).toHaveBeenCalledTimes(0);

    act(() => {
      ref.current?.hide();
    });

    expect(onCloseStart).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(onCloseFinish).toHaveBeenCalledTimes(1));
  });
});
