import React, { useEffect, useState } from "react";
import { Formik, Field, Form, useFormikContext } from "formik";
import { v4 as uuidv4 } from "uuid";
import Table from "./Table";
import DatePicker from "./components/DatePicker";
import "./styles.css";

const SubmitButton = ({ status, ...props }) => {
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
  crud,
  setCrud,
  status,
  setCopyStatus,
  stories,
  setStories,
  ...props
}) => {
  const { values } = useFormikContext();

  const handleClick = () => {
    setStories({
      ...stories,
      [crud.id]: {
        id: crud.id,
        ...values
      }
    });
    setCrud({ id: uuidv4(), status: "create" });
  };

  const buttonProps = {
    type: "button",
    className: `button-${crud.status}`,
    onClick: handleClick
  };

  if (crud.status === "update") {
    return <button {...buttonProps}>Update Story Item</button>;
  }

  return <button {...buttonProps}>Add Story Item</button>;
};

export default function App() {
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [stories, setStories] = useState({});
  const [crud, setCrud] = useState({ id: uuidv4(), status: "create" });
  const [initialValues, setInitialValues] = useState({
    id: uuidv4(),
    description: "",
    expirationDate: null,
    publishDate: null,
    title: "",
    url: ""
  });

  useEffect(() => {
    localStorage.setItem("stories", JSON.stringify(stories));
  }, [stories]);

  const handleEditItem = ({ id, data }) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    setInitialValues(data);
    setCrud({ id, status: "update" });
  };

  const handleRemoveItem = ({ id }) => {
    const { [id]: removedItem, ...rest } = stories;
    setStories(rest);
  };

  return (
    <div className="App">
      <header>
        <h1>
          Hey{" "}
          <span role="img" aria-label="Wave Hello" className="wave-hello">
            👋
          </span>
        </h1>
        <h2>
          Fill out the fields below, click the "Copy the JSON" button, and paste
          the data.
        </h2>
      </header>

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={(values) => {
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
        }}
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

          <CRUDButton
            status={submitStatus}
            setSubmitStatus={setSubmitStatus}
            stories={stories}
            setStories={setStories}
            crud={crud}
            setCrud={setCrud}
          />

          <Table
            data={stories}
            onEditItem={handleEditItem}
            onRemoveItem={handleRemoveItem}
          />
          <br />
          <SubmitButton type="submit" status={submitStatus} />

          <textarea
            id="copyNode"
            value={JSON.stringify(Object.values(stories), null, 2)}
          />
        </Form>
      </Formik>
    </div>
  );
}
