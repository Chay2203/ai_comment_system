import React, { useState } from 'react';

const CommentForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && text.trim()) {
      onSubmit({ name, text });
      setName('');
      setText('');
    }
  };

  return (
    <div className="comment-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="button-container">
          <button type="submit">POST</button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;