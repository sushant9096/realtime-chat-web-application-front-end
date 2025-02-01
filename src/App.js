import "./App.css";
import "firebaseui/dist/firebaseui.css";
import { MuiAppBar } from "./components/common";
import { useEffect, useRef, useState } from "react";
import { auth as FirebaseUIAuth } from "firebaseui";
import { firebaseAuth } from "./config/firebase";
import { GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import ChatHome from "./components/ChatHome/ChatHome";
import api, { api_url } from "./config/api";
import catchAsyncAPI from "./utils/catchAsyncAPI";
import { io } from "socket.io-client";
import AppDialog from "./components/ChatHome/AppDialog";
import PrivacyPolicy from "./components/ChatHome/PrivacyPolicy";

let socket = undefined;
let count = 0;

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [firebaseUID, setFirebaseUID] = useState("");
  const [authenticatedUser, setAuthenticatedUser] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);

  // Dialog States
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogDescription, setDialogDescription] = useState("");
  const [dialogComponent, setDialogComponent] = useState(undefined);

  function getAuthenticatedUserByFirebaseUID(firebaseUID) {
    return new Promise((resolve) => {
      const requestConfig = {
        url: `/user/firebase/${firebaseUID}`,
      };
      catchAsyncAPI(
        api(requestConfig),
        (response) => {
          if (response.data) {
            resolve(response.data);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  useEffect(() => {
    console.log("First Render");
    const unsubscribeFirebaseAuthListener = onAuthStateChanged(
      firebaseAuth,
      (user) => {
        console.log("onAuthStateChanged");
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          setFirebaseUID(user.uid);
        }
        return false;
      }
    );
    return () => {
      console.log("Unmounting: First Render");
      socket && socket.removeAllListeners() && socket.disconnect();
      socket = undefined;
      unsubscribeFirebaseAuthListener();
      return false;
    };
  }, []);

  useEffect(() => {
    const user = firebaseAuth.currentUser;

    async function onConnect() {
      const authUserProfile = await getAuthenticatedUserByFirebaseUID(user.uid);
      setAuthenticatedUser(authUserProfile);
      setAuthenticated(true);
      setSocketConnected(true);
    }

    function onDisconnect() {
      setSocketConnected(false);
    }

    if (user) {
      // console.log('Logged user: ', user);
      user
        .getIdToken(true)
        .then(async (idToken) => {
          api.interceptors.request.use(function (config) {
            const token = idToken;
            config.headers.Authorization = token ? `Bearer ${token}` : "";
            return config;
          });
          socket = io(api_url, {
            autoConnect: false,
            auth: {
              token: idToken,
            },
          });
          socket.connect();
          socket.on("connect", onConnect);
          socket.on("disconnect", onDisconnect);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return () => {
      console.log("Unmounting");
      if (socket) {
        console.log("socket", socket);
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
      }
    };
  }, [firebaseUID]);

  function loadFirebaseUI() {
    // Initialize the FirebaseUI Widget using Firebase.
    const uiConfig = {
      signInFlow: "popup",
      signInOptions: [GoogleAuthProvider.PROVIDER_ID],
      callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false,
      },
    };
    if (FirebaseUIAuth.AuthUI.getInstance()) {
      const ui = FirebaseUIAuth.AuthUI.getInstance();
      ui.start("#firebaseui-auth-container", uiConfig);
    } else {
      const ui = new FirebaseUIAuth.AuthUI(firebaseAuth);
      ui.start("#firebaseui-auth-container", uiConfig);
    }
  }

  const signOutUser = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        console.log("Signed out successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const FirebaseUIContainer = () => {
    const firebaseUILoaded = useRef(false);

    useEffect(() => {
      if (!firebaseUILoaded.current) {
        firebaseUILoaded.current = true;
        loadFirebaseUI();
      }
    }, []);

    return <div id="firebaseui-auth-container" />;
  };

  const handlePrivacyPolicyClick = () => {
    setDialogTitle("Privacy Policy / Terms and Conditions");
    // setDialogDescription('This is a demo project. No privacy policy or terms and conditions are applicable.');
    setDialogComponent(<PrivacyPolicy />);
    setDialogOpen(true);
  };

  return (
    <Stack direction={"column"} className={"App"}>
      <MuiAppBar signOutUser={signOutUser} authenticated={authenticated} />
      {authenticated ? (
        <ChatHome
          socket={socket}
          firebaseUID={firebaseUID}
          authenticatedUser={authenticatedUser}
        />
      ) : (
        <>
          <Box
            display={"flex"}
            maxWidth={500}
            mx={"auto"}
            mt={10}
            flexDirection={"column"}
          >
            <Paper
              elevation={24}
              style={{ flexGrow: 1, background: "transparent" }}
            >
              <Typography
                color={"darkblue"}
                variant="subtitle1"
                textAlign={"center"}
                style={{ fontWeight: 900 }}
                p={5}
              >
                Experience the thrill of instant connections:
                <br />
                Join our real-time chat community with just a click of 'Continue
                with Google'
              </Typography>
              <FirebaseUIContainer />
            </Paper>
          </Box>
          <Typography
            color={"black"}
            width={"100%"}
            variant="caption"
            textAlign={"center"}
            style={{
              fontWeight: 900,
              cursor: "pointer",
              // align at bottom of the page
              position: "fixed",
              bottom: 0,
            }}
            p={5}
            onClick={handlePrivacyPolicyClick}
          >
            Privacy Policy / Terms and Conditions
          </Typography>
        </>
      )}

      <AppDialog
        open={dialogOpen}
        title={dialogTitle}
        description={dialogDescription}
        component={dialogComponent}
        onClose={() => {
          setDialogOpen(false);
          setDialogTitle("");
          setDialogDescription("");
          setDialogComponent(undefined);
        }}
      />
    </Stack>
  );
}

export default App;
