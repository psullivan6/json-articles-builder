import React from 'react';
import { format } from 'date-fns';
import { useAppContext } from '../../utilities/AppContext';
import { parseDate } from '../../utilities/date';
import { getMappedStories } from '../../utilities/misc';
import styles from './styles.module.css';

const PreviewItem = ({ publishDate, title, description, url }) => {
  return (
    // eslint-disable-next-line react/jsx-no-target-blank
    <a className={styles.PreviewItem} href={url} target="_blank">
      <header>
        <h1>{title}</h1>
        <span>{format(parseDate(publishDate), 'MM/dd/yy')}</span>
      </header>
      <p>{description}</p>
    </a>
  );
};

const AdditionalInfo = ({ expirationDate, ...props }) => {
  const failedKeys = Object.keys(props).filter((key) => !props[key]);

  if (!expirationDate && failedKeys.length === 0) {
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
    <div className={styles.AdditionalInfo}>
      <h1>Additional Info:</h1>
      {expirationDate && (
        <p>{`Expiration Date: ${format(
          parseDate(expirationDate),
          'MM/dd/yy'
        )}`}</p>
      )}
      {failedKeys.length > 0 && (
        <p>
          <span role="img" aria-label="Warning">
            ⚠️
          </span>{' '}
          {` Oops, you forgot the ${missingKeys()}`}
        </p>
      )}
    </div>
  );
};

const ArticlesPreviewPage = () => {
  const { stories } = useAppContext();
  const mappedStories = getMappedStories(stories);

  return (
    <div className={styles.StoriesPreview}>
      <h1>Stories Preview</h1>
      <h2>Current Stories:</h2>
      {mappedStories
        .filter((story) => story.status === 'active')
        .map((story) => (
          <div className={styles.PreviewContainer} key={story.id}>
            <PreviewItem {...story} />
            <AdditionalInfo {...story} />
          </div>
        ))}
      <br />
      <hr />
      <br />
      <h2>Expired Stories:</h2>
      {mappedStories
        .filter((story) => story.status === 'expired')
        .map((story) => (
          <div className={styles.PreviewContainer} key={story.id}>
            <PreviewItem {...story} />
            <AdditionalInfo {...story} />
          </div>
        ))}
      <br />
      <hr />
      <br />
      <h2>Future Stories:</h2>
      {mappedStories
        .filter((story) => story.status === 'future')
        .map((story) => (
          <div className={styles.PreviewContainer} key={story.id}>
            <PreviewItem {...story} />
            <AdditionalInfo {...story} />
          </div>
        ))}
    </div>
  );
};

export default ArticlesPreviewPage;
