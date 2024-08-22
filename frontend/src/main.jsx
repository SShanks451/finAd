import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId="838977074841-40n8b67t982fcre949rr17an285j08g0.apps.googleusercontent.com">
    <App />
    <Toaster />
  </GoogleOAuthProvider>
  // </React.StrictMode>
);
