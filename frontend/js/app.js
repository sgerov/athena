import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./containers/App";
import reducers from "./reducers/";
import MyStore from "./store";
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

render(
  <Provider store={MyStore}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider> 
  </Provider>,
  document.getElementById("root")
);

