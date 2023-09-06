import React, { Component } from 'react';

class VRButton extends Component {
  constructor(props) {
    super(props);

    this.handleEnterVR = this.handleEnterVR.bind(this);
    this.def
  }

  def(){
    if ('getVRDisplays' in navigator) {
      navigator.getVRDisplays().then(function (displays) {
        if (displays.length > 0) {
          // WebVR is supported, and at least one VR display is available
          // You can proceed with WebVR code here
        } else {
          // WebVR is supported, but no VR displays are available
          // Provide a fallback experience or a message to the user
          console.error('No VR displays available.');
        }
      });
    } else {
      // WebVR is not supported
      // Provide a fallback experience or a message to the user
      console.error('WebVR is not supported in this browser.');
    }
    
    if ('xr' in navigator) {
      // WebXR is supported
      // Proceed with XR code here
      console.log('WebXR is supported & Proceed with XR code here')
    } else {
      console.error('WebXR is not supported in this browser.');
    }
  }

  handleEnterVR() {
    // Check if the WebVR or WebXR API is available in the browser

    if (navigator.xr) {
      navigator.xr.requestDevice().then((device) => {
        // Request VR or AR session
        device.requestSession({ immersive: true }).then((session) => {
          // Enter VR mode
          session.end().then(() => {
            console.log('VR session ended.');
          });
        });
      });
    } else {
      console.error('WebXR or WebVR not supported in this browser.');
    }
  }

  render() {
    return (
      <button onClick={this.handleEnterVR} style={{'font': '10px'}}>Enter VR</button>
    );
  }
}

export default VRButton;
