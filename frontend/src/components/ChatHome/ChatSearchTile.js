import React from 'react';
import {Chat} from "@mui/icons-material";
import {IconButton, Stack, Typography} from "@mui/material";

function ChatSearchTile({ id, firstName, lastName, createConversation }) {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Typography
        variant={'body1'}>
        {firstName + ' ' + lastName}
      </Typography>
      <IconButton
        color={"primary"}
        onClick={createConversation}
      >
        <Chat/>
      </IconButton>
    </Stack>
  );
}

export default ChatSearchTile;