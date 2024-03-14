import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

console.log({
  file: __filename,
  function: 'ReactDOM.createRoot',
  guid: 'de8a6f0f-8a1f-44c2-88a8-694c99506a2a'
});
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
console.log({
  file: __filename,
  function: 'ReactDOM.createRoot',
  guid: '66883f26-eb81-4214-abbd-4fb36e188ee2',
  root
});
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
console.log({
  file: __filename,
  function: 'root.render called',
  guid: 'bd85e089-23d3-43eb-b901-33b13ce1415a'
});
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
