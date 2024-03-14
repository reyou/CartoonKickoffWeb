import './App.css';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { Fragment } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';

function App() {
  const { unityProvider, loadingProgression, isLoaded, requestFullscreen } =
    useUnityContext({
      loaderUrl: 'Build/WebGL.loader.js',
      dataUrl: 'Build/WebGL.data',
      frameworkUrl: 'Build/WebGL.framework.js',
      codeUrl: 'Build/WebGL.wasm'
    });

  // We'll use a state to store the device pixel ratio.
  const [devicePixelRatio, setDevicePixelRatio] = useState(
    window.devicePixelRatio
  );

  useEffect(
    function () {
      // A function which will update the device pixel ratio of the Unity
      // Application to match the device pixel ratio of the browser.
      const updateDevicePixelRatio = function () {
        setDevicePixelRatio(window.devicePixelRatio);
      };

      // A media matcher which watches for changes in the device pixel ratio.
      const mediaMatcher = window.matchMedia(
        `screen and (resolution: ${devicePixelRatio}dppx)`
      );
      // Adding an event listener to the media matcher which will update the
      // device pixel ratio of the Unity Application when the device pixel
      // ratio changes.
      mediaMatcher.addEventListener('change', updateDevicePixelRatio);
      return function () {
        // Removing the event listener when the component unmounts.
        mediaMatcher.removeEventListener('change', updateDevicePixelRatio);
      };
    },
    [devicePixelRatio]
  );

  function handleClick() {
    requestFullscreen(true);
  }

  return (
    <Fragment>
      {!isLoaded && (
        <p>Loading Application... {Math.round(loadingProgression * 100)}%</p>
      )}
      <Unity
        unityProvider={unityProvider}
        style={{
          visibility: isLoaded ? 'visible' : 'hidden',
          width: 800,
          height: 600
        }}
        devicePixelRatio={devicePixelRatio}
        className='my-unity-app'
      />
      <button onClick={handleClick}>Enter Fullscreen</button>
    </Fragment>
  );
}

export default App;
