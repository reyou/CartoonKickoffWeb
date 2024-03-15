import { Fragment } from 'react/jsx-runtime';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { useEffect, useState } from 'react';
import styles from './Play.module.css';

export default function Play() {
  // We'll use a state to store the device pixel ratio.
  const [devicePixelRatio, setDevicePixelRatio] = useState(
    window.devicePixelRatio
  );

  const { unityProvider, loadingProgression, isLoaded, requestFullscreen } =
    useUnityContext({
      loaderUrl: 'Build/WebGL.loader.js',
      dataUrl: 'Build/WebGL.data',
      frameworkUrl: 'Build/WebGL.framework.js',
      codeUrl: 'Build/WebGL.wasm'
    });

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
    <div className='container'>
      <div className='row'>
        <div className='col-lg d-flex justify-content-center align-items-center'>
          <Fragment>
            {!isLoaded && (
              <p>
                Loading Application... {Math.round(loadingProgression * 100)}%
              </p>
            )}
            <Unity
              unityProvider={unityProvider}
              devicePixelRatio={devicePixelRatio}
              className={`${styles.myUnityApp} ${
                isLoaded ? styles.myUnityAppLoaded : ''
              }`}
            />
          </Fragment>
        </div>
      </div>
      <div className='row'>
        <div className='col-lg d-flex justify-content-center align-items-center'>
          <button onClick={handleClick} className='btn btn-primary'>
            Enter Fullscreen
          </button>
        </div>
      </div>
    </div>
  );
}
