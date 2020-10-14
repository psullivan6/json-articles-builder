import { addMinutes, format, parseISO } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

const formatISODate = (ISODate) => {
  // If ISO Date is null or undefined, set it to null
  if (ISODate == null) {
    return null;
  }

  return format(
    addMinutes(parseISO(ISODate), parseISO(ISODate).getTimezoneOffset()),
    'yyyy-MM-dd HH:mm:ss'
  );
};

export const formatForDownload = (data) => {
  const returnData = JSON.stringify(
    // destructure out the id so it's excluded from the final payload
    // re-format the dates as per B/E requirements
    Object.values(data).map(({ id, expirationDate, publishDate, ...story }) => {
      return {
        expirationDate: formatISODate(expirationDate),
        publishDate: formatISODate(publishDate),
        ...story,
      };
    }),
    null,
    2
  );

  return returnData;
};

export const formatFromUpload = (fileData) => {
  const parsedData = JSON.parse(fileData);

  return parsedData.reduce((acc, item) => {
    const id = uuidv4();

    return {
      ...acc,
      [id]: {
        ...item,
        id,
      },
    };
  }, {});
};
