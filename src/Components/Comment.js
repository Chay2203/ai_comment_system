import React, { useState } from 'react';
import ReplyForm from './ReplyForm';
import AdminReplyForm from './AdminReplyForm';
import Reply from './Reply';
import formatDate from '../utils/Dateutils';

const Comment = ({ comment, replies, onReply, onEdit, onDelete, onEditReply, onDeleteReply, isAdmin }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isAdminReplying, setIsAdminReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);

  const handleEdit = () => {
    if (editText.trim() !== comment.text) {
      onEdit(comment.id, editText);
    }
    setIsEditing(false);
  };

  const handleReply = (reply) => {
    onReply(comment.id, reply);
    setIsReplying(false);
    setIsAdminReplying(false);
  };

  return (
<div className="comment">
  <h4>{comment.name}</h4>
  <span>{formatDate(comment.date)}</span>
  {isEditing ? (
    <div className="edit-form">
      <textarea value={editText} onChange={(e) => setEditText(e.target.value)} />
      <button onClick={handleEdit}>Save</button>
      <button onClick={() => setIsEditing(false)}>Cancel</button>
    </div>
  ) : (
    <p>{comment.text}</p>
  )}
    <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
    <button onClick={() => onDelete(comment.id)} className="delete-button">
      <i className="fa fa-trash"></i>
    </button>
  <button onClick={() => setIsReplying(!isReplying)}>Reply</button>
  {isAdmin && (
    <button onClick={() => setIsAdminReplying(!isAdminReplying)}>AI Reply</button>
  )}
      <button onClick={() => onDelete(comment.id)}>Delete</button>
      {isReplying && <ReplyForm onSubmit={handleReply} onCancel={() => setIsReplying(false)} />}
      {isAdminReplying && (
        <AdminReplyForm
          comment={comment}
          onSubmit={handleReply}
          onCancel={() => setIsAdminReplying(false)}
        />
      )}
      {replies.map(reply => (
        <Reply 
          key={reply.id} 
          reply={reply} 
          onEdit={onEditReply} 
          onDelete={onDeleteReply} 
        />
      ))}
    </div>
  );
};

export default Comment;