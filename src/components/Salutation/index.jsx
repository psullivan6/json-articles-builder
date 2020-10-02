import React from "react";

import "./styles.css";

const Salutation = () => (
  <h1>
    Hey{" "}
    <span role="img" aria-label="Wave Hello" className="wave-hello">
      👋
    </span>
  </h1>
);

export default Salutation;
