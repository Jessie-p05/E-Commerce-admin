import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading="null" persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
