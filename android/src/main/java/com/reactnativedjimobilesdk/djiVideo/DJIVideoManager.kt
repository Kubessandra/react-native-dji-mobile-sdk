package com.reactnativedjimobilesdk.djiVideo

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext

class DJIVideoManager(
  private val callerContext : ReactApplicationContext
) : SimpleViewManager<DJIVideoView>() {

  override fun getName(): String {
    return "DJIVideoView"
  }

  override fun createViewInstance(context: ThemedReactContext) = DJIVideoView(context, callerContext)
}
