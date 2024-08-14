import React, { useState } from 'react';
import Comment from './Comment';

const CommentList = ({ comments, replies, onReply, onEdit, onDelete, onEditReply, onDeleteReply, isAdmin }) => {
  const [sortOrder, setSortOrder] = useState('desc');

  const sortedComments = [...comments].sort((a, b) => {
    return sortOrder === 'desc' 
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date);
  });

  return (
    <>
      <div className='select_container'>
        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>
      <div>
        {sortedComments.map(comment => (
          <Comment 
            key={comment.id} 
            comment={comment} 
            replies={replies.filter(reply => reply.parentId === comment.id)}
            onReply={onReply}
            onEdit={onEdit}
            onDelete={onDelete}
            onEditReply={onEditReply}
            onDeleteReply={onDeleteReply}
            isAdmin={isAdmin}
          />
        ))}
      </div>
    </>
  );
};

export default CommentList;