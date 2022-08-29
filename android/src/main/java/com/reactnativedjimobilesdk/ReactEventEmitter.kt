package com.reactnativedjimobilesdk

import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule


class ReactEventEmitter(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  enum class Event(val eventName: String) {
    REGISTRATION_SUCCESS("REGISTRATION_SUCCESS"),
    PRODUCT_CONNECTED("PRODUCT_CONNECTED"),
    PRODUCT_DISCONNECTED("PRODUCT_DISCONNECTED");

    companion object {
      fun getKeysValueMap(): MutableMap<String, String> {
        return values().associate<Event, String, String> { it.name to it.eventName } as MutableMap
      }
    }
  }

  override fun getName(): String {
    return "ReactEventEmitter"
  }

  @ReactMethod
  fun addListener(eventName: String) {
    // Set up any upstream listeners or background tasks as necessary
  }

  @ReactMethod
  fun removeListeners(count: Int) {
    // Remove upstream listeners, stop unnecessary background tasks
  }

  fun sendEvent(reactEvent: Event, params: WritableMap?) {
    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit(reactEvent.eventName, params)
  }
}
