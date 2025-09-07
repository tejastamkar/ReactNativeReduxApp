#!/bin/bash

echo "🚀 Testing Deep Links for ReactNativeReduxApp..."
echo "Make sure Android emulator is running and app is installed!"
echo ""

# Function to test a deep link
test_deep_link() {
    local url=$1
    local description=$2
    
    echo "Testing: $description"
    echo "URL: $url"
    
    adb shell am start -W -a android.intent.action.VIEW -d "$url" com.reactnativereduxapp
    
    if [ $? -eq 0 ]; then
        echo "Success: $description"
    else
        echo "Failed: $description"
    fi
    
    echo ""
    sleep 3
}

# Test all deep links
test_deep_link "myapp://user/1" "User Details (ID: 1)"


echo "🎉 Deep link testing complete!"
echo ""
echo "💡 Tips:"
echo "- If any tests failed, make sure the app is installed and running"
echo "- Check that the Android emulator is connected: 'adb devices'"
echo "- For iOS testing, use: xcrun simctl openurl booted 'myapp://user/1'"
