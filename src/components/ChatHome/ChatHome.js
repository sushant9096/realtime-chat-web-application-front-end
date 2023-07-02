import React from 'react';
import {Grid, IconButton, InputAdornment, Paper, Stack, TextField, Typography} from "@mui/material";
import {Cancel, Refresh, Search, Send} from "@mui/icons-material";
import ConversionTile from "./ConversionTile";
import MessageTile from "./MessageTile";
import api from "../../config/api";
import catchAsyncAPI from "../../utils/catchAsyncAPI";
import ChatSearchTile from "./ChatSearchTile";

function ChatHome(props) {
  const {authenticatedUser, socket} = props;
  const [messages, setMessages] = React.useState([])
  const [conversations, setConversations] = React.useState([])
  const [conversionSearchTxt, setConversionSearchTxt] = React.useState('')
  const [conversionSearchResults, setConversionSearchResults] = React.useState([])
  const [selectedConversation, setSelectedConversation] = React.useState(null)
  const firstAPICall = React.useRef(false);
  const [messageTxt, setMessageTxt] = React.useState('')

  async function createConversation(receiverId) {
    const requestConfig = {
      url: '/conversation',
      method: 'post',
      data: {
        participants: [authenticatedUser.id, receiverId],
        type: 0
      }
    }
    console.log(requestConfig)
    catchAsyncAPI(
      api(requestConfig),
      response => {
        console.log('conversation created:\n', response.data)
        if (response.data) {
          refreshConversations();
          clearSearchResults();
        } else {
          alert('conversation creation failed')
        }
      },
      error => {
        console.log(error)
        if (error?.status === 400) {
          alert('Conversation already exists')
        }
      }
    );
  }

  const updateSearchResults = (results) => {
    console.log('upSearchResults');
    setConversionSearchResults(prevState => {
      prevState = [...results];
      return prevState;
    })
  }

  const updateConversionsList = (conversations) => {
    conversations?.forEach(conversation => {
      socket.emit('join chat', conversation.id)
    });
    setConversations(conversations)
  }

  function clearSearchResults() {
    setConversionSearchResults([])
    setConversionSearchTxt('')
  }

  function generateConversionTitle(conversation) {
    // console.log('generateConversionTitle: \n', conversation)
    /*const participants = conversation?.participant?.filter(participant => participant?.userId !== authenticatedUser?.id);
    if (participants[0]) {
      return participants[0]?.user?.firstName + ' ' + participants[0]?.user?.lastName
    }*/
    const user = conversation?.users?.find(user => user?.id !== authenticatedUser?.id);
    if (user) {
      return user?.firstName + ' ' + user?.lastName
    }
    return 'No Name'
  }

  function refreshConversations() {
    const requestConfig = {
      url: '/conversation',
    }
    catchAsyncAPI(
      api(requestConfig),
      response => {
        // console.log('conversations:\n', response.data)
        if (response.data && Array.isArray(response.data)) {
          setSelectedConversation(null);
          setMessages([]);
          updateConversionsList(response.data)
        }
      },
      error => {
        console.log(error)
      }
    );
  }

  function sendMessage() {
    if (messageTxt) {
      const requestConfig = {
        url: '/message',
        method: 'post',
        data: {
          conversationId: conversations[selectedConversation]?.id,
          senderId: authenticatedUser?.id,
          content: messageTxt
        }
      }
      catchAsyncAPI(
        api(requestConfig),
        response => {
          // console.log('message sent:\n', response.data)
          if (response.status === 201 && response.data) {
            const message = response.data;
            socket.emit('new message', message)
            setMessageTxt('')
            setMessages([...messages, message]);
          } else {
            alert('message sending failed')
          }
        },
        error => {
          console.log(error)
        }
      );
    }
  }

  React.useEffect(() => {
    if (!firstAPICall.current) {
      firstAPICall.current = true;
      refreshConversations();
      socket.on('message received', (message) => {
        // console.log('message received:\n', message)
        setMessages(prevState => {
          // console.log('prevState:\n', prevState)
          if (!prevState.find(msg => msg.id === message.id)) {
            // console.log('new message')
            prevState = [...prevState, message];
          }
          return prevState;
        })
      });
    }
  }, [])

  React.useEffect(() => {
    if (conversionSearchTxt && conversionSearchTxt.length > 2) {
      const requestConfig = {
        url: '/user/search?email=' +
          conversionSearchTxt +
          '&firstName=' +
          conversionSearchTxt +
          '&lastName=' +
          conversionSearchTxt
      }
      catchAsyncAPI(
        api(requestConfig),
        response => {
          if (Array?.isArray(response?.data)) {
            console.log(response?.data)
            console.log(authenticatedUser?.id)
            updateSearchResults(response?.data?.filter(user => user?.id !== authenticatedUser?.id))
          }
        },
        error => {
          console.log(error)
        }
      );
    }
  }, [conversionSearchTxt])

  React.useEffect(() => {
    if (selectedConversation !== null) {
      const requestConfig = {
        url: '/message?conversationId=' + conversations[selectedConversation]?.id,
      }
      catchAsyncAPI(
        api(requestConfig),
        response => {
          console.log('messages:\n', response.data)
          if (response.data && Array.isArray(response.data)) {
            setMessages(response.data)
          }
        },
        error => {
          console.log(error)
        }
      );
    }
  }, [selectedConversation])

  return (
    <Grid
      p={1}
      container
      direction="row"
      spacing={1}
    >
      <Grid
        item
        md={3}
        px={1}
        style={{
          height: '80vh',
        }}
      >
        <TextField
          style={{
            marginBottom: 5,
          }}
          label={"Chats"}
          variant={"filled"}
          value={conversionSearchTxt}
          onChange={(event) => {
            setConversionSearchTxt(event.target.value)
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton
                color={"primary"}>
                <Search/>
              </IconButton>
            </InputAdornment>
          }}
          fullWidth
        />
        <Paper
          className={"scrollbar1"}
          style={{
            overflowY: 'scroll',
            height: '100%',
            padding: "5px 5px"
          }}
        >
          <Stack
            spacing={1}
            direction="column"
            divider={<hr color={"#939393"}/>}
          >
            <Stack
              direction="row"
              justifyContent={"space-between"}
            >
              <Typography
                variant={'h6'}>
                {
                  conversionSearchResults?.length > 0 ? 'Search Results' : 'Conversations'
                }
              </Typography>
              {
                conversionSearchResults?.length > 0 ?
                  <IconButton
                    onClick={clearSearchResults}
                  >
                    <Cancel/>
                  </IconButton>
                  :
                  <IconButton
                    onClick={refreshConversations}
                  >
                    <Refresh/>
                  </IconButton>
              }
            </Stack>
            {
              conversionSearchResults.length === 0 && conversations?.map((conversation, index) => {
                return (
                  <ConversionTile
                    selectConversation={() => setSelectedConversation(index)}
                    selected={selectedConversation === index}
                    key={conversation.id}
                    title={generateConversionTitle(conversation)}
                  />
                )
              })
            }
            {
              conversionSearchResults?.map((user) =>
                <ChatSearchTile
                  key={user.id}
                  {...user}
                  createConversation={() => createConversation(user.id)}
                />
              )
            }
          </Stack>
        </Paper>
      </Grid>
      <Grid
        item
        md={9}
        style={{
          height: '80vh',
        }}
      >
        <Typography
          style={{
            background: "transparent",
            padding: '2px',
            marginBottom: '5px'
          }}
          color={"black"}
          variant={"h6"}
        >
          Chat Name
        </Typography>
        <Paper
          className={"scrollbar1"}
          style={{
            background: "transparent",
            overflowY: 'scroll',
            height: '90%',
            padding: "10px 5px"
          }}
        >
          <Stack
            spacing={1}
            direction="column"
          >
            {
              messages.map((message) => <MessageTile
                authenticatedUser={authenticatedUser}
                key={message.id}
                message={message}
              />)
            }
          </Stack>
        </Paper>
        {
          selectedConversation !== null &&
          <TextField
            value={messageTxt}
            onChange={(event) => {
              setMessageTxt(event.target.value)
            }}
            style={{
              marginTop: 5,
            }}
            label={"Send Message"}
            variant={"filled"}
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <IconButton
                  onClick={sendMessage}
                  color={"primary"}
                >
                  <Send/>
                </IconButton>
              </InputAdornment>
            }}
            fullWidth
          />
        }
      </Grid>
    </Grid>
  )
}

export default ChatHome;