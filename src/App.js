import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import EmailList from './components/EmailList';
import EmailDetail from './components/EmailDetail';
import ComposeEmail from './components/ComposeEmail';
import { EmailProvider } from './context/EmailContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a73e8',
    },
    background: {
      default: '#f6f8fa',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [composeOpen, setComposeOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleCompose = () => {
    setComposeOpen(!composeOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <EmailProvider>
        <Router>
          <Box sx={{ display: 'flex', height: '100vh' }}>
            <Header
              onMenuClick={toggleSidebar}
              onComposeClick={toggleCompose}
            />

            <Sidebar
              open={sidebarOpen}
              onComposeClick={toggleCompose}
            />

            <Box
              component="main"
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                marginTop: '64px',
                marginLeft: sidebarOpen ? '256px' : '72px',
                transition: 'margin-left 0.3s ease',
              }}
            >
              <Routes>
                <Route path="/" element={<EmailList />} />
                <Route path="/inbox" element={<EmailList />} />
                <Route path="/sent" element={<EmailList folder="sent" />} />
                <Route path="/drafts" element={<EmailList folder="drafts" />} />
                <Route path="/trash" element={<EmailList folder="trash" />} />
                <Route path="/email/:id" element={<EmailDetail />} />
              </Routes>
            </Box>

            {composeOpen && (
              <ComposeEmail
                open={composeOpen}
                onClose={() => setComposeOpen(false)}
              />
            )}
          </Box>
        </Router>
      </EmailProvider>
    </ThemeProvider>
  );
}

export default App;
