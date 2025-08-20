import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Button,
  Divider,
  Typography,
  Badge,
} from '@mui/material';
import {
  Inbox as InboxIcon,
  Send as SendIcon,
  Drafts as DraftsIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
  Label as LabelIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useEmail } from '../context/EmailContext';

const drawerWidth = 256;

const Sidebar = ({ open, onComposeClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { emails, currentFolder, setCurrentFolder } = useEmail();

  const getUnreadCount = (folder) => {
    return emails.filter(email => email.folder === folder && !email.read).length;
  };

  const getEmailCount = (folder) => {
    return emails.filter(email => email.folder === folder).length;
  };

  const menuItems = [
    {
      text: 'Inbox',
      icon: <InboxIcon />,
      path: '/inbox',
      folder: 'inbox',
      count: getUnreadCount('inbox'),
      totalCount: getEmailCount('inbox'),
    },
    {
      text: 'Starred',
      icon: <StarIcon />,
      path: '/starred',
      folder: 'starred',
      count: emails.filter(email => email.starred && !email.read).length,
    },
    {
      text: 'Sent',
      icon: <SendIcon />,
      path: '/sent',
      folder: 'sent',
      count: getEmailCount('sent'),
    },
    {
      text: 'Drafts',
      icon: <DraftsIcon />,
      path: '/drafts',
      folder: 'drafts',
      count: getEmailCount('drafts'),
    },
    {
      text: 'Trash',
      icon: <DeleteIcon />,
      path: '/trash',
      folder: 'trash',
      count: getEmailCount('trash'),
    },
  ];

  const handleNavigation = (path, folder) => {
    navigate(path);
    setCurrentFolder(folder);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'white',
          borderRight: '1px solid #e8eaed',
          marginTop: '64px',
        },
      }}
    >
      <Box sx={{ overflow: 'auto', pt: 2 }}>
        <Box sx={{ px: 2, pb: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onComposeClick}
            sx={{
              borderRadius: '24px',
              textTransform: 'none',
              boxShadow: '0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15)',
              '&:hover': {
                boxShadow: '0 1px 3px 0 rgba(60, 64, 67, 0.3), 0 4px 8px 3px rgba(60, 64, 67, 0.15)',
              },
            }}
            fullWidth
          >
            Compose
          </Button>
        </Box>

        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.path, item.folder)}
                sx={{
                  mx: 1,
                  borderRadius: '0 16px 16px 0',
                  backgroundColor: isActive(item.path) ? '#e8f0fe' : 'transparent',
                  color: isActive(item.path) ? '#1a73e8' : '#5f6368',
                  '&:hover': {
                    backgroundColor: isActive(item.path) ? '#e8f0fe' : '#f1f3f4',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive(item.path) ? '#1a73e8' : '#5f6368',
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '14px',
                    fontWeight: isActive(item.path) ? 500 : 400,
                  }}
                />
                {item.count > 0 && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: isActive(item.path) ? '#1a73e8' : '#5f6368',
                      fontWeight: 500,
                    }}
                  >
                    {item.count}
                  </Typography>
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ px: 2 }}>
          <Typography
            variant="caption"
            sx={{
              color: '#5f6368',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Labels
          </Typography>
        </Box>

        <List>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                mx: 1,
                borderRadius: '0 16px 16px 0',
                '&:hover': {
                  backgroundColor: '#f1f3f4',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#5f6368', minWidth: 40 }}>
                <LabelIcon />
              </ListItemIcon>
              <ListItemText
                primary="Important"
                primaryTypographyProps={{
                  fontSize: '14px',
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              sx={{
                mx: 1,
                borderRadius: '0 16px 16px 0',
                '&:hover': {
                  backgroundColor: '#f1f3f4',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#5f6368', minWidth: 40 }}>
                <LabelIcon />
              </ListItemIcon>
              <ListItemText
                primary="Personal"
                primaryTypographyProps={{
                  fontSize: '14px',
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              sx={{
                mx: 1,
                borderRadius: '0 16px 16px 0',
                '&:hover': {
                  backgroundColor: '#f1f3f4',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#5f6368', minWidth: 40 }}>
                <LabelIcon />
              </ListItemIcon>
              <ListItemText
                primary="Work"
                primaryTypographyProps={{
                  fontSize: '14px',
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
