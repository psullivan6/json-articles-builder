import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AppContextProvider } from "./utilities/AppContext";

// Components
import Nav from "./components/Nav";

// Pages
import FormPage from "./components/FormPage";
import PreviewPage from "./components/PreviewPage";
import WelcomePage from "./components/WelcomePage";

// Styles
import "./styles.css";

export default function App() {
  return (
    <Router>
      <AppContextProvider>
        <main className="Page">
          <Nav />
          <Switch>
            <Route path="/builder">
              <FormPage />
            </Route>
            <Route path="/preview">
              <PreviewPage />
            </Route>
            <Route path="/" exact>
              <WelcomePage />
            </Route>
          </Switch>
        </main>
      </AppContextProvider>
    </Router>
  );
}
