# React Native Sheet

[![npm](https://img.shields.io/badge/types-included-blue?style=flat-square)](https://www.npmjs.com/package/@harveyappleton/react-native-sheet) [![runs with expo](https://img.shields.io/badge/Runs%20with%20Expo-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.io/)

A cross platform, lightweight, pure JS implementation (no dependencies) of bottom sheets in React Native, written in TypeScript.

![React Native Sheet](./previews/ios.gif)
![React Native Sheet](./previews/android.gif)
![React Native Sheet](./previews/web.gif)

## Features

- :computer: :iphone: **Cross platform**: iOS, Android and Web!
- :no_entry_sign: **No dependencies**: Just requires React Native and React peer dependencies.
- :last_quarter_moon: **Light and Dark mode** supported by default, and responds to changes automatically.
- :arrow_up_down: **Draggable**: You can drag to close once you cross the close threshold, and a drag marker will show to indicate this.
- :round_pushpin: **Closeable using background**: By tapping on the background behind the sheet, the sheet will be closed.
- :arrow_backward: **Closeable using Android back button**: will automatically close the modal.
- :art: **Customisable and easy to style** with lots of prop options.
- :speech_balloon: **Callbacks galore**: Lots of easy to use callbacks, such as `onOpenStart` and `onOpenFinish`.
- :blue_book: **TypeScript** support - fully written in TypeScript.
- :white_check_mark: **Tested** using Jest.

## Like the library?

<a href="https://www.buymeacoffee.com/harveyappleton" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-red.png" alt="Buy Me A Coffee" height="34" ></a> or a beer! :beer:

## Installation

```sh
npm install react-native-sheet
```

or, if you use Yarn

```sh
yarn add react-native-sheet
```

## Usage

**TypeScript example**

```tsx
import { BottomSheet } from 'react-native-sheet';

// ...

export default function App() {
  const bottomSheet = useRef<BottomSheetRef>(null);

  return (
    <View>
      <BottomSheet height={400} ref={bottomSheet}>
        <Text>Your bottom sheet content goes here</Text>
      </BottomSheet>
      <TouchableOpacity onPress={() => bottomSheet.current?.show()}>
        <Text>Open bottom sheet</Text>
      </TouchableOpacity>
    </View>
  );
}
```

**JavaScript example**

```jsx
import { BottomSheet } from 'react-native-sheet';

// ...

export default function App() {
  const bottomSheet = useRef(null);

  return (
    <View>
      <BottomSheet height={400} ref={bottomSheet}>
        <Text>Your bottom sheet content goes here</Text>
      </BottomSheet>
      <TouchableOpacity onPress={() => bottomSheet.current.show()}>
        <Text>Open bottom sheet</Text>
      </TouchableOpacity>
    </View>
  );
}
```

## Example app

See the example folder for an example app.
Simply:

1. Open `example` folder in a terminal (eg `cd example`)
2. Run `yarn install` to install dependencies
3. Run `yarn start` to open Expo and from there, you can open the example app in iOS, Android and Web.

## Tests

Run `yarn test` to run all tests.

## Author

[Harvey Appleton](https://github.com/harveyappleton/)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

PRs are most welcome, with the requirement that they meet eslint, TypeScript and testing standards.
