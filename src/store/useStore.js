import create from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(persist(
  (set, get) => ({
    comments: [],
    replies: [],
    addComment: (comment) => set((state) => ({ 
      comments: [...state.comments, { ...comment, id: Date.now(), date: new Date().toISOString() }] 
    })),
    editComment: (id, newText) => set((state) => ({
      comments: state.comments.map(comment => 
        comment.id === id ? { ...comment, text: newText } : comment
      )
    })),
    deleteComment: (id) => set((state) => ({
      comments: state.comments.filter(comment => comment.id !== id),
      replies: state.replies.filter(reply => reply.parentId !== id)
    })),
    addReply: (parentId, reply) => set((state) => ({
      replies: [...state.replies, { ...reply, id: Date.now(), date: new Date().toISOString(), parentId }]
    })),
    editReply: (id, newText) => set((state) => ({
      replies: state.replies.map(reply => 
        reply.id === id ? { ...reply, text: newText } : reply
      )
    })),
    deleteReply: (id) => set((state) => ({
      replies: state.replies.filter(reply => reply.id !== id)
    })),
    getState: () => get(),
  }),
  {
    name: 'comments-storage',
    getStorage: () => localStorage,
  }
));

export default useStore;
