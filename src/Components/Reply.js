import React, { useState } from 'react';
import formatDate from '../utils/Dateutils';

const Reply = ({ reply, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(reply.text);

  const handleEdit = () => {
    if (editText.trim() !== reply.text) {
      onEdit(reply.id, editText);
    }
    setIsEditing(false);
  };

  return (
    <div className={`reply ${reply.isAI ? 'ai-reply' : ''}`}>
      <span>{formatDate(reply.date)}</span>
      {reply.isAI && <span className="ai-tag">(AI Generated)</span>}
      {isEditing ? (
        <div className="edit-form">
          <textarea value={editText} onChange={(e) => setEditText(e.target.value)} />
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <p>{reply.text}</p>
      )}
      {!reply.isAI && (
        <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
      )}
      <button onClick={() => onDelete(reply.id)}>Delete</button>
    </div>
  );
};

export default Reply;