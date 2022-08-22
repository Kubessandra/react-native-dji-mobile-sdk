package com.reactnativedjimobilesdk

import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule


class ReactEventEmitter(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  enum class Event(val eventName: String) {
    PRODUCT_CONNECTED("PRODUCT_CONNECTED"),
    PRODUCT_DISCONNECTED("PRODUCT_DISCONNECTED"),
  }

  override fun getName(): String {
    return "ReactEventEmitter"
  }

  fun sendEvent(reactEvent: Event, params: WritableMap?) {
    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit(reactEvent.eventName, params)
  }
}
