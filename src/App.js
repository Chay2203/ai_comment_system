import React, { useState, useEffect } from 'react';
import CommentForm from './Components/CommentForm';
import CommentList from './Components/CommentList';

const App = () => {
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // Define the state for isAdmin

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
    const storedReplies = JSON.parse(localStorage.getItem('replies')) || [];
    setComments(storedComments);
    setReplies(storedReplies);
  }, []);

  const updateStorage = (newComments, newReplies) => {
    localStorage.setItem('comments', JSON.stringify(newComments));
    localStorage.setItem('replies', JSON.stringify(newReplies));
  };

  const addComment = (comment) => {
    const newComment = { ...comment, id: Date.now(), date: new Date() };
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    updateStorage(updatedComments, replies);
  };

  const addReply = (parentId, reply) => {
    const newReply = { ...reply, id: Date.now(), parentId, date: new Date() };
    const updatedReplies = [...replies, newReply];
    setReplies(updatedReplies);
    updateStorage(comments, updatedReplies);
  };

  const editComment = (id, newText) => {
    const updatedComments = comments.map(comment =>
      comment.id === id ? { ...comment, text: newText } : comment
    );
    setComments(updatedComments);
    updateStorage(updatedComments, replies);
  };

  const deleteComment = (id) => {
    const updatedComments = comments.filter(comment => comment.id !== id);
    const updatedReplies = replies.filter(reply => reply.parentId !== id);
    setComments(updatedComments);
    setReplies(updatedReplies);
    updateStorage(updatedComments, updatedReplies);
  };

  const editReply = (id, newText) => {
    const updatedReplies = replies.map(reply =>
      reply.id === id ? { ...reply, text: newText } : reply
    );
    setReplies(updatedReplies);
    updateStorage(comments, updatedReplies);
  };

  const deleteReply = (id) => {
    const updatedReplies = replies.filter(reply => reply.id !== id);
    setReplies(updatedReplies);
    updateStorage(comments, updatedReplies);
  };

  return (
    <div className="app">
      <button onClick={() => setIsAdmin(!isAdmin)}>
        {isAdmin ? 'Switch to User Mode' : 'Switch to Admin Mode'}
      </button>
      <h1>Comments</h1>
      <CommentForm onSubmit={addComment} />
      <CommentList
        comments={comments}
        replies={replies}
        onReply={addReply}
        onEdit={editComment}
        onDelete={deleteComment}
        onEditReply={editReply}
        onDeleteReply={deleteReply}
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default App;
