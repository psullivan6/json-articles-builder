export const getInitialFormValues = (contentType) => ({
  description: '',
  expirationDate: null,
  publishDate: new Date(),
  title: '',
  url: '',
  ...(contentType === 'news' && {
    category: '',
    image: '',
    order: 0,
    section: '',
  }),
});
