import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  TextField,
  IconButton,
  Divider,
} from '@mui/material';
import { Send } from '@mui/icons-material';

function CommentSection({ comments, onAddComment }) {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(commentText.trim());
    setCommentText('');
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Divider sx={{ mb: 1.5 }} />

      {/* Comment Input */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', gap: 1, mb: comments.length > 0 ? 2 : 0 }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 25,
              backgroundColor: '#f0f2f5',
              '& fieldset': { borderColor: 'transparent' },
              '&:hover fieldset': { borderColor: '#e0e0e0' },
              '&.Mui-focused fieldset': { borderColor: '#1976d2' },
            },
          }}
        />
        <IconButton
          type="submit"
          disabled={!commentText.trim()}
          sx={{
            color: '#1976d2',
            '&.Mui-disabled': { color: '#bdbdbd' },
          }}
        >
          <Send />
        </IconButton>
      </Box>

      {/* Comments List */}
      {comments.map((comment, index) => (
        <Box
          key={comment._id || index}
          sx={{
            display: 'flex',
            gap: 1.5,
            mb: 1.5,
            pl: 0.5,
          }}
        >
          <Avatar
            src={comment.user?.avatar}
            alt={comment.user?.username}
            sx={{ width: 32, height: 32, mt: 0.5 }}
          />
          <Box
            sx={{
              backgroundColor: '#f0f2f5',
              borderRadius: 3,
              px: 2,
              py: 1,
              flex: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: '#1c1e21', fontSize: '0.85rem' }}
            >
              {comment.user?.username}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: '#3a3b3c', lineHeight: 1.5, fontSize: '0.85rem' }}
            >
              {comment.text}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: '#65676b', mt: 0.5, display: 'block' }}
            >
              {comment.createdAt
                ? new Date(comment.createdAt).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : 'Just now'}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default CommentSection;
