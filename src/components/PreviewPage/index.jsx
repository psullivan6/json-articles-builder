import React from "react";
import { format, parseISO } from "date-fns";
import "./styles.css";
import { useAppContext } from "../../utilities/AppContext";
import { parseDate } from "../../utilities/date";

const PreviewItem = ({ publishDate, title, description, url }) => {
  return (
    // eslint-disable-next-line react/jsx-no-target-blank
    <a className="PreviewItem" href={url} target="_blank">
      <header>
        <h1>{title}</h1>
        <span>{format(parseDate(publishDate), "MM/dd/yy")}</span>
      </header>
      <p>{description}</p>
    </a>
  );
};

const AdditionalInfo = ({ expirationDate, ...props }) => {
  const date =
    typeof expirationDate === "string"
      ? parseISO(expirationDate)
      : expirationDate;

  const failedKeys = Object.keys(props).filter((key) => !props[key]);

  console.log("failedKeys", failedKeys);

  if (!expirationDate || failedKeys.length === 0) {
    return null;
  }

  return (
    <div>
      <h1>Additional Info:</h1>
      <ul>
        {expirationDate && (
          <li>{`Expiration Date: ${format(date, "MM/dd/yy")}`}</li>
        )}
        {failedKeys.map((failedKey) => (
          <li>{`Oops, you forgot ${failedKey}`}</li>
        ))}
      </ul>
    </div>
  );
};

const PreviewPage = () => {
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

export default PreviewPage;
