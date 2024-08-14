import React, { useState } from 'react';

const ReplyForm = ({ onSubmit, onCancel }) => {
  const [text, setText] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && name.trim()) {
      onSubmit({ name, text });
      setText('');
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reply-form">
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Reply"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Post</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default ReplyForm;
