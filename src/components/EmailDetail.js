import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Divider,
  Chip,
  Button,
  Toolbar,
  Paper,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Reply as ReplyIcon,
  Forward as ForwardIcon,
  Delete as DeleteIcon,
  Archive as ArchiveIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  AttachFile as AttachFileIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { useEmail } from '../context/EmailContext';

const EmailDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { emails, deleteEmail, markAsRead } = useEmail();

  const email = emails.find(e => e.id === parseInt(id));

  React.useEffect(() => {
    if (email && !email.read) {
      markAsRead(email.id);
    }
  }, [email, markAsRead]);

  if (!email) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: '#5f6368',
        }}
      >
        <Typography variant="h6" sx={{ mb: 1 }}>
          Email not found
        </Typography>
        <Button onClick={() => navigate('/')}>
          Back to Inbox
        </Button>
      </Box>
    );
  }

  const handleDelete = () => {
    deleteEmail(email.id);
    navigate('/');
  };

  const getInitials = (emailAddress) => {
    const name = emailAddress.split('@')[0];
    return name.substring(0, 2).toUpperCase();
  };

  const formatDate = (timestamp) => {
    return format(new Date(timestamp), 'MMM d, yyyy \'at\' h:mm a');
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Email Header */}
      <Paper
        elevation={0}
        sx={{
          borderBottom: '1px solid #e8eaed',
          backgroundColor: 'white',
        }}
      >
        <Toolbar sx={{ minHeight: '64px !important' }}>
          <IconButton onClick={() => navigate('/')} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton>
            {email.starred ? (
              <StarIcon sx={{ color: '#f4b400' }} />
            ) : (
              <StarBorderIcon />
            )}
          </IconButton>

          <IconButton>
            <ArchiveIcon />
          </IconButton>

          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Toolbar>

        <Box sx={{ px: 3, pb: 3 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 500 }}>
            {email.subject}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: '#1a73e8',
                fontSize: '14px',
                mr: 2,
              }}
            >
              {getInitials(email.from)}
            </Avatar>

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {email.from.split('@')[0]}
              </Typography>
              <Typography variant="body2" sx={{ color: '#5f6368' }}>
                {email.from}
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ color: '#5f6368' }}>
              {formatDate(email.timestamp)}
            </Typography>
          </Box>

          {email.attachments.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ color: '#5f6368', mb: 1 }}>
                Attachments:
              </Typography>
              {email.attachments.map((attachment, index) => (
                <Chip
                  key={index}
                  icon={<AttachFileIcon />}
                  label={attachment}
                  variant="outlined"
                  sx={{ mr: 1, mb: 1 }}
                  clickable
                />
              ))}
            </Box>
          )}

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<ReplyIcon />}
              sx={{
                textTransform: 'none',
                borderRadius: '20px',
                px: 3,
              }}
            >
              Reply
            </Button>
            <Button
              variant="outlined"
              startIcon={<ForwardIcon />}
              sx={{
                textTransform: 'none',
                borderRadius: '20px',
                px: 3,
              }}
            >
              Forward
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Email Body */}
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          p: 3,
          backgroundColor: 'white',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            lineHeight: 1.6,
            color: '#202124',
            whiteSpace: 'pre-wrap',
          }}
        >
          {email.body}
        </Typography>

        {email.attachments.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Attachments
            </Typography>
            {email.attachments.map((attachment, index) => (
              <Paper
                key={index}
                elevation={1}
                sx={{
                  p: 2,
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#f8f9fa',
                  },
                }}
              >
                <AttachFileIcon sx={{ mr: 2, color: '#5f6368' }} />
                <Typography variant="body2" sx={{ flexGrow: 1 }}>
                  {attachment}
                </Typography>
                <Button size="small" variant="outlined">
                  Download
                </Button>
              </Paper>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EmailDetail;
