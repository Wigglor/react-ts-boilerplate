import React from "react";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import { store } from "./store/store";
import { Provider } from "react-redux";
import { AuthProvider } from "./context/AuthProvider";
import { store } from "./store";
// import { WorkSpacesProvider } from "./context/WorkSpacesProvider";

// import Preline from "./components/Preline";
import "./style.css";
// import "./styles/globals.scss";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {/* <Preline /> */}
        <GoogleOAuthProvider clientId="523632201518-emi1ioba9vvudkc2u8on28gph5cc2cu0.apps.googleusercontent.com">
          <AuthProvider>
            {/* <WorkSpacesProvider> */}
            {/* <Preline /> */}
            <App />
            {/* </WorkSpacesProvider> */}
          </AuthProvider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </Provider>
    ,
  </React.StrictMode>,
);

// reportWebVitals();
