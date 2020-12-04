import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from "./reportWebVitals";
import { IntlProvider } from "react-intl";

import Series from "./components/series";
//import App from "./App"
import localeEnMessages from "./locales/moviesEn.json";
import localeEsMessages from "./locales/moviesEs.json";

function getBrowserLang(){
  return navigator.language  || navigator.userLanguage  
}

function getLocale(){
  const lang = getBrowserLang();
  if(lang ==="en"){
    return localeEnMessages;
  }
  else{
    return localeEsMessages;
  }
}

ReactDOM.render(
  
  <IntlProvider locale={getBrowserLang()} messages={getLocale()}>
    <Series />
  </IntlProvider>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
