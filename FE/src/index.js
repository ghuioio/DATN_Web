import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ScrollToTop from './Services/Ultils/ScrollToTop'
import { WebsocketProvider, socket} from './socket';
ReactDOM.render(
  // <React.StrictMode>
    <BrowserRouter>
      <WebsocketProvider value={socket}>
        <ScrollToTop/>
        <App />
      </WebsocketProvider>
    </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById('root')
)