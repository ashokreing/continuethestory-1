import React, { useEffect, useState } from 'react';

function StoryViewer() {
  const [story, setStory] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/current-story')  // Usa la URL local
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setStory(data.currentPart))
      .catch(error => console.error('Error fetching story:', error));
  }, []);

  return (
    <section id="current-story">
      <h2>Current Story:</h2>
      <p>{story}</p>
    </section>
  );
}

export default StoryViewer;















