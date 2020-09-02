import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import {createBrowserHistory} from 'history';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-widgets/dist/css/react-widgets.css';
import 'semantic-ui-css/semantic.min.css'
import './app/layout/styles.css';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';
import ScrollToTop from './app/layout/ScrollToTop';
import dateFnsLocalizer from 'react-widgets-date-fns';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise =  loadStripe("pk_test_51H961DIHls7iQOHV2FLwRuMHdUvxVstlhJTavVSIxu088cnJy2SEiSbA3jjn8PHFlJbSuDA98c2nja5xgZrIho9R00aceLsEK0");

dateFnsLocalizer();

export const history = createBrowserHistory();

ReactDOM.render(
  
  <Router history={history}>
    <ScrollToTop>
      <Elements stripe={stripePromise}>
        <App>
        
        </App>
      </Elements>
    </ScrollToTop>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
