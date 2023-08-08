import React from 'react';
import Test from './Test';
import './style.css';

const SingTest = () => {
  // This function will be called after the component has been rendered in the DOM.
  React.useEffect(() => {
    const appContainer = document.querySelector('#Singtest');
    const test = new Test(appContainer);
  }, []); // The empty dependency array ensures this effect runs once after the initial render.

  return (
    <div id='Singtest'>
      {/* Your component's JSX content here */}
    </div>
  );
}

export default SingTest;
