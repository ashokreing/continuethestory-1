import React, { useState } from 'react';

function StoryWriter() {
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const maxLength = 280; // Límite de caracteres

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert('Please enter your name and email.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/submit-part', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ part: text, name, email }),
      });

      if (response.ok) {
        setText('');
        setName('');
        setEmail('');
        alert('Your part has been submitted! You will receive an email when the story ends. Thank you!');
      } else {
        alert('There was an error submitting your part. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting the part:', error);
      alert('There was an error submitting your part. Please try again.');
    }
  };

  return (
    <section id="write-section">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={maxLength}
        placeholder="Write the next part here..."
      ></textarea>
      <div className="character-counter">
        <span>{maxLength - text.length} characters remaining</span>
      </div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
      />
      <button onClick={handleSubmit}>Submit</button>
    </section>
  );
}

export default StoryWriter;















