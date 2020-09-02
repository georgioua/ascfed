import React from 'react';
import './App.css';

function TopNavigationBar(props) {
  return (
    <nav className="flex items-center justify-between flex-wrap">
      <img src="logo.png" width="79" height="24" alt="Australain Sports Capoeira Federation"/>
        

      <div>
        <button
          className="bg-white hover:bg-white hover:shadow-outline hover: over:border hover:border-black focus:shadow-outline focus:bg-white focus:font-light py-2 px-4 rounded"
          type="button"
        >
          {props.loggedIn ? 'Sign out' : 'Sign in'}
        </button>
      </div>
    </nav>
  );
}

export default TopNavigationBar;
