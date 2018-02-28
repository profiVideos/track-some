package com.tracksome;

/*import com.facebook.react.ReactActivity;*/
import android.view.View;
import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {
  @Override
  public View createSplashLayout() {
    return new View(this);   // <====== TO AVOID WHITE BACKGROUND
  }
}
