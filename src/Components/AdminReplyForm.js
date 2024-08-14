import React, { useState, useEffect } from 'react';
import { getAIResponse } from '../utils/aiReply';

const AdminReplyForm = ({ comment, onSubmit, onCancel }) => {
  const [aiResponse, setAIResponse] = useState('');
  const [customResponse, setCustomResponse] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAIResponse = async () => {
      setIsLoading(true);
      const response = await getAIResponse(comment.text);
      setAIResponse(response);
      setIsLoading(false);
    };
    fetchAIResponse();
  }, [comment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalResponse = customResponse || aiResponse;
    if (finalResponse) {
      onSubmit({ text: finalResponse, isAI: !customResponse });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-reply-form">
      {isLoading ? (
        <p>Loading AI response...</p>
      ) : (
        <>
          <h4>AI Suggested Response:</h4>
          <p>{aiResponse}</p>
          <button type="submit" onClick={() => setCustomResponse('')}>
            Approve AI Response
          </button>
        </>
      )}
    </form>
  );
};

export default AdminReplyForm;