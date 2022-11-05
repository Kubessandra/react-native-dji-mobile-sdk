package com.reactnativedjimobilesdk.djiVideo

import android.graphics.SurfaceTexture
import android.util.Base64
import android.util.Log
import android.view.TextureView
import android.view.View
import android.widget.RelativeLayout
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ThemedReactContext
import dji.sdk.camera.VideoFeeder
import dji.sdk.codec.DJICodecManager

import com.reactnativedjimobilesdk.TAG
import com.reactnativedjimobilesdk.R
import com.reactnativedjimobilesdk.ReactEventEmitter
import com.secneo.sdk.Helper
import java.util.*

class DJIVideoView(private val ctx: ThemedReactContext, callerContext: ReactApplicationContext): RelativeLayout(ctx), TextureView.SurfaceTextureListener {
  companion object {
    private var listenerSetup = false;
  }

  private val reactEventEmitter = ReactEventEmitter(callerContext);
  private val videoDataListener = VideoFeeder.VideoDataListener { bytes: ByteArray, size: Int ->
    if (mCodecManager == null) {
      Log.e(TAG, "No codec manager available")
    }
    val params = Arguments.createMap().apply {
      val encodedString = Base64.encodeToString(bytes, 0, size, Base64.NO_WRAP)
      putString("bufferString", encodedString)
      putInt("size", size)
    }
    reactEventEmitter.sendEvent(ReactEventEmitter.Event.NEW_VIDEO_FRAME, params);
    mCodecManager?.sendDataToDecoder(bytes, size);
  }

  init {
    Log.d(TAG, "Init DJIVideoView")
    Helper.install(ctx.currentActivity?.application)
    View.inflate(ctx, R.layout.video_layout, this)
    val droneVideo: TextureView = findViewById(R.id.video_previewer_surface);
    droneVideo.surfaceTextureListener = this;
    if (!listenerSetup) {
      listenerSetup = true
      Log.d(TAG, "Setup listener for video data")
      VideoFeeder.getInstance().primaryVideoFeed.addVideoDataListener(videoDataListener)
    } else {
      Log.d(TAG, "Listener already setup for video data")
    }
  }

  private var mCodecManager: DJICodecManager? = null;

  override fun onSurfaceTextureAvailable(surface: SurfaceTexture, width: Int, height: Int) {
    Log.d(TAG, "Surface texture available")
    if (mCodecManager == null) {
      Log.d(TAG, "Create DJI Codec")
      mCodecManager = DJICodecManager(ctx, surface, width, height);
    }
  }

  override fun onSurfaceTextureSizeChanged(surface: SurfaceTexture, width: Int, height: Int) {
    Log.d(TAG, "Surface texture size change")
    mCodecManager?.cleanSurface();
    mCodecManager?.destroyCodec();
    mCodecManager = DJICodecManager(ctx, surface, width, height);
  }

  override fun onSurfaceTextureDestroyed(surface: SurfaceTexture): Boolean {
    Log.d(TAG, "Surface texture destroyed")
    mCodecManager?.destroyCodec();
    mCodecManager = null;
    return false;
  }

  override fun onSurfaceTextureUpdated(surface: SurfaceTexture) {
  }

  override fun onDetachedFromWindow() {
    Log.d(TAG, "onDetachedFromWindow")
    super.onDetachedFromWindow();
    VideoFeeder.getInstance().primaryVideoFeed.destroy();
    listenerSetup = false;
    mCodecManager?.destroyCodec();
  }
}
