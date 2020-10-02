import React, { useEffect, useState } from "react";
import { Formik, Field, Form, useFormikContext } from "formik";
import { v4 as uuidv4 } from "uuid";
import Table from "./Table";
import DatePicker from "./components/DatePicker";
import "./styles.css";
import StoriesPreview from "./components/StoriesPreview";
import { initialFormValues } from "./utilities/constants";

const CopyButton = ({ status, ...props }) => {
  if (status === "success") {
    return (
      <button className="button-success" {...props}>
        <span role="img" aria-label="Successfully Copied">
          Copied 👍
        </span>
      </button>
    );
  }

  if (status === "error") {
    return (
      <button className="button-error" {...props}>
        <span role="img" aria-label="Couldn't Copy">
          Manual Copy/Paste time, sorry 😭
        </span>
      </button>
    );
  }

  return (
    <button {...props}>
      Copy the JSON{" "}
      <span role="img" aria-label="Pointing to the JSON">
        👇
      </span>
    </button>
  );
};

const CRUDButton = ({
  crudStatus,
  setCrudStatus,
  stories,
  setStories,
  setInitialValues
}) => {
  const { values } = useFormikContext();
  const id = crudStatus === "create" ? uuidv4() : values.id;

  const handleClick = () => {
    setStories({
      ...stories,
      [id]: {
        id,
        ...values
      }
    });
    setInitialValues(initialFormValues);
    setCrudStatus("create");
  };

  const buttonProps = {
    type: "button",
    className: `button-${crudStatus}`,
    onClick: handleClick
  };

  if (crudStatus === "update") {
    return <button {...buttonProps}>Update Story Item</button>;
  }

  return <button {...buttonProps}>Add Story Item</button>;
};

export default function App() {
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [stories, setStories] = useState({});
  const [crudStatus, setCrudStatus] = useState("create");
  const [showPreview, setShowPreview] = useState(false);
  const [initialValues, setInitialValues] = useState(initialFormValues);

  useEffect(() => {
    localStorage.setItem("stories", JSON.stringify(stories));
  }, [stories]);

  const handleSubmit = (values, actions) => {
    const id = crudStatus === "create" ? uuidv4() : values.id;

    actions.setSubmitting(false);
    actions.resetForm({
      values: initialFormValues
    });

    console.log("SUBMIT", crudStatus, id, actions);

    setStories({
      ...stories,
      [id]: {
        ...values,
        id
      }
    });

    if (crudStatus === "update") {
      setCrudStatus("create");
    }
  };

  const handleEditItem = ({ data }) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    setCrudStatus("update");
  };

  const handleRemoveItem = ({ id }) => {
    const { [id]: removedItem, ...rest } = stories;
    setStories(rest);
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const handleCopy = () => {
    document.getElementById("copyNode").select();
    try {
      document.execCommand("copy");
      setSubmitStatus("success");
    } catch (error) {
      console.warning("error", error);
      setSubmitStatus("error");
    }
    setTimeout(() => {
      setSubmitStatus("idle");
    }, 1500);
  };

  return (
    <div className="App">
      {showPreview ? (
        <StoriesPreview data={Object.values(stories)} />
      ) : (
        <>
          <header>
            <h1>
              Hey{" "}
              <span role="img" aria-label="Wave Hello" className="wave-hello">
                👋
              </span>
            </h1>
            <h2>
              Fill out the fields below, click the "Copy the JSON" button, and
              paste the data.
            </h2>
          </header>

          <Formik
            initialValues={initialValues}
            // enableReinitialize={true}
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
                    showTimeSelect
                    dateFormat="MM/dd/yyyy h:mm aa"
                  />
                </div>

                <div>
                  <label htmlFor="expirationDate">Expiration Date:</label>
                  {/* Saved as ISO string */}
                  <DatePicker
                    id="expirationDate"
                    name="expirationDate"
                    placeholderText="Leave Blank if none"
                    showTimeSelect
                    dateFormat="MM/dd/yyyy h:mm aa"
                  />
                </div>
              </div>

              <br />

              <label htmlFor="url">Link URL:</label>
              <Field id="url" name="url" placeholder="Link URL" />

              <br />

              <label htmlFor="description">Description:</label>
              <Field
                id="description"
                as="textarea"
                name="description"
                placeholder="Description"
              />

              <button type="submit" className={`button-${crudStatus}`}>
                {`${crudStatus === "create" ? "Add" : "Update"} Story`}
              </button>

              {/* <CRUDButton
                status={submitStatus}
                setSubmitStatus={setSubmitStatus}
                stories={stories}
                setStories={setStories}
                crudStatus={crudStatus}
                setCrudStatus={setCrudStatus}
                setInitialValues={setInitialValues}
              /> */}

              <Table
                data={stories}
                onEditItem={handleEditItem}
                onRemoveItem={handleRemoveItem}
              />
              <br />

              <CopyButton status={submitStatus} onClick={handleCopy} />

              <textarea
                id="copyNode"
                readOnly
                value={JSON.stringify(Object.values(stories), null, 2)}
              />
            </Form>
          </Formik>
        </>
      )}

      <button onClick={togglePreview}>Toggle Preview</button>
    </div>
  );
}
