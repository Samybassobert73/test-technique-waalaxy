import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import './globals.css';
import Index from "./pages/home/index";
const root = ReactDOM.createRoot(
  document.getElementById('root') ?? document.body
);


root.render(
  <StrictMode>
     <Index/>
  </StrictMode>
);
