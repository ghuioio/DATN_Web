import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import axios from 'axios';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    right: theme.spacing(3),
    bottom: theme.spacing(3),
    zIndex: 1004
  },
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

const initialSteps = [
  {
    id: '1',
    message: 'What do you want to ask?',
    trigger: 'get-user-input',
  },
  {
    id: 'get-user-input',
    user: true,
    trigger: 'process-user-input',
  },
  {
    id: 'process-user-input',
    component: <RasaComponent />,
    asMessage: true,
    waitAction: true,
    trigger: 'get-user-input',
  },
];

// RasaComponent
function RasaComponent(props) {
  const [response, setResponse] = useState('');
  const { previousStep, triggerNextStep } = props;

  React.useEffect(() => {
    const fetchData = async () => {
      const message = {
        sender: 'test',
        message: previousStep.value,
      };

      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };

      const rasa_url = 'http://localhost:5005/webhooks/rest/webhook';

      try {
        const res = await axios.post(rasa_url, message, { headers });
        const botMessage = res.data[0]?.text || 'Sorry, I did not understand.';
        setResponse(botMessage);
        triggerNextStep();
      } catch (error) {
        console.error(error);
        setResponse("Error: Unable to connect to the bot service.");
        triggerNextStep();
      }
    };

    fetchData();
  }, [previousStep, triggerNextStep]);

  return <>{response}</>;
}

// Chatbot component
const Chatbot = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [steps, setSteps] = useState(initialSteps);

  const handleEnd = ({ values, steps }) => {
    const newId = uuidv4();
    setSteps(prevSteps => [
      ...prevSteps,
      { id: newId, user: true, trigger: `process-${newId}` },
      {
        id: `process-${newId}`,
        component: <RasaComponent />,
        asMessage: true,
        waitAction: true,
        trigger: newId,
      },
    ]);
  };

  return (
    <div className={classes.root}>
      <Box className={classes.conversation}>
        <ThemeProvider theme={theme}>
          <ChatBot
            steps={steps}
            handleEnd={handleEnd}
            {...config}
            opened={open}
            // onClose={handleClose}
          />
        </ThemeProvider>
      </Box>
    </div>
  );
};

export default Chatbot;
