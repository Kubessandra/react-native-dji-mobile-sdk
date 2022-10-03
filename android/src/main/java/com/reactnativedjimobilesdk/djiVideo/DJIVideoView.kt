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
    Log.v(TAG, "Receive data from video listener")
    if (mCodecManager == null) {
      Log.e(TAG, "No codec manager available")
    }
    val params = Arguments.createMap().apply {
      val encodedString = Base64.encodeToString(bytes, 0, size, Base64.NO_WRAP)
      val id = UUID.randomUUID().toString()
      putString("bufferString", encodedString)
      putInt("size", size)
    }
    reactEventEmitter.sendEvent(ReactEventEmitter.Event.NEW_VIDEO_FRAME, params);
    mCodecManager?.sendDataToDecoder(bytes, size);
  }

  init {
    Helper.install(ctx.currentActivity?.application)
    View.inflate(ctx, R.layout.video_layout, this)
    val droneVideo: TextureView = findViewById(R.id.video_previewer_surface);
    droneVideo.surfaceTextureListener = this;
    if (listenerSetup == false) {
      listenerSetup = true
      Log.d(TAG, "Setup listener for video data")
      VideoFeeder.getInstance().primaryVideoFeed.addVideoDataListener(videoDataListener)
    } else {
      Log.v(TAG, "Listener already setup for video data")
    }
  }

  private var mCodecManager: DJICodecManager? = null;

  override fun onSurfaceTextureAvailable(surface: SurfaceTexture, width: Int, height: Int) {
    if (mCodecManager == null) {
      Log.v(TAG, "Create DJI Codec")
      mCodecManager = DJICodecManager(ctx, surface, width, height);
    }
  }

  override fun onSurfaceTextureSizeChanged(surface: SurfaceTexture, width: Int, height: Int) {
    this.mCodecManager?.cleanSurface();
    this.mCodecManager = DJICodecManager(ctx, surface, width, height);
  }

  override fun onSurfaceTextureDestroyed(surface: SurfaceTexture): Boolean {
    mCodecManager?.destroyCodec();
    mCodecManager = null;
    return false;
  }

  override fun onSurfaceTextureUpdated(surface: SurfaceTexture) {
  }

  override fun onDetachedFromWindow() {
    super.onDetachedFromWindow();
    VideoFeeder.getInstance().primaryVideoFeed.destroy();
    mCodecManager?.destroyCodec();
  }
}
