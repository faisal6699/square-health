import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import BaseRouter from './routes/BaseRouter'

function App() {
  return (
    <Router>
      <BaseRouter />
    </Router>
  );
}

export default App;
