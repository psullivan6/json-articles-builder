import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../../utilities/AppContext';
import Salutation from '../../Salutation';
import '../styles.css';

const WelcomeHasData = () => {
  const { contentType } = useAppContext();

  const handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <Salutation />
      <h2>
        It looks like you have some content from last time. Would you like to
        &hellip;
      </h2>
      <div className="ButtonGroup">
        <Link className="Button" to={`${contentType}-editor`}>
          Edit the Existing Stories
        </Link>
        <span>,</span>
        <Link className="Button" to={`${contentType}-preview`}>
          Preview the Existing Stories
        </Link>
      </div>
      <br />
      <div className="ButtonGroup">
        <span>OR</span>
        <button onClick={handleReset}>Start From Scratch</button>
      </div>
    </>
  );
};

export default WelcomeHasData;
