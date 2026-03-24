import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Person } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signup(username, email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        p: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 420,
          width: '100%',
          borderRadius: 4,
          overflow: 'visible',
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}
            >
              MiniSocial
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Create your account and start posting!
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: '#9e9e9e' }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: '#9e9e9e' }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              helperText="Minimum 6 characters"
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#9e9e9e' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={loading}
              size="large"
              sx={{
                py: 1.5,
                fontSize: '1rem',
                background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                boxShadow: '0 4px 15px rgba(25,118,210,0.35)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1565c0, #1976d2)',
                  boxShadow: '0 6px 20px rgba(25,118,210,0.45)',
                },
              }}
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </Button>
          </form>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link
                to="/login"
                style={{
                  color: '#1976d2',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Signup;
