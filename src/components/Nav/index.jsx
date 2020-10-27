import React from 'react';
import { NavLink } from 'react-router-dom';
import _capitalize from 'lodash/capitalize';
import { useAppContext } from '../../utilities/AppContext';

// Styles
import './styles.css';

const Nav = () => {
  const { contentType } = useAppContext();
  return (
    <nav className="Nav">
      <ul>
        <li>
          <NavLink activeClassName="active" to="/" exact>
            {contentType ? 'Upload' : 'Welcome'}
          </NavLink>
        </li>
        {contentType && (
          <>
            <li>
              <NavLink activeClassName="active" to={`${contentType}-editor`}>
                {`${_capitalize(contentType)} Editor`}
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to={`${contentType}-preview`}>
                Preview
              </NavLink>
            </li>
          </>
        )}
      </ul>
      <p className="version">
        <span>Version</span>
        <code>{process.env.REACT_APP_GIT_SHA}</code>
      </p>
    </nav>
  );
};

export default Nav;
