import ReactDOM from "react-dom/client";

import "./index.scss";

import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";

import { AuthProvider, FirebaseAppProvider } from "reactfire";
import { firebaseAuth, firebaseApp } from "./firebaseConfig";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
   document.getElementById("root") as HTMLElement
);
root.render(
   <FirebaseAppProvider firebaseApp={firebaseApp}>
      <AuthProvider sdk={firebaseAuth}>
         <Provider store={store}>
            <BrowserRouter>
               <App />
            </BrowserRouter>
         </Provider>
      </AuthProvider>
   </FirebaseAppProvider>
);
