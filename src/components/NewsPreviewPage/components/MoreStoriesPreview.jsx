import React from 'react';
import { format } from 'date-fns';
import { parseDate } from '../../../utilities/date';

import styles from '../styles.module.css';

const MoreStoriesPreview = ({
  category,
  description,
  image,
  publishDate,
  title,
  url,
  ...props
}) => {
  return (
    // eslint-disable-next-line react/jsx-no-target-blank
    <a
      className={`${styles.PreviewItem} ${styles.TopHeadline}`}
      href={url}
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
  );
};

export default MoreStoriesPreview;
