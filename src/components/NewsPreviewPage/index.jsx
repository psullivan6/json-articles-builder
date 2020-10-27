import React from 'react';
import _sortBy from 'lodash/sortBy';

// Utilities
import { useAppContext } from '../../utilities/AppContext';
import { getMappedStories } from '../../utilities/misc';

// Components
import TopHeadlinePreview from './components/TopHeadlinePreview';
import MoreStoriesPreview from './components/MoreStoriesPreview';
import EvergreenStoriesPreview from './components/EvergreenStoriesPreview';

// Styles
import styles from './styles.module.css';

const NewsPreviewPage = () => {
  const { stories } = useAppContext();
  const mappedStories = getMappedStories(stories);

  const topHeadlinesStories = _sortBy(
    mappedStories.filter((story) => {
      return story.section === 'H' && story.status === 'active';
    }),
    'order'
  );

  const moreStoriesStories = _sortBy(
    mappedStories.filter((story) => {
      return story.section === 'S' && story.status === 'active';
    }),
    'order'
  );

  const evergreenStories = _sortBy(
    mappedStories.filter((story) => {
      return story.section === 'E' && story.status === 'active';
    }),
    'order'
  );

  return (
    <div className={styles.StoriesPreview}>
      <h1>Stories Preview</h1>
      <h2>Top Headlines Stories</h2>
      {topHeadlinesStories.map((story) => (
        <TopHeadlinePreview key={story.id} {...story} />
      ))}

      <h2>More Stories</h2>
      {moreStoriesStories.map((story) => (
        <MoreStoriesPreview key={story.id} {...story} />
      ))}

      <h2>Evergreen Stories</h2>
      {evergreenStories.map((story) => (
        <EvergreenStoriesPreview key={story.id} {...story} />
      ))}

      <h2 className={styles.SecondarySubHeadline}>Expired & Future Stories</h2>
      {mappedStories
        .filter((story) => story.status !== 'active')
        .map((story) => {
          if (story.section === 'H') {
            return <TopHeadlinePreview key={story.id} {...story} />;
          }

          if (story.section === 'S') {
            return <MoreStoriesPreview key={story.id} {...story} />;
          }

          return <EvergreenStoriesPreview key={story.id} {...story} />;
        })}
    </div>
  );
};

export default NewsPreviewPage;
