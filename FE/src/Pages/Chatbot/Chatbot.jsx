import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import axios from 'axios';
import React, { useState } from 'react';
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
    id: '1',
    message: 'What do you want to ask?',
    trigger: 'userQuery',
  },
  {
    id: 'userQuery',
    user: true,
    trigger: '3',
  },
  {
    id: '3',
    component: <RasaComponent />,
    asMessage: true,
    waitAction: true,
    trigger: '1'
  },
];

function RasaComponent(props) {
  const [response, setResponse] = useState('');
  const [triggered, setTriggered] = useState(false);
  React.useEffect(() => {
    const fetchData = async () => {
      const message = {
        sender: 'test',
        message: props.steps.userQuery.message
      };

      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };

      const rasa_url = 'http://localhost:5005/webhooks/rest/webhook';

      try {
        const res = await axios.post(rasa_url, message, { headers });
        const botMessage = res.data[0]?.text || 'Sorry, I did not understand.';
        setResponse(botMessage);
      } catch (error) {
        console.error(error);
        setResponse("Error: Unable to connect to the bot service.");
      }
    };

    fetchData();
  }, [props.steps.userQuery.message]); 

  React.useEffect(() => {
      if (response !== null && !triggered) {
          props.triggerNextStep();
          setTriggered(true); // Update the triggered state to prevent retriggering
      }
  }, [response, triggered]);
  return <>{response}</>;
}


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
