import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import { store } from "./store/store";
import { AuthProvider } from "./context/AuthProvider";
import "./styles/globals.scss";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}

    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>

    {/* </Provider> */}
  </React.StrictMode>,
);

// reportWebVitals();
