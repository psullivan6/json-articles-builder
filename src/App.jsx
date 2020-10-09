import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import { AppContextProvider, useAppContext } from './utilities/AppContext';

// Components
import Nav from './components/Nav';

// Pages
import WelcomePage from './components/WelcomePage';

import ArticlesFormPage from './components/ArticlesFormPage';
import ArticlesPreviewPage from './components/ArticlesPreviewPage';

import NewsFormPage from './components/NewsFormPage';
import NewsPreviewPage from './components/NewsPreviewPage';

// Styles
import './styles.css';

function App() {
  const { contentType } = useAppContext();
  const location = useLocation();

  if (!contentType && location.pathname !== '/') {
    return (
      <>
        <Nav />
        <Redirect to="/" />
      </>
    );
  }

  return (
    <>
      <Nav />
      <Switch>
        <Route path="/articles-editor">
          <ArticlesFormPage />
        </Route>
        <Route path="/news-editor">
          <NewsFormPage />
        </Route>

        <Route path="/articles-preview">
          <ArticlesPreviewPage />
        </Route>
        <Route path="/news-preview">
          <NewsPreviewPage />
        </Route>

        <Route path="/" exact>
          <WelcomePage />
        </Route>
      </Switch>
    </>
  );
}

const AppWrapper = () => (
  <Router>
    <AppContextProvider>
      <main className="Page">
        <App />
      </main>
    </AppContextProvider>
  </Router>
);

export default AppWrapper;
