import React, { useState } from 'react';
import './App.css';
import StripeSampleFooter from './StripeSampleFooter';
import TopNavigationBar from './TopNavigationBar';
import { Redirect } from 'react-router-dom';

function Login(props) {
  const [email, setEmail] = useState('');
  const [customer, setCustomer] = useState(null);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    return fetch('/create-customer', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((result) => {
        console.log(result);
        setCustomer(result);
      });
  };

  if (customer) {
    return (
      <Redirect
        to={{
          pathname: '/prices',
          state: { customer: customer },
        }}
      />
    );
  } else {
    return (
      <div>
        <div className="antialiased p-6">
          <TopNavigationBar loggedIn={false} />
          <div className="flex justify-center">
            <div className="w-full max-w-sm m-6">
              <div className="pasha-image-stack">
                <img
                  src="logo.png"
                  alt="Australain Sports Capoeira Federation"
                  width="140"
                  height="140"
                />
                <img
                  src="/ASCF_Music_Comp_2020.png"
                  alt="picsum generated"
                  width="140"
                  height="160"
                />
                <img
                  src="/ASCF_Solo_Comp_2020_2.png"
                  alt="picsum generated"
                  width="140"
                  height="160"
                />
                
              </div>
              <div className="font-semibold text-xl mb-4">
                Australian Sports Capoeira Federation
              </div>

              <form id="signup-form" onSubmit={handleSubmit}>
                <div className="w-full mb-2">
                  <input
                    className="appearance-none border-2 border-gray-200 rounded-md w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pasha"
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    required
                  />
                </div>

                <button
                  id="email-submit"
                  className="w-full bg-blue-600 hover:bg-blue-200 hover:shadow-outline rounded-md hover:text-blue-600 hover:border hover:border-black focus:shadow-outline text-white focus:bg-white focus:text-pasha font-light py-2 px-4 rounded"
                  type="submit"
                >
                  <div id="loading" className="hidden">
                    Signing up...
                  </div>
                  <span id="button-text">Sign up</span>
                </button>
              </form>
            </div>
          </div>
        </div>
        <StripeSampleFooter />
      </div>
    );
  }
}

export default Login;
