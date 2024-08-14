import React, { useState } from 'react';

const ReplyForm = ({ onSubmit, onCancel }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit({ text });
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reply-form">
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
