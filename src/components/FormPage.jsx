import React from "react";
import { useAppContext } from "../utilities/AppContext";

const FormPage = () => {
  const { stories } = useAppContext();
  return (
    <section>
      <h1>Form Page</h1>
      <pre>{JSON.stringify(stories, null, 2)}</pre>
    </section>
  );
};

export default FormPage;
