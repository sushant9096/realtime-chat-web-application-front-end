import React from 'react';
import {Typography} from "@mui/material";

function ConversionTile({title, selected, selectConversation}) {
  return (
    <Typography
      fontWeight={"bolder"}
      color={"darkslategray"}
      variant={"subtitle1"}
      style={{
        background: selected ? 'lightblue' : 'transparent',
        cursor: 'pointer',
        padding: '2px',
      }}
      onClick={selectConversation}
    >
      {title}
    </Typography>
  )
}

export default ConversionTile;