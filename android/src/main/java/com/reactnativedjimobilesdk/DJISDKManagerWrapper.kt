package com.reactnativedjimobilesdk
import android.util.Log
import com.facebook.react.bridge.*
import dji.common.error.DJIError
import dji.common.error.DJISDKError
import dji.sdk.base.BaseComponent
import dji.sdk.base.BaseProduct
import dji.sdk.sdkmanager.DJISDKInitEvent
import dji.sdk.sdkmanager.DJISDKManager

const val TAG = "REACT-DJI"

class DJISDKManagerWrapper(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  val reactEventEmitter = ReactEventEmitter(reactContext)

  override fun getName(): String {
    return "DJISDKManagerWrapper"
  }

  @ReactMethod
  fun registerApp(promise: Promise) {
    // TODO Check if already registering an APP
    val sdkManager = DJISDKManager.getInstance()
    sdkManager.registerApp(reactApplicationContext,
      object: DJISDKManager.SDKManagerCallback {
        override fun onRegister(djiError: DJIError?) {
          if (djiError == DJISDKError.REGISTRATION_SUCCESS) {
            promise.resolve("[REACT-DJI] Registration Successful");
            sdkManager.startConnectionToProduct();
          } else {
            promise.reject(djiError.toString(), djiError?.description);
          }
        }

        override fun onProductDisconnect() {
          // TODO SEND EVENT TO REACT
          Log.i(TAG, "Product disconnected")
          reactEventEmitter.sendEvent(ReactEventEmitter.Event.PRODUCT_DISCONNECTED, null)
        }

        override fun onProductConnect(baseProduct: BaseProduct?) {
          // TODO SEND EVENT TO REACT
          Log.i(TAG, "Product connected")
          reactEventEmitter.sendEvent(ReactEventEmitter.Event.PRODUCT_CONNECTED, null)
        }

        override fun onComponentChange(
          componentKey: BaseProduct.ComponentKey?,
          oldComponent: BaseComponent?,
          newComponent: BaseComponent?
        ) {
          TODO("Not yet implemented")
        }

        override fun onInitProcess(djiSdkInitEvent: DJISDKInitEvent?, process: Int) {
          TODO("Not yet implemented")
        }

        override fun onDatabaseDownloadProgress(p0: Long, p1: Long) {
          TODO("Not yet implemented")
        }
      })
  }

  @ReactMethod
  fun multiply(a: Int, b: Int, promise: Promise) {
    promise.resolve(a * b)
  }
}
