import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../utilities/AppContext';
import { formatFromUpload } from '../../utilities/upAndDownload';
import Salutation from '../Salutation';
import WelcomeHasData from './components/WelcomeHasData';
import './styles.css';

const PageContent = ({ fileData, handleUpload }) => {
  const { contentType } = useAppContext();

  return (
    <>
      <h3>
        Upload a .JSON file{' '}
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
            <Link
              to={`/${contentType}-editor`}
              className="Button Button-update"
            >
              Edit the Stories
            </Link>
            <span>OR</span>
            <Link to={`/${contentType}-preview`} className="Button">
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
          <Link to={`/${contentType}-editor`} className="Button">
            Start with a Blank Form
          </Link>
        </>
      )}
    </>
  );
};

const SubHeadline = () => {
  const { contentType } = useAppContext();

  if (contentType) {
    return <h2>Now choose to either&hellip;</h2>;
  }

  return (
    <h2>
      To get started, choose to create <br />
      To View Articles or My News Stories
    </h2>
  );
};

const WelcomePage = () => {
  const { stories, setStories, contentType, setContentType } = useAppContext();
  const [fileData, setFileData] = useState();

  const handleUpload = (event) => {
    const reader = new FileReader(); // File reader to read the file

    // This event listener will happen when the reader has read the file
    reader.addEventListener('load', function () {
      const parsedFileData = formatFromUpload(reader.result);

      setStories(parsedFileData);
      setFileData(parsedFileData);
    });

    reader.readAsText(event.target.files[0]); // Read the uploaded file
  };

  if (stories.length > 0 && contentType) {
    return <WelcomeHasData />;
  }

  return (
    <>
      <Salutation />
      <SubHeadline />
      {!contentType && (
        <div className="ButtonGroup">
          <button
            className="Button"
            type="button"
            onClick={() => setContentType('articles')}
          >
            Start with Articles
          </button>
          <span>OR</span>
          <button
            className="Button"
            type="button"
            onClick={() => setContentType('news')}
          >
            Start with News Stories
          </button>
        </div>
      )}

      {contentType && (
        <PageContent fileData={fileData} handleUpload={handleUpload} />
      )}
    </>
  );
};

export default WelcomePage;
