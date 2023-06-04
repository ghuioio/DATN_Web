class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      const name = "user";
      const requestBody = { sender: name, message: message };
      
      fetch('http://localhost:5005/webhooks/rest/webhook', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'charset':'UTF-8',
        },
        credentials: "same-origin",
        body: JSON.stringify(requestBody),
      })
      .then(response => response.json())
      .then((response) => {
        const botMessage = response[0].text;
        this.actionProvider.handleMessage(botMessage);
      })
    }
  }
  
  export default MessageParser;
  