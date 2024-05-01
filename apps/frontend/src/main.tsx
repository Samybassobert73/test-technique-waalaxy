import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import './globals.css';
const root = ReactDOM.createRoot(
  document.getElementById('root') ?? document.body
);


root.render(
  <StrictMode>
    <div className='text-red-500'>hello world!</div> 
  </StrictMode>
);
