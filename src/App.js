import 'dotenv/config';
import React from 'react';
import TodoList from './components/TodoList';
import './index.css';



function App() {
  return (
    <div className="container">
      <TodoList />
    </div>
  );
}

export default App;
