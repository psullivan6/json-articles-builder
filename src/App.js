import React, { useEffect, useState } from "react";
import { Formik, Field, Form, useFormikContext } from "formik";
import Table from "./Table";
import { v4 as uuidv4 } from "uuid";
import "./styles.css";

// From: https://stackoverflow.com/questions/17710147/image-convert-to-base64
function readFile(event) {
  console.log("FILE READ CALLED", event);

  if (event.target.files && event.target.files[0]) {
    var FR = new FileReader();

    FR.addEventListener("load", function (e) {
      document.getElementById("img").src = e.target.result;
      document.getElementById("b64").innerHTML = e.target.result;
    });

    FR.readAsDataURL(event.target.files[0]);
  }
}

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
      [crud.id]: values
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
    category: "",
    description: "",
    title: "",
    linkURL: "",
    order: 0,
    section: "E"
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

      <input id="inp" type="file" onChange={readFile} />
      <p id="b64"></p>
      <img id="img" height="150" alt="Base64" />

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
          <label htmlFor="title">Link Title:</label>
          <Field id="title" name="title" placeholder="Link Title" />

          <br />

          <label htmlFor="linkURL">Link URL:</label>
          <Field id="linkURL" name="linkURL" placeholder="Link URL" />

          <br />

          <label htmlFor="description">Description:</label>
          <Field
            id="description"
            as="textarea"
            name="description"
            placeholder="Description"
          />

          <br />

          <label htmlFor="category">Category:</label>
          <Field id="category" name="category" placeholder="Category" />

          <br />

          <label htmlFor="section">Section</label>
          <Field as="select" name="section">
            <option value="H">H - Top Headlines</option>
            <option value="S">S - Related Stories</option>
            <option value="E">E - Engagement Stories</option>
          </Field>

          <br />

          <label htmlFor="order">Order:</label>
          <Field id="order" name="order" placeholder="Order" type="number" />

          <br />

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
