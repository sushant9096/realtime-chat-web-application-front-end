import './App.css';
import 'firebaseui/dist/firebaseui.css';
import {MuiAppBar} from "./components/common";
import {useEffect, useRef, useState} from "react";
import {auth as FirebaseUIAuth} from "firebaseui";
import {firebaseAuth} from "./config/firebase";
import {GoogleAuthProvider, onAuthStateChanged} from "firebase/auth";
import {Box, Grid, Paper, Typography} from "@mui/material";
import ChatHome from "./components/ChatHome/ChatHome";
import api, {api_url} from "./config/api";
import catchAsyncAPI from "./utils/catchAsyncAPI";
import io from "socket.io-client";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [firebaseUID, setFirebaseUID] = useState('');
  const [authenticatedUser, setAuthenticatedUser] = useState('');
  const firstAPICall = useRef(false);
  const socket = useRef(null);

  function getAuthenticatedUserByFirebaseUID(firebaseUID) {
    return new Promise(resolve => {
      const requestConfig = {
        url: `/user/firebase/${firebaseUID}`,
      }
      catchAsyncAPI(
        api(requestConfig),
        (response) => {
          if(response.data) {
            resolve(response.data)
          }
        },
        (error) => {
          console.log(error)
        }
      );
    })
  }

  useEffect(() => {
    if (!firstAPICall.current) {
      console.log('firstAPICall')
      firstAPICall.current = true;
      onAuthStateChanged(firebaseAuth, async (user) => {
        console.log('onAuthStateChanged')
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          setFirebaseUID(user.uid);
          user.getIdToken(true).then(async (idToken) => {
            api.interceptors.request.use(function (config) {
              const token = idToken;
              config.headers.Authorization =  token ? `Bearer ${token}` : '';
              return config;
            });
            if (socket.current === null) {
              console.error('socket.current === null')
              socket.current = io(api_url, {
                auth: {
                  token: idToken
                }
              });
              socket.current.on('connected', async () => {
                const authUserProfile = await getAuthenticatedUserByFirebaseUID(user.uid);
                setAuthenticatedUser(authUserProfile);
                setAuthenticated(true);
              });
            }
          }).catch((error) => {
            console.log(error)
          });
        } else {
          setAuthenticated(false)
        }
        return false;
      });

    }
  }, []);

  function loadFirebaseUI() {
    // Initialize the FirebaseUI Widget using Firebase.
    const uiConfig = {
      signInFlow: 'popup',
      signInOptions: [
        GoogleAuthProvider.PROVIDER_ID,
      ],
    };
    if (FirebaseUIAuth.AuthUI.getInstance()) {
      const ui = FirebaseUIAuth.AuthUI.getInstance()
      ui.start('#firebaseui-auth-container', uiConfig)
    } else {
      const ui = new FirebaseUIAuth.AuthUI(firebaseAuth)
      ui.start('#firebaseui-auth-container', uiConfig)
    }
  }

  const signOutUser = () => {
    firebaseAuth.signOut()
      .then(() => {
        console.log('Signed out successfully')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const FirebaseUIContainer = () => {
    const firebaseUILoaded = useRef(false);

    useEffect(() => {
      if (!firebaseUILoaded.current) {
        firebaseUILoaded.current = true;
        loadFirebaseUI();
      }
    }, [])

    return (
      <div
        id="firebaseui-auth-container"
      />
    )
  }

  return (
    <Grid
      container
      className="App"
      direction={"column"}
      style={{height: '100%'}}
    >
      <Grid
        item
      >
        <MuiAppBar
          signOutUser={signOutUser}
          authenticated={authenticated}
        />
      </Grid>
      <Grid
        item
        style={{flexGrow: 1}}
      >
        {
          authenticated ?
            <ChatHome
              socket={socket.current}
              firebaseUID={firebaseUID}
              authenticatedUser={authenticatedUser}
            />
            :
            <Box
              display={'flex'}
              maxWidth={500}
              mx={'auto'}
              mt={10}
              flexDirection={'column'}
            >
              <Paper
                elevation={24}
                style={{flexGrow: 1, background: 'transparent'}}
              >
                <Typography
                  color={"darkblue"}
                  variant="subtitle1"
                  textAlign={"center"}
                  style={{fontWeight: 900}}
                  p={5}
                >
                  Experience the thrill of instant connections:<br/>
                  Join our real-time chat community with just a click of 'Continue with Google'
                </Typography>
                <FirebaseUIContainer />
              </Paper>
            </Box>
        }
      </Grid>
    </Grid>
  );
}

export default App;
