import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Checkbox,
  IconButton,
  Typography,
  Toolbar,
  Tooltip,
  Divider,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Archive as ArchiveIcon,
  Delete as DeleteIcon,
  MarkEmailRead as MarkEmailReadIcon,
  MarkEmailUnread as MarkEmailUnreadIcon,
  MoreVert as MoreVertIcon,
  AttachFile as AttachFileIcon,
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { useEmail } from '../context/EmailContext';

const EmailList = ({ folder = 'inbox' }) => {
  const navigate = useNavigate();
  const { emails, selectedEmails, searchQuery, toggleEmailSelection, selectAllEmails, deselectAllEmails, deleteEmail, markAsRead, markAsUnread } = useEmail();
  const [hoveredEmail, setHoveredEmail] = useState(null);

  const filteredEmails = useMemo(() => {
    let filtered = emails.filter(email => {
      // Filter by folder
      if (folder === 'starred') {
        return email.starred;
      }
      return email.folder === folder;
    });

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(email =>
        email.subject.toLowerCase().includes(query) ||
        email.from.toLowerCase().includes(query) ||
        email.body.toLowerCase().includes(query)
      );
    }

    return filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }, [emails, folder, searchQuery]);

  const handleEmailClick = (email) => {
    if (!email.read) {
      markAsRead(email.id);
    }
    navigate(`/email/${email.id}`);
  };

  const handleSelectAll = () => {
    if (selectedEmails.length === filteredEmails.length) {
      deselectAllEmails();
    } else {
      selectAllEmails();
    }
  };

  const handleDeleteSelected = () => {
    selectedEmails.forEach(id => deleteEmail(id));
  };

  const handleArchiveSelected = () => {
    // Archive functionality would be implemented here
    console.log('Archive selected emails:', selectedEmails);
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const emailDate = new Date(timestamp);
    const diffInHours = (now - emailDate) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return formatDistanceToNow(emailDate, { addSuffix: true });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return emailDate.toLocaleDateString();
    }
  };

  const getInitials = (email) => {
    const name = email.from.split('@')[0];
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Toolbar */}
      <Toolbar
        sx={{
          borderBottom: '1px solid #e8eaed',
          backgroundColor: 'white',
          minHeight: '48px !important',
        }}
      >
        <Checkbox
          checked={selectedEmails.length === filteredEmails.length && filteredEmails.length > 0}
          indeterminate={selectedEmails.length > 0 && selectedEmails.length < filteredEmails.length}
          onChange={handleSelectAll}
          size="small"
        />

        {selectedEmails.length > 0 ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Archive">
              <IconButton size="small" onClick={handleArchiveSelected}>
                <ArchiveIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton size="small" onClick={handleDeleteSelected}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Mark as read">
              <IconButton size="small">
                <MarkEmailReadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Mark as unread">
              <IconButton size="small">
                <MarkEmailUnreadIcon />
              </IconButton>
            </Tooltip>
          </Box>
        ) : (
          <Typography variant="body2" sx={{ color: '#5f6368' }}>
            {filteredEmails.length} of {emails.length}
          </Typography>
        )}
      </Toolbar>

      {/* Email List */}
      <List sx={{ flexGrow: 1, overflow: 'auto' }}>
        {filteredEmails.map((email) => (
          <React.Fragment key={email.id}>
            <ListItem
              disablePadding
              className={`email-item ${!email.read ? 'unread' : ''}`}
              onMouseEnter={() => setHoveredEmail(email.id)}
              onMouseLeave={() => setHoveredEmail(null)}
              sx={{
                borderBottom: '1px solid #e8eaed',
                backgroundColor: !email.read ? '#f2f6fc' : 'white',
                '&:hover': {
                  backgroundColor: !email.read ? '#e8f0fe' : '#f8f9fa',
                  boxShadow: '0 1px 3px 0 rgba(60, 64, 67, 0.3), 0 4px 8px 3px rgba(60, 64, 67, 0.15)',
                },
              }}
            >
              <Checkbox
                checked={selectedEmails.includes(email.id)}
                onChange={() => toggleEmailSelection(email.id)}
                size="small"
                sx={{ mr: 1 }}
              />

              <IconButton
                size="small"
                sx={{ mr: 1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  // Toggle star functionality would be implemented here
                }}
              >
                {email.starred ? (
                  <StarIcon sx={{ color: '#f4b400' }} />
                ) : (
                  <StarBorderIcon />
                )}
              </IconButton>

              <ListItemButton
                onClick={() => handleEmailClick(email)}
                sx={{
                  flexGrow: 1,
                  py: 1,
                  px: 2,
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: '#1a73e8',
                    fontSize: '12px',
                    mr: 2,
                  }}
                >
                  {getInitials(email)}
                </Avatar>

                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: !email.read ? 600 : 400,
                          color: !email.read ? '#202124' : '#5f6368',
                          flexGrow: 1,
                        }}
                      >
                        {email.from.split('@')[0]}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: '#5f6368' }}
                      >
                        {formatTime(email.timestamp)}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: !email.read ? 600 : 400,
                          color: !email.read ? '#202124' : '#5f6368',
                          flexGrow: 1,
                        }}
                        noWrap
                      >
                        {email.subject}
                      </Typography>
                      {email.attachments.length > 0 && (
                        <AttachFileIcon sx={{ fontSize: 16, color: '#5f6368' }} />
                      )}
                    </Box>
                  }
                />
              </ListItemButton>

              {hoveredEmail === email.id && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Tooltip title="Archive">
                    <IconButton size="small">
                      <ArchiveIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small" onClick={(e) => {
                      e.stopPropagation();
                      deleteEmail(email.id);
                    }}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="More">
                    <IconButton size="small">
                      <MoreVertIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            </ListItem>
          </React.Fragment>
        ))}
      </List>

      {filteredEmails.length === 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px',
            color: '#5f6368',
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            {searchQuery ? 'No emails found' : 'No emails in this folder'}
          </Typography>
          <Typography variant="body2">
            {searchQuery ? 'Try adjusting your search terms' : 'Your emails will appear here'}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default EmailList;
