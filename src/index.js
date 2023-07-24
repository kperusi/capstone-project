import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/store/store';
import { GoogleAuthProvider } from 'firebase/auth';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <GoogleAuthProvider clientId='184263212137-esc6546e7uu9oh3g93tfpiqrfb03vfkv.apps.googleusercontent.com' > */}

       <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
    {/* </GoogleAuthProvider> */}
   
  </React.StrictMode>
);


