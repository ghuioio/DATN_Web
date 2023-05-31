import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    right: theme.spacing(3),
    bottom: theme.spacing(3),
    zIndex: 1004
  },
  // conversation: {
  //   height: theme.spacing(50),
  //   padding: theme.spacing(1),
  //   border: `1px solid ${theme.palette.divider}`,
  //   borderRadius: theme.shape.borderRadius,
  //   overflowY: 'auto',
  //   boxShadow: theme.shadows[3],
  //   marginBottom: theme.spacing(1),
  // },
  button: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const theme = {
  background: '#C9FF8F',
  headerBgColor: '#197B22',
  headerFontSize: '20px',
  botBubbleColor: '#0F3789',
  headerFontColor: 'white',
  botFontColor: 'white',
  userBubbleColor: '#FF5733',
  userFontColor: 'white',
};

const config = {
  // botAvatar: "img.png",
  floating: true,
};

const steps = [
  {
    id: '0',
    message: 'Hey Geek!',
    trigger: '1',
  },
  {
    id: '1',
    message: 'Please write your username',
    trigger: '2'
  },
  {
    id: '2',
    user: true,
    trigger: async (value) => {
      const response = await fetch('http://localhost:5005/webhooks/rest/webhook', {
        method: 'POST',
        body: JSON.stringify({
          sender: 'user',
          message: value,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = await response.json();
      // Assuming Rasa responds with an array of messages, you can just take the first one.
      const botMessage = responseData[0]?.text || 'Sorry, I did not understand.';
      return { value: botMessage, trigger: 'bot-response' };
    },
  },
  {
    id: 'bot-response',
    message: ({ steps }) => steps['2'].value,
    trigger: '3',
  },
  {
    id: '3',
    user: true,
    trigger: '4',
  },
  {
    id: '4',
    message: " hi {previousValue}, how can I help you?",
    trigger: '5'
  },
  {
    id: '5',
    options: [
      { value: 1, label: 'View Courses' },
      { value: 2, label: 'Read Articles' },
    ],
    end: true
  },
];

const Chatbot = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Box className={classes.conversation}>
          <ThemeProvider theme={theme}>
            <ChatBot
              headerTitle="Book&Chill"
              steps={steps}
              {...config}
              opened={open}
              onClose={handleClose}
            />
          </ThemeProvider>
        </Box>
    </div>
  );
};

export default Chatbot;
