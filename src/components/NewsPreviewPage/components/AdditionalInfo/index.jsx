import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import { parseDate } from '../../../../utilities/date';

import styles from './styles.module.css';

const AdditionalInfo = ({ expirationDate, status, ...props }) => {
  const failedKeys = Object.keys(props).filter((key) => {
    if (key === 'category' || key === 'order') {
      return false;
    }

    return !props[key];
  });

  if (!expirationDate && failedKeys.length === 0 && status === 'active') {
    return null;
  }

  const missingKeys = () => {
    if (failedKeys.length > 1) {
      const last = failedKeys.pop();
      return `${failedKeys.join(', ')} and ${last}`;
    }

    return failedKeys[0];
  };

  return (
    <div className={`${styles.Container} ${props.className}`}>
      <h1>Additional Info:</h1>
      {status !== 'active' && <p>Status: {status}</p>}

      {expirationDate && (
        <p>{`Expiration Date: ${format(
          parseDate(expirationDate),
          'MM/dd/yy'
        )}`}</p>
      )}
      {failedKeys.length > 0 && (
        <>
          <p>
            <span role="img" aria-label="Warning">
              ⚠️
            </span>{' '}
            {` Oops, you forgot the ${missingKeys()}`}
          </p>
          <Link to="/news-editor">Go Back to edit it</Link>
        </>
      )}
    </div>
  );
};

export default AdditionalInfo;
