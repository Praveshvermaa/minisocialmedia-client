import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  Box,
  InputBase,
  Menu,
  MenuItem,
} from '@mui/material';
import { Search, Logout, Person } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/login');
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: '#fff',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <Toolbar sx={{ maxWidth: 900, width: '100%', mx: 'auto', px: { xs: 1, sm: 2 } }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            cursor: 'pointer',
            mr: 2,
          }}
          onClick={() => navigate('/')}
        >
          MiniSocial
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f0f2f5',
            borderRadius: 25,
            px: 2,
            py: 0.5,
            flex: 1,
            maxWidth: 400,
          }}
        >
          <Search sx={{ color: '#65676b', mr: 1, fontSize: 20 }} />
          <InputBase
            placeholder="Search posts, users..."
            sx={{ flex: 1, fontSize: 14 }}
          />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            variant="body2"
            sx={{ color: '#1c1e21', fontWeight: 500, display: { xs: 'none', sm: 'block' } }}
          >
            {user?.username}
          </Typography>
          <IconButton onClick={handleMenu} size="small">
            <Avatar
              src={user?.avatar}
              alt={user?.username}
              sx={{ width: 36, height: 36, border: '2px solid #1976d2' }}
            />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              sx: {
                mt: 1,
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
              },
            }}
          >
            <MenuItem onClick={handleClose}>
              <Person sx={{ mr: 1, fontSize: 20 }} />
              {user?.username}
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Logout sx={{ mr: 1, fontSize: 20 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
