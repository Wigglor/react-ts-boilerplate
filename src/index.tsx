import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import { store } from "./store/store";
import { AuthProvider } from "./context/AuthProvider";
// import { WorkSpacesProvider } from "./context/WorkSpacesProvider";

import "./style.css";
import "./styles/globals.scss";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      {/* <WorkSpacesProvider> */}
      <App />
      {/* </WorkSpacesProvider> */}
    </AuthProvider>
  </BrowserRouter>,

  // </React.StrictMode>,
);

// reportWebVitals();
