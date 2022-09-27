package com.reactnativedjimobilesdk.djiVideo

import android.graphics.SurfaceTexture
import android.util.Log
import android.view.TextureView
import android.view.View
import android.widget.RelativeLayout
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.ThemedReactContext
import dji.sdk.camera.VideoFeeder
import dji.sdk.codec.DJICodecManager

import com.reactnativedjimobilesdk.TAG
import com.reactnativedjimobilesdk.R
import com.secneo.sdk.Helper

class DJIVideoView(val ctx: ThemedReactContext, callerContext: ReactApplicationContext): RelativeLayout(ctx), TextureView.SurfaceTextureListener {

  init {
    Helper.install(ctx.currentActivity?.application)
    View.inflate(ctx, R.layout.video_layout, this)
    val droneVideo: TextureView = findViewById(R.id.video_previewer_surface);
    droneVideo.surfaceTextureListener = this;
    VideoFeeder.getInstance().primaryVideoFeed.addVideoDataListener { bytes: ByteArray, i: Int ->
      Log.v(TAG, "Receive data from video listener")
      if (mCodecManager == null) {
        Log.e(TAG, "No codec manager available")
      }
      mCodecManager?.sendDataToDecoder(bytes, i);
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
