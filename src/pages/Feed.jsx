import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Avatar,
  Chip,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Image as ImageIcon,
  EmojiEmotions,
  Close,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import PostCard from '../components/PostCard';

const filterTabs = [
  { label: 'All Posts', value: 'all' },
  { label: 'Most Liked', value: 'mostLiked' },
  { label: 'Most Commented', value: 'mostCommented' },
];

function Feed() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchPosts = useCallback(async () => {
    try {
      const params = activeFilter !== 'all' ? { sort: activeFilter } : {};
      const res = await api.get('/posts', { params });
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    } finally {
      setLoading(false);
    }
  }, [activeFilter]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPostImage(null);
    setImagePreview('');
  };

  const handleCreatePost = async () => {
    if (!postText.trim() && !postImage) return;

    setPosting(true);
    try {
      const formData = new FormData();
      if (postText.trim()) formData.append('text', postText.trim());
      if (postImage) formData.append('image', postImage);

      const res = await api.post('/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setPosts((prev) => [res.data, ...prev]);
      setPostText('');
      setPostImage(null);
      setImagePreview('');
      setSnackbar({ open: true, message: 'Post created successfully!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to create post', severity: 'error' });
    } finally {
      setPosting(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      const res = await api.put(`/posts/${postId}/like`);
      setPosts((prev) => prev.map((p) => (p._id === postId ? res.data : p)));
    } catch (err) {
      console.error('Failed to like:', err);
    }
  };

  const handleComment = async (postId, text) => {
    try {
      const res = await api.post(`/posts/${postId}/comment`, { text });
      setPosts((prev) => prev.map((p) => (p._id === postId ? res.data : p)));
    } catch (err) {
      console.error('Failed to comment:', err);
    }
  };

  return (
    <Box sx={{ maxWidth: 620, mx: 'auto', py: 3, px: { xs: 1.5, sm: 2 } }}>
      {/* Create Post Card */}
      <Card sx={{ mb: 3, borderRadius: 4 }} className="fade-in-up">
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#1c1e21' }}>
            Create Post
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Avatar
              src={user?.avatar}
              alt={user?.username}
              sx={{ width: 44, height: 44, border: '2px solid #e0e0e0' }}
            />
            <TextField
              fullWidth
              multiline
              minRows={2}
              maxRows={6}
              placeholder="What's on your mind?"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  backgroundColor: '#f8f9fa',
                  '& fieldset': { borderColor: '#e0e0e0' },
                  '&:hover fieldset': { borderColor: '#bdbdbd' },
                  '&.Mui-focused fieldset': { borderColor: '#1976d2' },
                },
              }}
            />
          </Box>

          {imagePreview && (
            <Box sx={{ position: 'relative', mb: 2, borderRadius: 3, overflow: 'hidden' }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  width: '100%',
                  maxHeight: 300,
                  objectFit: 'cover',
                  borderRadius: 12,
                }}
              />
              <IconButton
                onClick={handleRemoveImage}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.8)' },
                }}
                size="small"
              >
                <Close fontSize="small" />
              </IconButton>
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload"
                type="file"
                onChange={handleImageSelect}
              />
              <label htmlFor="image-upload">
                <IconButton
                  component="span"
                  sx={{
                    color: '#1976d2',
                    '&:hover': { backgroundColor: 'rgba(25,118,210,0.08)' },
                  }}
                >
                  <ImageIcon />
                </IconButton>
              </label>
              <IconButton
                sx={{
                  color: '#f9a825',
                  '&:hover': { backgroundColor: 'rgba(249,168,37,0.08)' },
                }}
              >
                <EmojiEmotions />
              </IconButton>
            </Box>

            <Button
              variant="contained"
              onClick={handleCreatePost}
              disabled={posting || (!postText.trim() && !postImage)}
              sx={{
                px: 4,
                py: 1,
                background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                boxShadow: '0 3px 12px rgba(25,118,210,0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1565c0, #1976d2)',
                },
                '&.Mui-disabled': {
                  background: '#e0e0e0',
                  color: '#9e9e9e',
                },
              }}
            >
              {posting ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : 'Post'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Filter Tabs */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
        {filterTabs.map((tab) => (
          <Chip
            key={tab.value}
            label={tab.label}
            onClick={() => setActiveFilter(tab.value)}
            sx={{
              fontWeight: 600,
              fontSize: '0.85rem',
              px: 1,
              borderRadius: 25,
              ...(activeFilter === tab.value
                ? {
                    background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                    color: '#fff',
                    boxShadow: '0 2px 8px rgba(25,118,210,0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1565c0, #1976d2)',
                    },
                  }
                : {
                    backgroundColor: '#fff',
                    color: '#65676b',
                    border: '1px solid #e0e0e0',
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    },
                  }),
            }}
          />
        ))}
      </Box>

      {/* Posts Feed */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : posts.length === 0 ? (
        <Card sx={{ borderRadius: 4, textAlign: 'center', py: 6 }}>
          <Typography variant="h6" color="text.secondary">
            No posts yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Be the first one to create a post!
          </Typography>
        </Card>
      ) : (
        posts.map((post, index) => (
          <PostCard
            key={post._id}
            post={post}
            onLike={handleLike}
            onComment={handleComment}
            style={{ animationDelay: `${index * 0.05}s` }}
          />
        ))
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{ borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Feed;
