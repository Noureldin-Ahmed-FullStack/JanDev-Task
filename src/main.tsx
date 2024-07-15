import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import App from './App.tsx'
import './index.css'
import './App.css'
import List from './Components/List.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Cart /> */}
    <List />
  </React.StrictMode>,
)
