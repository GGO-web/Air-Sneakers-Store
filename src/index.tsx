import ReactDOM from "react-dom/client";

import "./index.scss";

import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";

import {
   AuthProvider,
   FirebaseAppProvider,
   FirestoreProvider,
} from "reactfire";
import { firebaseAuth, firebaseApp, firestore } from "./firebaseConfig";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
   document.getElementById("root") as HTMLElement
);
root.render(
   <FirebaseAppProvider firebaseApp={firebaseApp} suspense={true}>
      <AuthProvider sdk={firebaseAuth}>
         <FirestoreProvider sdk={firestore}>
            <Provider store={store}>
               <BrowserRouter>
                  <App />
               </BrowserRouter>
            </Provider>
         </FirestoreProvider>
      </AuthProvider>
   </FirebaseAppProvider>
);
