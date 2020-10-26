export const getInitialFormValues = (contentType) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return {
    description: '',
    expirationDate: null,
    publishDate: now,
    title: '',
    url: '',
    ...(contentType === 'news' && {
      category: '',
      image: '',
      order: 0,
      section: '',
    }),
  };
};
