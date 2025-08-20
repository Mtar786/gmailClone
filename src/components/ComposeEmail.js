import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
  Typography,
  Divider,
  Chip,
} from '@mui/material';
import {
  Close as CloseIcon,
  Minimize as MinimizeIcon,
  CropSquare as CropSquareIcon,
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import { useEmail } from '../context/EmailContext';

const ComposeEmail = ({ open, onClose }) => {
  const { addEmail } = useEmail();
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    body: '',
  });
  const [attachments, setAttachments] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSend = () => {
    if (formData.to && formData.subject && formData.body) {
      const newEmail = {
        id: Date.now(),
        from: 'me@gmail.com',
        to: formData.to,
        subject: formData.subject,
        body: formData.body,
        timestamp: new Date(),
        read: true,
        starred: false,
        folder: 'sent',
        attachments: attachments.map(att => att.name),
      };

      addEmail(newEmail);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({ to: '', subject: '', body: '' });
    setAttachments([]);
    setIsMinimized(false);
    setIsMaximized(false);
    onClose();
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newAttachments = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
    }));
    setAttachments([...attachments, ...newAttachments]);
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      fullWidth={isMaximized}
      PaperProps={{
        sx: {
          width: isMaximized ? '100vw' : 600,
          height: isMaximized ? '100vh' : isMinimized ? 'auto' : 500,
          maxWidth: isMaximized ? '100vw' : 600,
          maxHeight: isMaximized ? '100vh' : 500,
          position: 'fixed',
          bottom: isMinimized ? 0 : 'auto',
          right: isMinimized ? 20 : 'auto',
          left: isMinimized ? 'auto' : 'auto',
          top: isMinimized ? 'auto' : 'auto',
          margin: isMinimized ? 0 : 'auto',
          borderRadius: isMinimized ? '8px 8px 0 0' : 2,
          boxShadow: '0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.2)',
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: '#404040',
          color: 'white',
          py: 1,
          px: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          New Message
        </Typography>
        <Box>
          <IconButton
            size="small"
            onClick={() => setIsMinimized(!isMinimized)}
            sx={{ color: 'white' }}
          >
            <MinimizeIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => setIsMaximized(!isMaximized)}
            sx={{ color: 'white' }}
          >
            <CropSquareIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={handleClose}
            sx={{ color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      {!isMinimized && (
        <>
          <DialogContent sx={{ p: 0 }}>
            <Box sx={{ p: 2 }}>
              <TextField
                fullWidth
                placeholder="Recipients"
                value={formData.to}
                onChange={handleInputChange('to')}
                variant="standard"
                sx={{ mb: 2 }}
                InputProps={{
                  style: { fontSize: '14px' },
                }}
              />

              <TextField
                fullWidth
                placeholder="Subject"
                value={formData.subject}
                onChange={handleInputChange('subject')}
                variant="standard"
                sx={{ mb: 2 }}
                InputProps={{
                  style: { fontSize: '14px' },
                }}
              />

              <Divider sx={{ mb: 2 }} />

              <TextField
                fullWidth
                placeholder="Compose email"
                value={formData.body}
                onChange={handleInputChange('body')}
                variant="standard"
                multiline
                rows={isMaximized ? 20 : 10}
                sx={{ mb: 2 }}
                InputProps={{
                  style: { fontSize: '14px' },
                }}
              />

              {attachments.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ color: '#5f6368', mb: 1 }}>
                    Attachments:
                  </Typography>
                  {attachments.map((attachment, index) => (
                    <Chip
                      key={index}
                      label={`${attachment.name} (${formatFileSize(attachment.size)})`}
                      onDelete={() => removeAttachment(index)}
                      variant="outlined"
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
              )}
            </Box>
          </DialogContent>

          <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
            <Box>
              <input
                accept="*/*"
                style={{ display: 'none' }}
                id="file-upload"
                multiple
                type="file"
                onChange={handleFileUpload}
              />
              <label htmlFor="file-upload">
                <IconButton component="span" size="small">
                  <AttachFileIcon />
                </IconButton>
              </label>
            </Box>

            <Box>
              <Button
                variant="contained"
                startIcon={<SendIcon />}
                onClick={handleSend}
                disabled={!formData.to || !formData.subject || !formData.body}
                sx={{
                  textTransform: 'none',
                  borderRadius: '20px',
                  px: 3,
                }}
              >
                Send
              </Button>
            </Box>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default ComposeEmail;
