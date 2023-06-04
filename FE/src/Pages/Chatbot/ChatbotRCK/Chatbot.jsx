import React,{ useState } from "react";
import ChatBot from "react-chatbot-kit";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { ThemeProvider } from 'styled-components';
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
function Chatbot() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const config = {
        botName: "Chatbot",
        initialMessages: [{ type: "bot", text: "Hi, I'm your chatbot!" }],
        customStyles: {
            botMessageBox: {
              backgroundColor: '#376B7E',
            },
            chatButton: {
              backgroundColor: '#5ccc9d',
            },
          },
        };
    return (
        <div className={classes.root}>
            <Box className={classes.conversation}>
                <ThemeProvider theme={theme}>
                    <ChatBot
                        config={config}
                        messageParser={MessageParser}
                        actionProvider={ActionProvider}
                        theme={theme}
                        />
                    </ThemeProvider>
                </Box>
            </div>
    );
}

export default Chatbot;