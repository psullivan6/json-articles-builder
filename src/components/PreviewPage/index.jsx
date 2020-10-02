import React from "react";
import { format, parseISO } from "date-fns";
import "./styles.css";
import { useAppContext } from "../../utilities/AppContext";

const PreviewItem = ({ publishDate, title, description, url }) => {
  const date =
    typeof publishDate === "string" ? parseISO(publishDate) : publishDate;

  return (
    // eslint-disable-next-line react/jsx-no-target-blank
    <a className="PreviewItem" href={url} target="_blank">
      <header>
        <h1>{title}</h1>
        <span>{format(date, "MM/dd/yy")}</span>
      </header>
      <p>{description}</p>
    </a>
  );
};

const PreviewPage = () => {
  const { stories } = useAppContext();
  const now = new Date().getTime();

  const activeStories = stories.filter((story) => {
    const publishUnix = new Date(story.publishDate).getTime();

    if (publishUnix > now) {
      return false;
    }

    return true;
  });

  const futureStories = stories.filter((story) => {
    const publishUnix = new Date(story.publishDate).getTime();

    if (publishUnix > now) {
      return true;
    }

    return false;
  });

  return (
    <div className="StoriesPreview">
      <h1>Stories Preview</h1>
      <h2>Current Stories:</h2>
      {activeStories.map((story) => (
        <PreviewItem key={story.id} {...story} />
      ))}
      <br />
      <hr />
      <br />
      <h2>Future Stories:</h2>
      {futureStories.map((story) => (
        <PreviewItem key={story.id} {...story} />
      ))}
    </div>
  );
};

export default PreviewPage;
