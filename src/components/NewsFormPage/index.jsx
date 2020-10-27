import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';

// Utilities
import { useAppContext } from '../../utilities/AppContext';
import { getInitialFormValues } from '../../utilities/constants';
import { formatForDownload } from '../../utilities/upAndDownload';

// Components
import DatePicker from '../DatePicker';
import Table from '../Table';

// Styles
import './styles.css';

const NewsFormPage = () => {
  const { storiesObj: stories, setStories } = useAppContext();
  const [crudStatus, setCrudStatus] = useState('create');
  const [hasUnsavedData, setHasUnsavedData] = useState(false);

  const handleBeforeUnload = useCallback(
    (event) => {
      if (hasUnsavedData) {
        event.returnValue =
          "You haven't downloaded the updated JSON. Are you sure you want to leave?";
      }
    },
    [hasUnsavedData]
  );

  // Keep the stories in localStorage, though this is proving useless because of CodeSandbox restrictions
  useEffect(() => {
    localStorage.setItem('stories', JSON.stringify(stories));
  }, [stories]);

  // Ensure the user is warned if trying to leave without downloading the latest JSON
  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [handleBeforeUnload]);

  const handleSubmit = (
    { id, expirationDate, publishDate, ...values },
    actions
  ) => {
    const storedId = crudStatus === 'create' ? uuidv4() : id;

    actions.setSubmitting(false);
    actions.resetForm({
      values: getInitialFormValues('news'),
    });

    setStories({
      ...stories,
      [storedId]: {
        ...values,
        expirationDate: expirationDate ? expirationDate.toISOString() : null,
        publishDate: publishDate.toISOString(),
        id: storedId,
      },
    });

    if (crudStatus === 'update') {
      setCrudStatus('create');
    }

    if (!hasUnsavedData) {
      setHasUnsavedData(true);
    }
  };

  const handleEditItem = ({ data }) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    setCrudStatus('update');
  };

  const handleRemoveItem = ({ id }) => {
    const { [id]: removedItem, ...rest } = stories;
    setStories(rest);
  };

  const handleDownload = () => {
    setHasUnsavedData(false);
  };

  return (
    <div className="App">
      <header>
        <h2>
          Fill out the fields below, click the "Download JSON" button and share
          the file with the Engineering team.
        </h2>
      </header>
      <Formik
        initialValues={getInitialFormValues('news')}
        onSubmit={handleSubmit}
      >
        <Form>
          <label htmlFor="title">Title:</label>
          <Field id="title" name="title" placeholder="Title" />

          <div className="DateBox">
            <div>
              <label htmlFor="publishDate">Publish Date:</label>
              {/* Saved as ISO string */}
              <DatePicker
                id="publishDate"
                name="publishDate"
                placeholderText="Click to select a date"
                // showTimeSelect
                // dateFormat="MM/dd/yyyy h:mm aa"
                dateFormat="MM/dd/yyyy"
              />
            </div>

            <div>
              <label htmlFor="expirationDate">Expiration Date:</label>
              {/* Saved as ISO string */}
              <DatePicker
                id="expirationDate"
                name="expirationDate"
                placeholderText="Leave Blank if none"
                // showTimeSelect
                // dateFormat="MM/dd/yyyy h:mm aa"
                dateFormat="MM/dd/yyyy"
              />
            </div>
          </div>

          <label htmlFor="url">Link URL:</label>
          <Field id="url" name="url" placeholder="Link URL" />

          <label htmlFor="description">Description:</label>
          <Field
            id="description"
            as="textarea"
            name="description"
            placeholder="Description"
          />

          <label htmlFor="category">Category (optional)</label>
          <Field
            id="category"
            name="category"
            placeholder="Category (optional)"
          />

          <label htmlFor="section">Section</label>
          <Field as="select" id="section" name="section">
            <option value="" disabled>
              Select an option
            </option>
            <option value="H">Top Headlines - H</option>
            <option value="S">More Stories - S</option>
            <option value="E">Evergreen - E</option>
          </Field>

          <label htmlFor="image">Image URL*</label>
          <Field id="image" name="image" placeholder="Image URL" />
          <p className="description">
            <span>
              * If the image is <b>directly on the page</b>, you can right-click
              on the image and select "Copy Image Address"
            </span>
            <span>
              * If the image is a <b>background image</b>, you can right-click
              on the image and select "Inspect". Then in the code look for an
              element that has <code>background-image: url(...</code> and
              right-click on the url and select "Copy link address." Please do
              not hesitate to ask for a developer to complete this step.
            </span>
          </p>

          <label htmlFor="order">Order</label>
          <Field
            id="order"
            type="number"
            name="order"
            placeholder="Image URL"
          />

          <br />

          <button type="submit" className={`Button-${crudStatus}`}>
            {`${crudStatus === 'create' ? 'Add' : 'Update'} Story`}
          </button>

          <br />
          <br />
          <br />

          <Table
            data={stories}
            onEditItem={handleEditItem}
            onRemoveItem={handleRemoveItem}
          />
          <br />

          <a
            className="Button"
            download="stories.json"
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              formatForDownload(Object.values(stories))
            )}`}
            onClick={handleDownload}
          >
            Download JSON
          </a>

          <br />
          <br />

          <Link to="/news-preview" className="Button">
            Preview This Content
          </Link>

          <br />
          <br />
        </Form>
      </Formik>
    </div>
  );
};

export default NewsFormPage;
