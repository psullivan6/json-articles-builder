import React from "react";
import { format } from "date-fns";
import "./styles.css";

const PreviewItem = ({ publishDate, title, description }) => (
  <div className="PreviewItem">
    <header>
      <h1>{title}</h1>
      <span>{format(publishDate, "MM/dd/yy")}</span>
    </header>
    <p>{description}</p>
  </div>
);

const StoriesPreview = ({ data }) => {
  const now = new Date().getTime();

  const filteredData = data.filter((story) => {
    const publishUnix = new Date(story.publishDate).getTime();

    if (publishUnix > now) {
      return false;
    }

    return true;
  });
  return (
    <div className="StoriesPreview">
      <h1>Stories Preview</h1>
      {filteredData.map((story) => (
        <PreviewItem key={story.id} {...story} />
      ))}
    </div>
  );
};

export default StoriesPreview;
