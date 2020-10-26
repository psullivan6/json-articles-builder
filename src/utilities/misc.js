export const getMappedStories = (stories) => {
  const now = new Date().getTime();

  return stories.map((story) => {
    const publishUnix = new Date(story.publishDate).getTime();

    if (story.expirationDate != null) {
      const expirationUnix = new Date(story.expirationDate).getTime();

      if (expirationUnix < now) {
        return {
          ...story,
          status: 'expired',
        };
      }
    }

    if (publishUnix > now) {
      return {
        ...story,
        status: 'future',
      };
    }

    return {
      ...story,
      status: 'active',
    };
  });
};
