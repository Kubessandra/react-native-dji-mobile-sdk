package com.reactnativedjimobilesdk

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import dji.common.error.DJIError
import dji.common.util.CommonCallbacks
import dji.sdk.products.Aircraft
import dji.sdk.sdkmanager.DJISDKManager

class DJISDKAircraftWrapper(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  override fun getName(): String {
    return "DJISDKAircraftWrapper"
  }

  private fun retrieveAircraft(): Aircraft {
    val sdkManager = DJISDKManager.getInstance()
    val product = sdkManager.product
    if (product is Aircraft) return product
    throw Exception("The product is not an Aircraft")
  }

  @ReactMethod
  fun getModel(promise: Promise) {
    try {
      val aircraft = retrieveAircraft()
      val model = aircraft.model
      promise.resolve(model.displayName)
    } catch (e: Exception) {
      promise.reject(e.toString(), e.message)
    }
  }

  @ReactMethod
  fun isDroneConnected(promise: Promise) {
    try {
      val aircraft = retrieveAircraft()
      promise.resolve(aircraft.isConnected)
    } catch (e: Exception) {
      promise.reject(e.toString(), e.message)
    }
  }

  @ReactMethod
  fun getSerialNumber(promise: Promise) {
    try {
      val aircraft = retrieveAircraft()
      aircraft.flightController.getSerialNumber(object: CommonCallbacks.CompletionCallbackWith<String> {
        override fun onSuccess(serial: String) {
          promise.resolve(serial)
        }

        override fun onFailure(error: DJIError?) {
          promise.reject(error.toString(), error?.description)
        }
      })
    } catch (e: Exception) {
      promise.reject(e.toString(), e.message)
    }
  }

  @ReactMethod
  fun startTakeOff(promise: Promise) {
    try {
      val aircraft = retrieveAircraft()
      aircraft.flightController.startTakeoff {
        if (it == null) {
          promise.resolve("Start Take off")
        } else {
          promise.reject(it.errorCode.toString(), it.description)
        }
      }
    } catch (e: Exception) {
      promise.reject(e.toString(), e.message)
    }
  }

  @ReactMethod
  fun startLanding(promise: Promise) {
    try {
      val aircraft = retrieveAircraft()
      aircraft.flightController.startLanding {
        if (it == null) {
          promise.resolve("Start Landing")
        } else {
          promise.reject(it.errorCode.toString(), it.description)
        }
      }
    } catch (e: Exception) {
      promise.reject(e.toString(), e.message)
    }
  }
}

