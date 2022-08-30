# **react-native-dji-mobile-sdk**
Implementation of the dji mobile sdk for react native
## **Installation**

```sh
npm install react-native-dji-mobile-sdk
```

## **Android**

### **Specify your DJI API Key**

[How to generate your api key](https://developer.dji.com/document/2e5ae092-b0fa-4cbd-abe2-956f44253c12#generate-an-app-key)

Add your API key to your manifest file: `android/app/src/main/AndroidManifest.xml`:
```xml
<application>
   <!-- You will only need to add this meta-data tag, but make sure it's a child of application -->
   <meta-data
     android:name="com.dji.sdk.API_KEY"
     android:value="Your DJI API Key Here"/>
</application>
```

## Usage

```js
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
