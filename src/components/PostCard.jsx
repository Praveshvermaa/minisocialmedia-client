import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  Avatar,
  Typography,
  IconButton,
  Button,
  Collapse,
  TextField,
  Divider,
  Chip,
} from '@mui/material';
import {
  FavoriteBorder,
  Favorite,
  ChatBubbleOutline,
  Share,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import CommentSection from './CommentSection';

function PostCard({ post, onLike, onComment, style }) {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [likeAnimating, setLikeAnimating] = useState(false);

  const isLiked = post.likes?.some((like) => like.user === user?._id || like.user?._id === user?._id);
  const timeAgo = getTimeAgo(post.createdAt);

  const handleLike = () => {
    setLikeAnimating(true);
    onLike(post._id);
    setTimeout(() => setLikeAnimating(false), 300);
  };

  return (
    <Card
      className="fade-in-up"
      sx={{
        mb: 2.5,
        borderRadius: 4,
        transition: 'box-shadow 0.2s ease',
        '&:hover': {
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
      }}
      style={style}
    >
      <CardContent sx={{ p: 3, '&:last-child': { pb: 2 } }}>
        {/* User Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={post.user?.avatar}
            alt={post.user?.username}
            sx={{ width: 46, height: 46, mr: 1.5, border: '2px solid #e0e0e0' }}
          />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1c1e21' }}>
                {post.user?.username}
              </Typography>
              {post.user?._id !== user?._id && (
                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    borderRadius: 25,
                    fontSize: '0.7rem',
                    px: 1.5,
                    py: 0.2,
                    fontWeight: 600,
                    borderColor: '#1976d2',
                    color: '#1976d2',
                    minWidth: 'auto',
                    '&:hover': {
                      backgroundColor: 'rgba(25,118,210,0.04)',
                    },
                  }}
                >
                  Follow
                </Button>
              )}
            </Box>
            <Typography variant="caption" sx={{ color: '#65676b' }}>
              @{post.user?.username?.toLowerCase()} · {timeAgo}
            </Typography>
          </Box>
        </Box>

        {/* Post Text */}
        {post.text && (
          <Typography
            variant="body1"
            sx={{
              mb: post.image ? 2 : 1,
              color: '#1c1e21',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {post.text}
          </Typography>
        )}

        {/* Post Image */}
        {post.image && (
          <Box
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              mb: 1,
              backgroundColor: '#f0f2f5',
            }}
          >
            <img
              src={post.image}
              alt="Post"
              style={{
                width: '100%',
                maxHeight: 500,
                objectFit: 'cover',
                display: 'block',
              }}
              loading="lazy"
            />
          </Box>
        )}

        {/* Action Buttons */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 1.5,
            pt: 1,
            borderTop: '1px solid #f0f2f5',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                onClick={handleLike}
                size="small"
                className={likeAnimating ? 'like-animation' : ''}
                sx={{
                  color: isLiked ? '#e91e63' : '#65676b',
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    backgroundColor: isLiked
                      ? 'rgba(233,30,99,0.08)'
                      : 'rgba(0,0,0,0.04)',
                  },
                }}
              >
                {isLiked ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
              <Typography
                variant="body2"
                sx={{ color: isLiked ? '#e91e63' : '#65676b', fontWeight: 500 }}
              >
                {post.likes?.length || 0}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                onClick={() => setShowComments(!showComments)}
                size="small"
                sx={{
                  color: '#65676b',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
                }}
              >
                <ChatBubbleOutline />
              </IconButton>
              <Typography variant="body2" sx={{ color: '#65676b', fontWeight: 500 }}>
                {post.comments?.length || 0}
              </Typography>
            </Box>
          </Box>

          <IconButton
            size="small"
            sx={{
              color: '#65676b',
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
            }}
          >
            <Share fontSize="small" />
          </IconButton>
        </Box>

        {/* Comments Section */}
        <Collapse in={showComments}>
          <CommentSection
            comments={post.comments || []}
            onAddComment={(text) => onComment(post._id, text)}
          />
        </Collapse>
      </CardContent>
    </Card>
  );
}

function getTimeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now - past;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return past.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: past.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}

export default PostCard;
