import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../utilities/AppContext";
import Salutation from "../Salutation";
import "./styles.css";

const WelcomePage = () => {
  const { setStories } = useAppContext();
  const [fileData, setFileData] = useState();

  const handleUpload = (event) => {
    const reader = new FileReader(); // File reader to read the file

    // This event listener will happen when the reader has read the file
    reader.addEventListener("load", function () {
      const result = JSON.parse(reader.result);

      const parsedFileData = result.reduce((acc, item) => {
        return {
          ...acc,
          [item.id]: item
        };
      }, {});

      setStories(parsedFileData);
      setFileData(parsedFileData);
    });

    reader.readAsText(event.target.files[0]); // Read the uploaded file
  };

  return (
    <>
      <Salutation />
      <h2>To get started, you can choose to&hellip;</h2>
      <br />
      <h3>
        Upload a .JSON file{" "}
        <span role="img" aria-label="Pointing to the JSON">
          👇
        </span>
      </h3>
      <input
        className="UploadInput"
        type="file"
        accept=".json"
        onChange={handleUpload}
      />

      {fileData ? (
        <>
          <h3>Would you like to&hellip;</h3>
          <div className="ButtonGroup">
            <Link to="/builder" className="Button Button-update">
              Edit the Stories
            </Link>
            <span>OR</span>
            <Link to="/preview" className="Button">
              Preview the Stories
            </Link>
          </div>
        </>
      ) : (
        <>
          <h3>
            OR
            <span role="img" aria-label="Pointing to the JSON">
              👇
            </span>
          </h3>
          <Link to="/builder" className="Button">
            Start Fresh
          </Link>
        </>
      )}
    </>
  );
};

export default WelcomePage;
