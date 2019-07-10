package com.blackridgesoftware.golfing;

import android.os.Bundle; // here

import android.content.Intent;
import com.facebook.react.ReactActivity;
import com.reactnativecomponent.splashscreen.RCTSplashScreen;    //import RCTSplashScreen

public class MainActivity extends ReactActivity {

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "GolfingExchange";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        RCTSplashScreen.openSplashScreen(this);   //open splashscreen
        //RCTSplashScreen.openSplashScreen(this, true, ImageView.ScaleType.FIT_XY);   //open splashscreen fullscreen
        super.onCreate(savedInstanceState);
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }
}
