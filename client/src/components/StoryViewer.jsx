import React, { useEffect, useState } from 'react';

function StoryViewer() {
  const [story, setStory] = useState('');

  useEffect(() => {
    fetch('/api/current-story')
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











