import React, {useEffect} from 'react';
import {Paper} from "@mui/material";

function MessageTile({message, authenticatedUser}) {
  const {content, senderId} = message;
  const [senderName, setSenderName] = React.useState("");

  useEffect(() => {
    if (senderId === authenticatedUser?.id) {
      setSenderName("You");
    } else {
      setSenderName("Other");
    }
  }, []);

  return (
    <Paper
      style={{
        alignSelf: senderId === authenticatedUser?.id ? 'flex-end' : 'flex-start',
        width: '49%',
        padding: 2,
        background: senderId === authenticatedUser?.id ? '#FFFDE7' : 'rgba(178,232,255,0.22)',
      }}
      variant={"outlined"}
    >
      <div style={{fontSize: 18, color: 'darkgray', fontWeight: 900}}>{senderName}</div>
      {content}
    </Paper>
  );
}

export default MessageTile;