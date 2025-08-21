# Gmail Clone


<img width="2550" height="732" alt="image" src="https://github.com/user-attachments/assets/66297939-40b0-43e9-acbe-01f5fdc84600" />

A modern, responsive Gmail clone built with React JS and Material-UI. This application replicates the core functionality and design of Gmail with a clean, intuitive interface.

## Features

### 🎯 Core Features
- **Email Management**: View, compose, send, and delete emails
- **Folder Organization**: Inbox, Sent, Drafts, Trash, and Starred folders
- **Search Functionality**: Search through emails by subject, sender, or content
- **Email Actions**: Mark as read/unread, star, archive, and delete emails
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 📧 Email Features
- **Compose Window**: Gmail-style compose dialog with minimize/maximize options
- **Email Detail View**: Full email display with attachments support
- **Bulk Actions**: Select multiple emails for batch operations
- **Real-time Updates**: Email status updates in real-time
- **Attachment Support**: View and manage email attachments

### 🎨 UI/UX Features
- **Gmail-like Design**: Authentic Gmail interface with Material Design
- **Dark/Light Theme**: Clean, modern styling
- **Interactive Elements**: Hover effects, smooth transitions, and animations
- **Accessibility**: Keyboard navigation and screen reader support
- **Custom Scrollbars**: Styled scrollbars for better visual appeal

## Technology Stack

- **React 18**: Modern React with hooks and functional components
- **Material-UI (MUI)**: Comprehensive UI component library
- **React Router**: Client-side routing for navigation
- **Date-fns**: Modern date utility library
- **Context API**: State management for email data
- **CSS-in-JS**: Styled components with Material-UI's sx prop

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gmailClone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.js       # Top navigation bar
│   ├── Sidebar.js      # Left sidebar with folders
│   ├── EmailList.js    # Email list view
│   ├── EmailDetail.js  # Individual email view
│   └── ComposeEmail.js # Compose email dialog
├── context/            # React context
│   └── EmailContext.js # Email state management
├── App.js              # Main application component
├── index.js            # Application entry point
└── index.css           # Global styles
```

## Usage

### Navigation
- **Sidebar**: Click on folder names to navigate between different email folders
- **Search**: Use the search bar in the header to find specific emails
- **Compose**: Click the "Compose" button to create a new email

### Email Management
- **View Email**: Click on any email in the list to open it in detail view
- **Select Emails**: Use checkboxes to select multiple emails for bulk actions
- **Star Emails**: Click the star icon to mark important emails
- **Delete Emails**: Use the delete button to remove emails
- **Mark as Read/Unread**: Use the toolbar actions to change email status

### Compose Email
- **Open Compose**: Click the "Compose" button in the sidebar
- **Fill Details**: Enter recipient, subject, and email body
- **Attach Files**: Use the attachment button to add files
- **Send**: Click "Send" to send the email
- **Minimize/Maximize**: Use the window controls to resize the compose window

## Sample Data

The application comes with sample emails to demonstrate functionality:
- Project updates and meeting reminders
- Support tickets and newsletters
- Sent emails and drafts
- Various attachment types

## Customization

### Styling
- Modify `src/index.css` for global styles
- Update Material-UI theme in `src/App.js`
- Customize component styles using the `sx` prop

### Adding Features
- **Email Categories**: Add new folders in the sidebar
- **Email Templates**: Create reusable email templates
- **Advanced Search**: Implement filters and advanced search options
- **Email Signatures**: Add customizable email signatures
- **Notifications**: Implement real-time email notifications

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Inspired by Gmail's design and functionality
- Built with Material-UI components
- Uses modern React patterns and best practices

---

**Note**: This is a frontend-only implementation. For a production application, you would need to integrate with a backend email service and implement proper authentication and email protocols (SMTP, IMAP, etc.).
