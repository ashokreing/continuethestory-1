import React, { useEffect, useState } from "react";

function StoryViewer() {
  const [story, setStory] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // fetch('https://continuethestory.vercel.app/api/current-story')
    fetch("http://localhost:5001/api/current-story")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setStory(data.currentPart))
      .catch((error) => {
        console.error("Error fetching story:", error);
        setError("Error fetching story. Please try again later.");
      });
  }, []);

  return (
    <section id="current-story">
      <h2>Current Story:</h2>
      {error ? <p>{error}</p> : <p>{story}</p>}
    </section>
  );
}

export default StoryViewer;
