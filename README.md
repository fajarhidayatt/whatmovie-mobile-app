# WhatMovie App

![Preview](./preview.png)

## Description

WhatMovie App is the mobile application version of the [WhatMovie website](https://jarh-whatmovie.vercel.app/). This application is used to find information related to the movie you like and has several features such as search, favorites and detailed information of the movie and its cast. This application was built using Expo React Native.

## Data

Data in this application using APIs obtained from [themoviedb.org](https://www.themoviedb.org/documentation/api). To use this API, you need **apikey** which can be obtained directly from the website. You can register first at [themoviedb.org](https://www.themoviedb.org/documentation/api) to get apikey. After getting the apikey, you can enter the apikey in the `src\constants\url\index.js` file.

## Dependencies

This app is built with some additional packages:

- [x] [@react-navigation/drawer](https://reactnavigation.org/docs/drawer-navigator/)
- [x] [@react-native-async-storage/async-storage](https://www.npmjs.com/package/@react-native-async-storage/async-storage)
- [x] [axios](https://www.npmjs.com/package/axios)
- [x] [expo-linear-gradient](https://www.npmjs.com/package/expo-linear-gradient)
- [x] [react-native-progress](https://www.npmjs.com/package/react-native-progress)
- [x] [react-native-snap-carousel](https://www.npmjs.com/package/react-native-snap-carousel)
- [x] [react-native-svg](https://www.npmjs.com/package/react-native-svg)

## Development

If you want to try to do the development process, make sure you have setup [React Native](https://reactnative.dev/docs/environment-setup?guide=quickstart) on your device and downloaded [Expo](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US&pli=1) on your android.

You can download this repository by clicking `<> Code` at the top, then selecting `Download ZIP` or if you want to clone this repository you can do this by

```bash
git clone https://github.com/fajarhidayatt/whatmovie-mobile-app.git
```

After that, install all the packages / dependencies contained in this project

```bash
npm install
```

Then run the application

```bash
npm start
```

Open expo on your android, and scan the QR code that appears in your IDE terminal. or press `a` on your keyboard to open the app on your virtual device.
