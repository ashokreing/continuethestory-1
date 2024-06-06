import React from 'react';
import Header from './components/Header';
import StoryViewer from './components/StoryViewer';
import StoryWriter from './components/StoryWriter';
import './styles.css';

function App() {
  return (
    <div className="App">
      <Header />
      <StoryViewer />
      <StoryWriter />
    </div>
  );
}

export default App;




