import React, { createContext, useContext, useReducer, useEffect } from 'react';

const EmailContext = createContext();

const initialState = {
  emails: [],
  selectedEmails: [],
  currentFolder: 'inbox',
  searchQuery: '',
  loading: false,
};

const emailReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EMAILS':
      return { ...state, emails: action.payload };

    case 'ADD_EMAIL':
      return { ...state, emails: [action.payload, ...state.emails] };

    case 'DELETE_EMAIL':
      return {
        ...state,
        emails: state.emails.filter(email => email.id !== action.payload),
        selectedEmails: state.selectedEmails.filter(id => id !== action.payload)
      };

    case 'MARK_AS_READ':
      return {
        ...state,
        emails: state.emails.map(email =>
          email.id === action.payload ? { ...email, read: true } : email
        )
      };

    case 'MARK_AS_UNREAD':
      return {
        ...state,
        emails: state.emails.map(email =>
          email.id === action.payload ? { ...email, read: false } : email
        )
      };

    case 'TOGGLE_EMAIL_SELECTION':
      const emailId = action.payload;
      const isSelected = state.selectedEmails.includes(emailId);
      return {
        ...state,
        selectedEmails: isSelected
          ? state.selectedEmails.filter(id => id !== emailId)
          : [...state.selectedEmails, emailId]
      };

    case 'SELECT_ALL_EMAILS':
      return {
        ...state,
        selectedEmails: state.emails.map(email => email.id)
      };

    case 'DESELECT_ALL_EMAILS':
      return {
        ...state,
        selectedEmails: []
      };

    case 'SET_CURRENT_FOLDER':
      return { ...state, currentFolder: action.payload };

    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };

    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};

export const EmailProvider = ({ children }) => {
  const [state, dispatch] = useReducer(emailReducer, initialState);

  // Generate sample emails on component mount
  useEffect(() => {
    const sampleEmails = [
      {
        id: 1,
        from: 'john.doe@example.com',
        to: 'me@gmail.com',
        subject: 'Project Update - Q4 Goals',
        body: 'Hi team, I wanted to share the latest updates on our Q4 project goals. We\'ve made significant progress on the new feature implementation and are on track to meet our deadlines. Please review the attached documents and let me know if you have any questions.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        read: false,
        starred: false,
        folder: 'inbox',
        attachments: ['project_update.pdf']
      },
      {
        id: 2,
        from: 'sarah.wilson@company.com',
        to: 'me@gmail.com',
        subject: 'Meeting Reminder - Tomorrow at 2 PM',
        body: 'Just a friendly reminder about our team meeting tomorrow at 2 PM. We\'ll be discussing the upcoming product launch and reviewing the marketing strategy. Please come prepared with your updates.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: true,
        starred: true,
        folder: 'inbox',
        attachments: []
      },
      {
        id: 3,
        from: 'support@techservice.com',
        to: 'me@gmail.com',
        subject: 'Your ticket #12345 has been resolved',
        body: 'Thank you for contacting our support team. Your technical issue has been resolved. Please let us know if you need any further assistance or have additional questions.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
        read: true,
        starred: false,
        folder: 'inbox',
        attachments: []
      },
      {
        id: 4,
        from: 'newsletter@techblog.com',
        to: 'me@gmail.com',
        subject: 'Weekly Tech Digest - Latest in AI and ML',
        body: 'This week\'s top stories: New breakthroughs in machine learning, the future of artificial intelligence, and how tech companies are adapting to remote work. Read more in our latest digest.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        read: false,
        starred: false,
        folder: 'inbox',
        attachments: []
      },
      {
        id: 5,
        from: 'me@gmail.com',
        to: 'client@business.com',
        subject: 'Proposal for Q1 2024',
        body: 'Dear Client, Please find attached our detailed proposal for Q1 2024. We\'ve included all the requested features and pricing information. Looking forward to your feedback.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        read: true,
        starred: false,
        folder: 'sent',
        attachments: ['proposal_q1_2024.pdf']
      },
      {
        id: 6,
        from: 'me@gmail.com',
        to: 'team@company.com',
        subject: 'Draft: Weekly Team Update',
        body: 'Team, Here\'s our weekly update: 1. Project A is 75% complete 2. New client onboarding scheduled for next week 3. Budget review meeting on Friday Let me know if you need any clarification.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
        read: true,
        starred: false,
        folder: 'drafts',
        attachments: []
      }
    ];

    dispatch({ type: 'SET_EMAILS', payload: sampleEmails });
  }, []);

  const value = {
    ...state,
    dispatch,
    addEmail: (email) => dispatch({ type: 'ADD_EMAIL', payload: email }),
    deleteEmail: (id) => dispatch({ type: 'DELETE_EMAIL', payload: id }),
    markAsRead: (id) => dispatch({ type: 'MARK_AS_READ', payload: id }),
    markAsUnread: (id) => dispatch({ type: 'MARK_AS_UNREAD', payload: id }),
    toggleEmailSelection: (id) => dispatch({ type: 'TOGGLE_EMAIL_SELECTION', payload: id }),
    selectAllEmails: () => dispatch({ type: 'SELECT_ALL_EMAILS' }),
    deselectAllEmails: () => dispatch({ type: 'DESELECT_ALL_EMAILS' }),
    setCurrentFolder: (folder) => dispatch({ type: 'SET_CURRENT_FOLDER', payload: folder }),
    setSearchQuery: (query) => dispatch({ type: 'SET_SEARCH_QUERY', payload: query }),
    setLoading: (loading) => dispatch({ type: 'SET_LOADING', payload: loading }),
  };

  return (
    <EmailContext.Provider value={value}>
      {children}
    </EmailContext.Provider>
  );
};

export const useEmail = () => {
  const context = useContext(EmailContext);
  if (!context) {
    throw new Error('useEmail must be used within an EmailProvider');
  }
  return context;
};
