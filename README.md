# **react-native-dji-mobile-sdk [WIP]**
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

## **Usage**

You can check the `/example` folder for a use of the package.

### **API refs**
```js
TODO
```

### **Components**

### Render the video of the drone:
```tsx
<DJIVideoView
  style={{
    flex: 1,
    aspectRatio: 16 / 9,
    maxHeight: '100%',
    maxWidth: '100%',
  }}
/>
```

## Known issues

Video view is not working well on x86 phones [dji issue](https://developer.dji.com/document/122b5969-d64d-4752-8452-400c41240aa5)

> Mobile SDK 4.7 and later versions are incompatible with x86 devices: Since v4.7, Mobile SDK has included FFMpeg lib to provide the transcoded video feed, but FFMpeg x86 so files will lead to the runtime crash when the target API of APP is larger than 23(included).



## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
