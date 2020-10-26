import React from 'react';
import { format } from 'date-fns';
import { parseDate } from '../../../../utilities/date';
import AdditionalInfo from '../AdditionalInfo';

import styles from './styles.module.css';

const EvergreenStoriesPreview = (props) => {
  const { category, description, publishDate, title, url } = props;

  return (
    <div className={styles.Container}>
      {/* eslint-disable-next-line react/jsx-no-target-blank */}
      <a className={styles.Content} href={url} target="_blank">
        <p className={styles.details}>
          <span>{category && `${category} \u00b7 `}</span>
          <span>{format(parseDate(publishDate), 'MM/dd/yy')}</span>
        </p>
        <h1>{title}</h1>
        <p className={styles.description}>{description}</p>
      </a>
      <AdditionalInfo {...props} />
    </div>
  );
};

export default EvergreenStoriesPreview;
