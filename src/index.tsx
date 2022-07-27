import ReactDOM from "react-dom/client";

import "./index.scss";

import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";

import { AuthProvider, FirebaseAppProvider } from "reactfire";
import { firebaseAuth, firebaseApp } from "./firebaseConfig";

const root = ReactDOM.createRoot(
   document.getElementById("root") as HTMLElement
);
root.render(
   <FirebaseAppProvider firebaseApp={firebaseApp}>
      <AuthProvider sdk={firebaseAuth}>
         <Provider store={store}>
            <App />
         </Provider>
      </AuthProvider>
   </FirebaseAppProvider>
);
