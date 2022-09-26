package com.reactnativedjimobilesdk
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.reactnativedjimobilesdk.djiVideo.DJIVideoManager


class DJIMobileSdkPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): MutableList<NativeModule> {
        return listOf(
          DJISDKManagerWrapper(reactContext),
          DJISDKAircraftWrapper(reactContext),
          ReactEventEmitter(reactContext),
        ).toMutableList()
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
      return listOf(
        DJIVideoManager(reactContext),
      )
    }
}
