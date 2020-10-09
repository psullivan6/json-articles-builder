import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useAppContext } from '../../utilities/AppContext';
import { parseDate } from '../../utilities/date';
import './styles.css';

const PreviewItem = ({ publishDate, title, description, url }) => {
  return (
    // eslint-disable-next-line react/jsx-no-target-blank
    <a className="PreviewItem" href={url} target="_blank">
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
    <div className="AdditionalInfo">
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

  const activeStories = stories.filter((story) => {
    const publishUnix = new Date(story.publishDate).getTime();

    return publishUnix <= now;
  });

  const futureStories = stories.filter((story) => {
    const publishUnix = new Date(story.publishDate).getTime();

    return publishUnix > now;
  });

  return (
    <div className="StoriesPreview">
      <h1>Stories Preview</h1>
      <h2>Current Stories:</h2>
      {activeStories.map((story) => (
        <div className="PreviewContainer">
          <PreviewItem key={story.id} {...story} />
          <AdditionalInfo {...story} />
        </div>
      ))}
      <br />
      <hr />
      <br />
      <h2>Future Stories:</h2>
      {futureStories.map((story) => (
        <div className="PreviewContainer">
          <PreviewItem key={story.id} {...story} />
          <AdditionalInfo {...story} />
        </div>
      ))}
    </div>
  );
};

export default NewsPreviewPage;
