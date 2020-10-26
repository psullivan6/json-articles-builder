import React from 'react';
import { format } from 'date-fns';
import { parseDate } from '../../../../utilities/date';
import AdditionalInfo from '../AdditionalInfo';

import styles from './styles.module.css';

const MoreStoriesPreview = (props) => {
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
      {/* eslint-disable-next-line react/jsx-no-target-blank */}
      <a className={styles.Content} href={url} target="_blank">
        <p className={styles.details}>
          <span>{category && `${category} \u00b7 `}</span>
          <span>{format(parseDate(publishDate), 'MM/dd/yy')}</span>
        </p>
        <div className={styles.Box}>
          <h1>{title}</h1>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.ImageContainer}>
          <img src={image} alt="More Stories FPO" />
        </div>
      </a>
      <AdditionalInfo className={styles.AdditionalInfo} {...props} />
    </div>
  );
};

export default MoreStoriesPreview;
