import React from 'react';
import { format } from 'date-fns';
import { parseDate } from '../../../../utilities/date';
import AdditionalInfo from '../AdditionalInfo';

import styles from './styles.module.css';

const TopHeadlinePreview = (props) => {
  const {
    category,
    description,
    image,
    publishDate,
    status,
    title,
    url,
  } = props;

  return (
    <div className={`${styles.Container} ${styles[status]}`}>
      <a
        className={styles.Content}
        href={url}
        // eslint-disable-next-line react/jsx-no-target-blank
        target="_blank"
      >
        <div className={styles.ImageContainer}>
          <img src={image} alt="Preview" />
          <h1>{title}</h1>
        </div>
        <p className={styles.details}>
          <span>{category && `${category} \u00b7 `}</span>
          <span>{format(parseDate(publishDate), 'MM/dd/yy')}</span>
        </p>
        <p className={styles.description}>{description}</p>
      </a>
      <AdditionalInfo className={styles.AdditionalInfo} {...props} />
    </div>
  );
};

export default TopHeadlinePreview;
