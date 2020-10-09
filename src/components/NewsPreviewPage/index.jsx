import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import _sortBy from 'lodash/sortBy';
import { useAppContext } from '../../utilities/AppContext';
import { parseDate } from '../../utilities/date';

// Components
import TopHeadlinePreview from './components/TopHeadlinePreview';

// Styles
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
  const failedKeys = Object.keys(props).filter((key) => {
    if (key === 'category') {
      return false;
    }

    return !props[key];
  });

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

const NewsPreviewPage = () => {
  const { stories } = useAppContext();
  const now = new Date().getTime();

  const topHeadlinesStories = _sortBy(
    stories.filter((story) => {
      return story.section === 'H';
    }),
    'order'
  );

  const futureStories = stories.filter((story) => {
    const publishUnix = new Date(story.publishDate).getTime();

    return publishUnix > now;
  });

  return (
    <div className={styles.StoriesPreview}>
      <h1>Stories Preview</h1>
      <h2>Top Headlines Stories:</h2>
      {topHeadlinesStories.map((story) => (
        <div className={styles.PreviewContainer} key={story.id}>
          <TopHeadlinePreview {...story} />
          <AdditionalInfo {...story} />
        </div>
      ))}
      <br />
      <hr />
      <br />
      <h2>Future Stories:</h2>
      {futureStories.map((story) => (
        <div className={styles.PreviewContainer} key={story.id}>
          <PreviewItem {...story} />
          <AdditionalInfo {...story} />
        </div>
      ))}
    </div>
  );
};

export default NewsPreviewPage;
